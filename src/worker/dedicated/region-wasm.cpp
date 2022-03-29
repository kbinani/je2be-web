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

static shared_ptr<je::Chunk> ChunkFromRegionBuffer(vector<uint8_t> const &buffer, int cx, int cz) {
  static constexpr int kSectorSize = 4096;
  int rx = Coordinate::RegionFromChunk(cx);
  int rz = Coordinate::RegionFromChunk(cz);
  int x = cx - rx * 32;
  int z = cz - rz * 32;
  int index = z * 32 + x;
  if (4 * index + 4 > buffer.size()) {
    return nullptr;
  }
  uint32_t loc = *(uint32_t *)(buffer.data() + 4 * index);
  loc = I32FromBE(loc);
  if (loc == 0) {
    return nullptr;
  }

  uint32_t sectorOffset = loc >> 8;
  if (sectorOffset * kSectorSize + 4 > buffer.size()) {
    return nullptr;
  }
  uint32_t chunkSize = *(uint32_t *)(buffer.data() + sectorOffset * kSectorSize);
  chunkSize = I32FromBE(chunkSize);
  if (chunkSize == 0) {
    return nullptr;
  }
  chunkSize -= 1;
  if (sectorOffset * kSectorSize + 4 + 1 + chunkSize > buffer.size()) {
    return nullptr;
  }
  uint8_t compressionType = *(buffer.data() + sectorOffset * kSectorSize + 4);
  if (compressionType != 2) {
    return nullptr;
  }
  vector<uint8_t> chunkBuffer;
  chunkBuffer.reserve(chunkSize);
  copy_n(buffer.begin() + sectorOffset * kSectorSize + 4 + 1, chunkSize, back_inserter(chunkBuffer));
  if (!Compression::Decompress(chunkBuffer)) {
    return nullptr;
  }
  auto bs = std::make_shared<mcfile::stream::ByteStream>(chunkBuffer);
  stream::InputStreamReader reader(bs);
  auto tag = CompoundTag::Read(reader);
  if (!tag) {
    return nullptr;
  }
  return je::Chunk::MakeChunk(cx, cz, tag);
}

static je2be::tobe::Chunk::Result ConvertChunk(mcfile::Dimension dim,
                                               DbInterface &db,
                                               mcfile::je::Region const &region,
                                               vector<uint8_t> const &buffer,
                                               int cx,
                                               int cz,
                                               JavaEditionMap mapInfo,
                                               fs::path const &entitiesDir,
                                               optional<LevelData::PlayerAttachedEntities> playerAttachedEntities,
                                               int64_t gameTick) {
  try {
    auto const &chunk = ChunkFromRegionBuffer(buffer, cx, cz);
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

    optional<Chunk::PlayerAttachedEntities> cpae;
    if (playerAttachedEntities && playerAttachedEntities->fDim == dim && playerAttachedEntities->fVehicle && playerAttachedEntities->fVehicle->fChunk == Pos2i(cx, cz)) {
      Chunk::PlayerAttachedEntities pae;
      pae.fLocalPlayerUid = playerAttachedEntities->fLocalPlayerUid;
      pae.fVehicle = playerAttachedEntities->fVehicle->fVehicle;
      pae.fPassengers.swap(playerAttachedEntities->fVehicle->fPassengers);
      cpae = pae;
    }

    r.fData = je2be::tobe::Chunk::MakeWorldData(chunk, region, dim, db, mapInfo, entitiesDir, cpae, gameTick);
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
bool ConvertRegion(string id,
                   string worldDirString,
                   int rx,
                   int rz,
                   int dim,
                   intptr_t javaEditionMap,
                   int javaEditionMapSize) {
  std::unordered_map<int32_t, int8_t> entries;
  int32_t *ptr = (int32_t *)javaEditionMap;
  for (int i = 0; i + 1 < javaEditionMapSize; i += 2) {
    int32_t key = ptr[i];
    int8_t value = ptr[i + 1];
    entries[key] = value;
  }
  free(ptr);

  ::ProxyDb db(id);
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
  auto regionFile = region->fFilePath;
  auto fileStream = make_shared<mcfile::stream::FileInputStream>(regionFile);
  vector<uint8_t> buffer;
  mcfile::stream::InputStream::ReadUntilEos(*fileStream, buffer);
  if (buffer.empty()) {
    return false;
  }
  fileStream.reset();

  fs::path input("/wfs");
  je2be::tobe::Options opt;
  auto data = Level::Read(opt.getLevelDatFilePath(input));
  if (!data) {
    return false;
  }
  Level level = Level::Import(*data);
  auto levelData = make_unique<LevelData>(input, opt, level.fCurrentTick);
  Converter::LocalPlayerData(*data, *levelData);

  for (int cx = region->minChunkX(); cx <= region->maxChunkX(); cx++) {
    for (int cz = region->minChunkZ(); cz <= region->maxChunkZ(); cz++) {
      auto entitiesDir = fs::path("/je2be") / id / "entities" / to_string(dim) / ("c." + to_string(cx) + "." + to_string(cz));
      auto result = ConvertChunk(d,
                                 db,
                                 *region,
                                 buffer,
                                 cx,
                                 cz,
                                 jem,
                                 entitiesDir,
                                 levelData->fPlayerAttachedEntities,
                                 level.fCurrentTick);
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
  vector<uint8_t>().swap(buffer);

  auto nbt = wd->toNbt();

  string basename("r." + to_string(rx) + "." + to_string(rz));
  auto file = fs::path("/je2be") / id / "wd" / to_string(dim) / (basename + ".nbt");
  auto stream = make_shared<mcfile::stream::FileOutputStream>(file);
  mcfile::stream::OutputStreamWriter writer(stream);
  if (!nbt->writeAsRoot(writer)) {
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
