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
using namespace leveldb;
namespace fs = std::filesystem;

static void Report(std::string id, std::string stage, double progress, double total) {
#if defined(EMSCRIPTEN)
  EM_ASM({
    const m = {};
    m["id"] = UTF8ToString($0, $1);
    m["stage"] = UTF8ToString($2, $3);
    m["progress"] = $4;
    m["total"] = $5;
    m["type"] = "progress";
    self.postMessage(m);
  },
         id.c_str(), id.size(), stage.c_str(), stage.size(), progress, total);
#endif
}

//id, rx, rz, dim, storage, javaEditionMap.length
bool ConvertRegion(string id, int cx, int cz, int dim, intptr_t javaEditionMap, int javaEditionMapSize) {
  std::unordered_map<int32_t, int8_t> entries;
  int32_t *ptr = (int32_t *)javaEditionMap;
  for (int i = 0; i + 1 < javaEditionMapSize; i += 2) {
    int32_t key = ptr[i];
    int8_t value = ptr[i + 1];
    entries[key] = value;
  }
  free(ptr);

  ::Db db;
  InputOption io;
  JavaEditionMap jem(entries);
  Dimension d = static_cast<Dimension>(dim);
  fs::path worldDir = io.getWorldDirectory(fs::path("/je2be") / id / "in", d);
  mcfile::je::World w(worldDir);
  int rx = Coordinate::RegionFromChunk(cx);
  int rz = Coordinate::RegionFromChunk(cz);
  auto region = w.region(rx, rz);
  if (!region) {
    return true;
  }
  for (int cx = region->minChunkX(); cx <= region->maxChunkX(); cx++) {
    for (int cz = region->minChunkZ(); cz <= region->maxChunkZ(); cz++) {
      auto result = Chunk::Convert(d, db, *region, cx, cz, jem);
      if (!result.fData) {
        continue;
      }
      //TODO: result.fData->drain(ld);
      if (!result.fOk) {
        return false;
      }
    }
  }
  //TODO:
  return true;
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS(core_module) {
  emscripten::function("ConvertRegion", &ConvertRegion);
}
#endif
