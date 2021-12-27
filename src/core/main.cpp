#include <iostream>
#include <je2be.hpp>
#include <filesystem>

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace std;
using namespace mcfile;
using namespace emscripten;
namespace fs = std::filesystem;

std::string core(std::string in, std::string out) {
  fs::create_directories(fs::path(out));

  je2be::tobe::InputOption io;
  je2be::tobe::OutputOption oo;
  je2be::tobe::Converter converter(fs::path(in), io, fs::path(out), oo);
  if (!converter.run(0)) {
    return "";
  }
  ostringstream s;
  for (auto it : fs::recursive_directory_iterator(out)) {
    if (!it.is_regular_file()) {
      continue;
    }
    s << it.path().string() << "\x0d";
  }
  return s.str();
}

EMSCRIPTEN_BINDINGS(core_module) {
    emscripten::function("core", &core);
}
