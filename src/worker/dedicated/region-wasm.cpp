#if defined(EMSCRIPTEN)
#include <emscripten.h>
#include <emscripten/bind.h>
#endif

#include <iostream>

#include <je2be.hpp>

#include "proxy-db.hpp"

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

static je2be::tobe::Chunk::Result ConvertChunk(mcfile::Dimension dim, DbInterface &db, mcfile::je::Region region, int cx, int cz, JavaEditionMap mapInfo) {
  using namespace std;
  using namespace mcfile;
  try {
    auto chunkFile = region.fFilePath.parent_path() / je::Region::GetDefaultCompressedChunkNbtFileName(cx, cz);
    auto const &chunk = je::Chunk::LoadFromCompressedChunkNbtFile(chunkFile, cx, cz);
    Chunk::Result r;
    r.fOk = true;
    if (!chunk) {
      return r;
    }
    if (chunk->status() != mcfile::je::Chunk::Status::FULL) {
      return r;
    }
    if (chunk->fDataVersion >= 2724) {
      vector<shared_ptr<nbt::CompoundTag>> entities;
      if (region.entitiesAt(cx, cz, entities)) {
        chunk->fEntities.swap(entities);
      }
    }
    r.fData = je2be::tobe::Chunk::MakeWorldData(chunk, region, dim, db, mapInfo);
    return r;
  } catch (...) {
    Chunk::Result r;
    r.fData = make_shared<WorldData>(dim);
    r.fData->addStatError(dim, cx, cz);
    r.fOk = false;
    return r;
  }
}

//id, worldDir, rx, rz, dim, storage, javaEditionMap.length
bool ConvertRegion(string id, string worldDirString, int rx, int rz, int dim, intptr_t javaEditionMap, int javaEditionMapSize) {
  std::unordered_map<int32_t, int8_t> entries;
  int32_t *ptr = (int32_t *)javaEditionMap;
  for (int i = 0; i + 1 < javaEditionMapSize; i += 2) {
    int32_t key = ptr[i];
    int8_t value = ptr[i + 1];
    entries[key] = value;
  }
  free(ptr);

  ::ProxyDb db(id);
  InputOption io;
  JavaEditionMap jem(entries);
  Dimension d = static_cast<Dimension>(dim);
  fs::path worldDir = fs::path(worldDirString);
  mcfile::je::World w(worldDir);
  auto region = w.region(rx, rz);
  if (!region) {
    Report(id, 32 * 32);
    return true;
  }
  auto wd = make_shared<WorldData>(d);
  for (int cx = region->minChunkX(); cx <= region->maxChunkX(); cx++) {
    for (int cz = region->minChunkZ(); cz <= region->maxChunkZ(); cz++) {
      auto result = ConvertChunk(d, db, *region, cx, cz, jem);
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

  auto nbt = wd->toNbt();

  string basename("r." + to_string(rx) + "." + to_string(rz));
  auto file = fs::path("/je2be") / id / "wd" / to_string(dim) / (basename + ".nbt");
  auto stream = make_shared<mcfile::stream::FileOutputStream>(file);
  mcfile::stream::OutputStreamWriter writer(stream);
  if (!nbt->write(writer)) {
    return false;
  }

  return true;
}

void RemoveAll(string dir) {
  error_code ec;
  fs::remove_all(fs::path(dir), ec);
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS(core_module) {
  emscripten::function("ConvertRegion", &ConvertRegion);
  emscripten::function("RemoveAll", &RemoveAll);
}
#endif
