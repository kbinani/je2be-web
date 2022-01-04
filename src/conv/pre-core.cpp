#if defined(EMSCRIPTEN)
#include <emscripten.h>
#include <emscripten/bind.h>
#endif

#include <je2be.hpp>

#include <iostream>

using namespace std;
using namespace mcfile;
using namespace je2be;
using namespace je2be::tobe;
namespace fs = std::filesystem;

static double GetTotalNumChunks(fs::path input, InputOption io) {
  uint32_t num = 0;
  for (auto dim : {Dimension::Overworld, Dimension::Nether, Dimension::End}) {
    auto dir = io.getWorldDirectory(input, dim) / "region";
    if (!fs::exists(dir)) {
      continue;
    }
    std::error_code ec;
    fs::directory_iterator itr(dir, ec);
    if (ec) {
      continue;
    }
    for (auto const &e : itr) {
      ec.clear();
      if (!fs::is_regular_file(e.path(), ec)) {
        continue;
      }
      if (ec) {
        continue;
      }
      auto name = e.path().filename().string();
      if (strings::StartsWith(name, "r.") && strings::EndsWith(name, ".mca")) {
        num++;
      }
    }
  }
  return num * 32.0 * 32.0;
}

static void Queue(string id, int cx, int cz, Dimension dim, vector<int32_t> const &javaEditionMap) {
#if defined(EMSCRIPTEN)
  EM_ASM({
    const id = UTF8ToString($0, $1);
    const cx = $2;
    const cz = $3;
    const dim = $4;
    const ptr = $5;
    const length = $6;
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(Module.HEAPI32[ptr + i]);
    }
    // ConvertChunkMessage
    const m = {};
    m["id"] = id;
    m["type"] = "chunk";
    m["cx"] = cx;
    m["cz"] = cz;
    m["dim"] = dim;
    m["javaEditionMap"] = arr;
    self.postMessage(m);
  },
         id.c_str(), id.size(), cx, cz, static_cast<uint8_t>(dim), javaEditionMap.data(), javaEditionMap.size());
#endif
}

int Pre(std::string id, std::string input, std::string output, int levelStructure) {
  InputOption io;
  io.fLevelDirectoryStructure = LevelDirectoryStructure::Vanilla;
  switch (levelStructure) {
  case 1:
    io.fLevelDirectoryStructure = LevelDirectoryStructure::Paper;
    break;
  case 0:
  default:
    io.fLevelDirectoryStructure = LevelDirectoryStructure::Vanilla;
    break;
  }
  fs::path inputPath(input);
  fs::path outputPath(output);

  double const numTotalChunks = GetTotalNumChunks(inputPath, io);

  auto rootPath = fs::path(output);
  auto dbPath = rootPath / "db";

  error_code ec;
  fs::create_directories(dbPath, ec);
  if (ec) {
    return -1;
  }

  auto data = Level::Read(io.getLevelDatFilePath(inputPath));
  if (!data) {
    return -1;
  }
  Level level = Level::Import(*data);

  bool ok = Datapacks::Import(inputPath, outputPath);

  auto levelData = std::make_unique<LevelData>(inputPath, io);

  vector<int32_t> scaleLookupTableEntries;
  for (auto k : levelData->fJavaEditionMap.fScaleLookupTable) {
    scaleLookupTableEntries.push_back(k.first);
    scaleLookupTableEntries.push_back(k.second);
  }
  for (auto dim : {Dimension::Overworld, Dimension::Nether, Dimension::End}) {
    auto dir = io.getWorldDirectory(inputPath, dim);
    mcfile::je::World world(dir);
    world.eachRegions([id, dim, numTotalChunks, &scaleLookupTableEntries](shared_ptr<mcfile::je::Region> const &region) {
      for (int cx = region->minChunkX(); cx <= region->maxChunkX(); cx++) {
        for (int cz = region->minChunkZ(); cz <= region->maxChunkZ(); cz++) {
          Queue(id, cx, cz, dim, scaleLookupTableEntries);
        }
      }
      return true;
    });
  }
  return numTotalChunks;
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS() {
  emscripten::function("Pre", &Pre);
}
#endif
