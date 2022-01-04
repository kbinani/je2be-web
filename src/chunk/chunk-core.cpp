#if defined(EMSCRIPTEN)
#include <emscripten.h>
#include <emscripten/bind.h>
#endif

#include <je2be.hpp>

#include <iostream>

#include "db.hpp"

using namespace std;
using namespace mcfile;
using namespace leveldb;
namespace fs = std::filesystem;

void ConvertChunk() {
  cout << "Hello from chunk-core" << endl;
  Db db;
  string value = "bar";
  db.put("foo", value);
  cout << "put foo:bar from chunk-core" << endl;
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS(core_module) {
  emscripten::function("ConvertChunk", &ConvertChunk);
}
#endif
