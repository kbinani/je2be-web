#include <emscripten.h>
#include <emscripten/bind.h>
#include <je2be.hpp>
#include <zip.h>

#include <filesystem>
#include <iostream>

using namespace std;
using namespace mcfile;
namespace fs = std::filesystem;

static void Report(std::string id, std::string stage, double progress, double total) {
  EM_ASM({
    const m = {};
    m["id"] = UTF8ToString($0, $1);
    m["stage"] = UTF8ToString($2, $3);
    m["progress"] = $4;
    m["total"] = $5;
    m["type"] = "progress";
    self.postMessage(m);
  },
         id.c_str(), id.size(), stage.c_str(), stage.size(), progress, total);
}

class ProgressRepoter : public je2be::Progress {
public:
  explicit ProgressRepoter(std::string id) : fId(id) {}

  bool report(Phase phase, double progress, double total) override {
    std::string stage;
    switch (phase) {
    case Phase::Convert:
      stage = "convert";
      break;
    case Phase::LevelDbCompaction:
      stage = "compaction";
      break;
    }
    Report(fId, stage, progress, total);
    return true;
  }

public:
  std::string const fId;
};

int core(std::string id, std::string in, std::string out, std::string zip) {
  fs::create_directories(fs::path(out));
  fs::create_directories(fs::path(zip).parent_path());

  je2be::tobe::InputOption io;
  je2be::tobe::OutputOption oo;
  je2be::tobe::Converter converter(fs::path(in), io, fs::path(out), oo);
  ProgressRepoter reporter(id);
  if (!converter.run(0, &reporter)) {
    return 1;
  }

  vector<uint8_t> buffer(512);
  zipFile file = zipOpen(zip.c_str(), 0);
  if (!file) {
    return 2;
  }
  int count = 0;
  for (auto it : fs::recursive_directory_iterator(out)) {
    if (!it.is_regular_file()) {
      continue;
    }
    count++;
  }
  int progress = 0;
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
    progress++;
    Report(id, "zip", progress, count);
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
