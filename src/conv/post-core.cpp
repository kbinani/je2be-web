#if defined(EMSCRIPTEN)
#include <emscripten.h>
#include <emscripten/bind.h>
#endif

#include <iostream>

#include <je2be.hpp>
#include <zip.h>

#include "append-db.hpp"
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

intptr_t NewAppendDb(string id) {
  return (intptr_t) new AppendDb(id);
}

bool DeleteAppendDb(intptr_t dbPtr) {
  AppendDb *db = (AppendDb *)dbPtr;
  bool ok = db->close();
  delete db;
  return ok;
}

bool Append(intptr_t dbPtr, string file, intptr_t key, int keySize) {
  AppendDb *db = (AppendDb *)dbPtr;
  return db->append(file, key, keySize);
}

int Zip(string id) {
  auto zipDir = fs::path("/je2be") / "dl" / id;
  auto zipFilePath = zipDir / "out.zip";
  auto out = fs::path("/je2be") / id / "out";
  vector<uint8_t> buffer(1048576);
  zipFile file = zipOpen(zipFilePath.c_str(), 0);
  if (!file) {
    return -2;
  }
  int count = 0;
  for (auto it : fs::recursive_directory_iterator(out)) {
    if (!it.is_regular_file()) {
      continue;
    }
    count++;
  }
  int progress = 0;
  for (auto it : fs::recursive_directory_iterator(out)) {
    if (!it.is_regular_file()) {
      continue;
    }
    auto rel = fs::relative(it.path(), out);
    int ret = zipOpenNewFileInZip(file,                 // file
                                  rel.string().c_str(), // filename
                                  nullptr,              // zipfi
                                  nullptr, 0,           // extrafield_local, size_extrafield_local
                                  nullptr, 0,           // extrafield_global, size_extrafield_global
                                  nullptr,              // comment
                                  Z_DEFLATED,           // method
                                  Z_BEST_COMPRESSION);  // level
    if (ret != 0) {
      zipClose(file, nullptr);
      return -3;
    }
    FILE *f = File::Open(it.path(), File::Mode::Read);
    if (!f) {
      zipClose(file, nullptr);
      return -4;
    }
    while (!feof(f)) {
      int read = fread(buffer.data(), 1, buffer.size(), f);
      if (0 != zipWriteInFileInZip(file, buffer.data(), read)) {
        zipClose(file, nullptr);
        fclose(f);
        return -5;
      }
    }
    fclose(f);
    if (0 != zipCloseFileInZip(file)) {
      zipClose(file, nullptr);
      return -6;
    }
    progress++;
    //    Report(id, "zip", progress, count);
  }
  if (0 != zipClose(file, nullptr)) {
    return -7;
  }

  FILE *fp = File::Open(zipFilePath, File::Mode::Read);
  if (!fp) {
    return -8;
  }
  int fileIndex = 0;
  int64_t offset = 0;
  while (!feof(fp)) {
    fill(buffer.begin(), buffer.end(), 0);
    int read = fread(buffer.data(), 1, buffer.size(), fp);
    if (read < 1) {
      fclose(fp);
      return -9;
    }
    auto name = fs::path(zipDir) / (to_string(fileIndex) + ".bin");
    FILE *t = File::Open(name, File::Mode::Write);
    if (!t) {
      fclose(fp);
      return -10;
    }
    if (fwrite(buffer.data(), 1, read, t) != read) {
      fclose(fp);
      fclose(t);
      return -11;
    }
    fclose(t);
    offset += read;
    fileIndex++;
  }
  fclose(fp);
  fs::remove(zipFilePath);

  return fileIndex;
}

void RemoveAll(string dir) {
  error_code ec;
  fs::remove_all(fs::path(dir), ec);
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS() {
  emscripten::function("Post", &Post);
  emscripten::function("RemoveAll", &RemoveAll);
  emscripten::function("NewAppendDb", &NewAppendDb);
  emscripten::function("DeleteAppendDb", &DeleteAppendDb);
  emscripten::function("Append", &Append);
  emscripten::function("Zip", &Zip);
}
#endif
