#if defined(EMSCRIPTEN)
#include <emscripten.h>
#endif

#include <iostream>

#include <je2be.hpp>

namespace fs = std::filesystem;

EMSCRIPTEN_KEEPALIVE
extern "C" int work(char *input, char *output, char *id) {
  je2be::LevelDirectoryStructure structure = je2be::LevelDirectoryStructure::Vanilla;
  int concurrency = (int)std::thread::hardware_concurrency() - 1;
  je2be::tobe::Options options;
  options.fLevelDirectoryStructure = structure;
  int const r = 2;
  for (int x = -r; x <= r; x++) {
    for (int z = -r; z <= r; z++) {
      options.fChunkFilter.insert(je2be::Pos2i(x, z));
    }
  }
  je2be::tobe::Converter converter(fs::path(input), fs::path(output), options);

  struct Reporter : public je2be::tobe::Progress {
    std::string fId;

    explicit Reporter(std::string const &id) : fId(id) {}

    bool report(Phase phase, double progress, double total) override {
      switch (phase) {
      case Phase::Convert:
        EM_ASM({
          // ProgressMessage
          const m = {};
          m["type"] = "progress";
          m["id"] = UTF8ToString($0, $1);
          m["stage"] = "convert";
          m["progress"] = $2;
          m["total"] = $3;
          self.postMessage(m);
        },
               fId.c_str(), fId.size(), progress, total);
        break;
      case Phase::LevelDbCompaction:
        EM_ASM({
          // ProgressMessage
          const m = {};
          m["type"] = "progress";
          m["id"] = UTF8ToString($0, $1);
          m["stage"] = "compaction";
          m["progress"] = $2;
          m["total"] = $3;
          self.postMessage(m);
        },
               fId.c_str(), fId.size(), progress, total);
        break;
      }
      return true;
    }
  };
  std::string idStr(id);
  Reporter reporter(idStr);

  return converter.run(concurrency, &reporter).ok() ? 0 : -1;
}

int main(int argc, char *argv[]) {
  std::cout << "argc=" << argc << std::endl;
  for (int i = 0; i < argc; i++) {
    std::cout << "#" << i << "; " << argv[i] << std::endl;
  }
  return 0;
}
