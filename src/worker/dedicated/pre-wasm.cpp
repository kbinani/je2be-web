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

int Pre(std::string id, std::string input, std::string output, int levelStructure, intptr_t javaEditionMap) {
  Options opt;
  opt.fLevelDirectoryStructure = LevelDirectoryStructure::Vanilla;
  switch (levelStructure) {
  case 1:
    opt.fLevelDirectoryStructure = LevelDirectoryStructure::Paper;
    break;
  case 0:
  default:
    opt.fLevelDirectoryStructure = LevelDirectoryStructure::Vanilla;
    break;
  }
  fs::path inputPath(input);
  fs::path outputPath(output);

  auto rootPath = fs::path(output);
  auto dbPath = rootPath / "db";

  error_code ec;
  fs::create_directories(dbPath, ec);
  if (ec) {
    return -1;
  }

  JavaEditionMap jem(input, opt);

  size_t length = jem.fScaleLookupTable.size() * 2;
  int32_t *ptr = (int32_t *)malloc(4 * length);
  size_t i = 0;
  for (auto k : jem.fScaleLookupTable) {
    ptr[i++] = k.first;
    ptr[i++] = k.second;
  }

  *(intptr_t *)javaEditionMap = (intptr_t)ptr;
  return length;
}

void RemoveAll(string dir) {
  error_code ec;
  fs::remove_all(fs::path(dir), ec);
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS() {
  emscripten::function("Pre", &Pre);
  emscripten::function("RemoveAll", &RemoveAll);
}
#endif
