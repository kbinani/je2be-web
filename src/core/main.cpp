#include <je2be.hpp>
#include <iostream>

#include <unzip.h>
#include "emscripten/bind.h"


using namespace std;
using namespace mcfile;
using namespace emscripten;
namespace fs = std::filesystem;

int main() {
  FILE *fp = File::Open(fs::path("/foo.bin"), File::Mode::Write);
  string message = "foo";
  fwrite(message.data(), message.size(), 1, fp);
  fclose(fp);
  return 0;
}

extern "C" int core() {
  cout << "hello!" << endl;
  return 0;
}

EMSCRIPTEN_BINDINGS(core_module) {
    emscripten::function("core", &core);
}
