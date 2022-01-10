#if defined(EMSCRIPTEN)
#include <emscripten.h>
#include <emscripten/bind.h>
#endif

#include <iostream>

#include <je2be.hpp>

using namespace std;
using namespace mcfile;
using namespace je2be;
using namespace je2be::tobe;
namespace fs = std::filesystem;

static void Report(std::string id, double progress, double total) {
#if defined(EMSCRIPTEN)
  EM_ASM({
    //ProgressMessage
    const m = {};
    m["type"] = "progress";
    m["stage"] = "compaction";
    m["id"] = UTF8ToString($0, $1);
    m["progress"] = $2;
    m["total"] = $3;
    self.postMessage(m);
  },
         id.c_str(), id.size(), progress, total);
#endif
}

int Post(string id, intptr_t dbPtr) {
  fs::path inputDir = fs::path("/je2be") / id / "in";
  fs::path outputDir = fs::path("/je2be") / id / "out";
  auto dbPath = outputDir / "db";

  error_code ec;
  fs::create_directories(dbPath, ec);
  if (ec) {
    return -1;
  }

  InputOption io;
  io.fLevelDirectoryStructure = LevelDirectoryStructure::Vanilla;
  auto data = Level::Read(io.getLevelDatFilePath(inputDir));
  if (!data) {
    return -2;
  }
  Level level = Level::Import(*data);

  bool ok = Datapacks::Import(inputDir, outputDir);

  auto levelData = make_unique<LevelData>(inputDir, io);

  auto worldDataDir = fs::path("/je2be") / id / "wd";
  for (Dimension dim : {Dimension::Overworld, Dimension::Nether, Dimension::End}) {
    auto dir = worldDataDir / to_string(static_cast<uint8_t>(dim));
    if (!fs::is_directory(dir)) {
      continue;
    }
    for (auto it : fs::directory_iterator(dir)) {
      auto file = it.path();
      auto s = make_shared<stream::FileInputStream>(file);
      stream::InputStreamReader reader(s);
      auto tag = make_shared<nbt::CompoundTag>();
      if (!tag->read(reader)) {
        return -3;
      }
      auto wd = WorldData::FromNbt(*tag);
      if (!wd) {
        return -4;
      }
      wd->drain(*levelData);
    }
  }

  auto ldbDir = fs::path("/je2be") / id / "ldb";
  ec.clear();
  fs::create_directories(ldbDir, ec);
  je2be::tobe::RawDb *db = (je2be::tobe::RawDb *)dbPtr;

  auto localPlayerData = Converter::LocalPlayerData(*data, *levelData);
  if (localPlayerData) {
    auto k = mcfile::be::DbKey::LocalPlayer();
    db->put(k, *localPlayerData);
  }

  if (ok) {
    level.fCurrentTick = max(level.fCurrentTick, levelData->fMaxChunkLastUpdate);
    ok = level.write(outputDir / "level.dat");
    if (ok) {
      ok = levelData->put(*db, *data);
    }
  }

  if (!db->valid()) {
    return -5;
  }

  db->close([id](double progress) {
    Report(id, progress, 1);
  });

  return 0;
}

void RemoveAll(string dir) {
  error_code ec;
  fs::remove_all(fs::path(dir), ec);
}

intptr_t NewDb(string id) {
  auto dir = fs::path("/je2be") / id / "out" / "db";
  error_code ec;
  fs::create_directories(dir, ec);
  return (intptr_t) new RawDb(dir, 0);
}

void AbandonDb(intptr_t ptr) {
  RawDb *db = (RawDb *)ptr;
  db->abandon();
  delete db;
}

void PutToDb(intptr_t ptr, intptr_t key, int keySize, intptr_t value, int valueSize) {
  RawDb *db = (RawDb *)ptr;
  string k;
  k.assign((char const *)key, keySize);
  free((void *)key);
  string v;
  v.assign((char const *)value, valueSize);
  free((void *)value);
  db->putCompressed(k, v);
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS() {
  emscripten::function("Post", &Post);
  emscripten::function("RemoveAll", &RemoveAll);
  emscripten::function("NewDb", &NewDb);
  emscripten::function("AbandonDb", &AbandonDb);
  emscripten::function("PutToDb", &PutToDb);
}
#endif
