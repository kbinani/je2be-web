#include <emscripten.h>
#include <emscripten/bind.h>

#include <je2be.hpp>

#include <iostream>

using namespace std;
using namespace mcfile;
namespace fs = std::filesystem;

void ConvertChunk() {
  cout << "Hello from chunk-core" << endl;
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS(core_module) {
  emscripten::function("ConvertChunk", &ConvertChunk);
}
#endif
