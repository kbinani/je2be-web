#if defined(EMSCRIPTEN)
#include <emscripten.h>
#include <emscripten/bind.h>
#endif

#include <iostream>

#include <je2be.hpp>

#include "append-db.hpp"
#include "db.hpp"

using namespace std;
using namespace mcfile;
using namespace je2be;
using namespace je2be::tobe;
using namespace leveldb;
namespace fs = std::filesystem;

static void Report(std::string id, int delta) {
#if defined(EMSCRIPTEN)
  EM_ASM({
    //ConvertProgressDeltaMessage
    const m = {};
    m["type"] = "convert_progress_delta";
    m["id"] = UTF8ToString($0, $1);
    m["delta"] = $2;
    self.postMessage(m);
  },
         id.c_str(), id.size(), delta);
#endif
}

//id, rx, rz, dim, storage, javaEditionMap.length
bool ConvertRegion(string id, int rx, int rz, int dim, intptr_t javaEditionMap, int javaEditionMapSize, intptr_t numLdbFiles) {
  std::unordered_map<int32_t, int8_t> entries;
  int32_t *ptr = (int32_t *)javaEditionMap;
  for (int i = 0; i + 1 < javaEditionMapSize; i += 2) {
    int32_t key = ptr[i];
    int8_t value = ptr[i + 1];
    entries[key] = value;
  }
  free(ptr);

  string basename("r." + to_string(rx) + "." + to_string(rz));
  auto dir = fs::path("/je2be") / id / "ldb" / to_string(dim);
  ::Db db(dir, basename);
  InputOption io;
  JavaEditionMap jem(entries);
  Dimension d = static_cast<Dimension>(dim);
  fs::path worldDir = io.getWorldDirectory(fs::path("/je2be") / id / "in", d);
  mcfile::je::World w(worldDir);
  auto region = w.region(rx, rz);
  if (!region) {
    Report(id, 32 * 32);
    return true;
  }
  auto wd = make_shared<WorldData>(d);
  for (int cx = region->minChunkX(); cx <= region->maxChunkX(); cx++) {
    for (int cz = region->minChunkZ(); cz <= region->maxChunkZ(); cz++) {
      auto result = Chunk::Convert(d, db, *region, cx, cz, jem);
      Report(id, 1);
      if (!result.fData) {
        continue;
      }
      result.fData->drain(*wd);
      if (!result.fOk) {
        return false;
      }
    }
  }
  if (!db.flush()) {
    return false;
  }

  auto nbt = wd->toNbt();
  auto file = fs::path("/je2be") / id / "wd" / to_string(dim) / (basename + ".nbt");
  auto stream = make_shared<mcfile::stream::FileOutputStream>(file);
  mcfile::stream::OutputStreamWriter writer(stream);
  if (!nbt->write(writer)) {
    return false;
  }

  (*(int32_t *)numLdbFiles) = db.fNumFiles;
  return true;
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

int AppendDbAppend(intptr_t dbPtr, string file, int pos, intptr_t key, int keySize) {
  AppendDb *db = (AppendDb *)dbPtr;
  return db->append(file, pos, key, keySize);
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS(core_module) {
  emscripten::function("ConvertRegion", &ConvertRegion);
  emscripten::function("NewAppendDb", &NewAppendDb);
  emscripten::function("DeleteAppendDb", &DeleteAppendDb);
  emscripten::function("AppendDbAppend", &AppendDbAppend);
}
#endif
