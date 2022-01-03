#include <emscripten.h>
#include <emscripten/bind.h>

#include <je2be.hpp>

#include <iostream>

using namespace std;
using namespace mcfile;
namespace fs = std::filesystem;

void Pre() {
  cout << "Hello from Pre" << endl;
}

EMSCRIPTEN_BINDINGS() {
  emscripten::function("Pre", &Pre);
}
