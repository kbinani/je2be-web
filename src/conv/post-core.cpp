#if defined(EMSCRIPTEN)
#include <emscripten.h>
#include <emscripten/bind.h>
#endif

#include <iostream>

#include <je2be.hpp>

#include "db.hpp"

using namespace std;
using namespace mcfile;
using namespace je2be;
using namespace je2be::tobe;
namespace fs = std::filesystem;

int Post(string id) {
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
    return -1;
  }
  Level level = Level::Import(*data);

  bool ok = Datapacks::Import(inputDir, outputDir);

  auto levelData = make_unique<LevelData>(inputDir, io);

  auto worldDataDir = fs::path("/je2be") / id / "wd";
  for (Dimension dim : {Dimension::Overworld, Dimension::Nether, Dimension::End}) {
    auto dir = worldDataDir / to_string(static_cast<uint8_t>(dim));
    for (auto it : fs::directory_iterator(dir)) {
      auto file = it.path();
      auto s = make_shared<stream::FileInputStream>(file);
      stream::InputStreamReader reader(s);
      auto tag = make_shared<nbt::CompoundTag>();
      if (!tag->read(reader)) {
        return -1;
      }
      auto wd = WorldData::FromNbt(*tag);
      if (!wd) {
        return -1;
      }
      wd->drain(*levelData);
    }
  }

  auto ldbDir = fs::path("/je2be") / id / "ldb";
  ec.clear();
  fs::create_directories(ldbDir, ec);
  ::Db db(ldbDir, "level");

  auto localPlayerData = Converter::LocalPlayerData(*data, *levelData);
  if (localPlayerData) {
    auto k = mcfile::be::DbKey::LocalPlayer();
    db.put(k, *localPlayerData);
  }

  if (ok) {
    level.fCurrentTick = max(level.fCurrentTick, levelData->fMaxChunkLastUpdate);
    ok = level.write(outputDir / "level.dat");
    if (ok) {
      ok = levelData->put(db, *data);
    }
  }

  ec.clear();
  fs::remove_all(inputDir, ec);

  if (!db.valid()) {
    return -1;
  }
  if (!db.flush()) {
    return -1;
  }

  return db.fNumFiles;
}

void RemoveAll(string dir) {
  error_code ec;
  fs::remove_all(fs::path(dir), ec);
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS() {
  emscripten::function("Post", &Post);
  emscripten::function("RemoveAll", &RemoveAll);
}
#endif
