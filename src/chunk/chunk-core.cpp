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

//id, cx, cz, dim, storage, javaEditionMap.length
void ConvertChunk(string id, int cx, int cz, int dim, intptr_t javaEditionMap, int javaEditionMapSize) {
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
    cout << "region is null" << endl;
    return;
  }
  auto result = Chunk::Convert(d, ref(db), *region, cx, cz, jem);
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS(core_module) {
  emscripten::function("ConvertChunk", &ConvertChunk);
}
#endif
