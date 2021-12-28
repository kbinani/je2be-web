#include <emscripten.h>
#include <emscripten/bind.h>
#include <je2be.hpp>
#include <zip.h>

#include <filesystem>
#include <iostream>

using namespace std;
using namespace mcfile;
namespace fs = std::filesystem;

int core(std::string in, std::string out, std::string zip) {
  fs::create_directories(fs::path(out));
  fs::create_directories(fs::path(zip).parent_path());

  je2be::tobe::InputOption io;
  je2be::tobe::OutputOption oo;
  je2be::tobe::Converter converter(fs::path(in), io, fs::path(out), oo);
  if (!converter.run(0)) {
    return 1;
  }

  vector<uint8_t> buffer(512);
  zipFile file = zipOpen(zip.c_str(), 0);
  if (!file) {
    return 2;
  }
  for (auto it : fs::recursive_directory_iterator(out)) {
    if (!it.is_regular_file()) {
      continue;
    }
    auto rel = fs::relative(it.path(), out);
    int ret = zipOpenNewFileInZip(file,                   // file
                                  rel.string().c_str(),   // filename
                                  nullptr,                // zipfi
                                  nullptr, 0,             // extrafield_local, size_extrafield_local
                                  nullptr, 0,             // extrafield_global, size_extrafield_global
                                  nullptr,                // comment
                                  0,                      // method
                                  Z_DEFAULT_COMPRESSION); // level
    if (ret != 0) {
      zipClose(file, nullptr);
      return 3;
    }
    FILE *f = File::Open(it.path(), File::Mode::Read);
    if (!f) {
      zipClose(file, nullptr);
      return 4;
    }
    while (!feof(f)) {
      int read = fread(buffer.data(), 1, buffer.size(), f);
      if (0 != zipWriteInFileInZip(file, buffer.data(), read)) {
        zipClose(file, nullptr);
        fclose(f);
        return 5;
      }
    }
    fclose(f);
    if (0 != zipCloseFileInZip(file)) {
      zipClose(file, nullptr);
      return 6;
    }
  }
  if (0 != zipClose(file, nullptr)) {
    return 7;
  }
  return 0;
}

void cleanup(std::string dir) {
  error_code ec;
  fs::remove_all(fs::path(dir), ec);
}

EMSCRIPTEN_BINDINGS(core_module) {
  emscripten::function("core", &core);
  emscripten::function("cleanup", &cleanup);
}
