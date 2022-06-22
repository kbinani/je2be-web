#if defined(EMSCRIPTEN)
#include <emscripten.h>
#endif

#include <iostream>

#include <je2be.hpp>

namespace fs = std::filesystem;

EMSCRIPTEN_KEEPALIVE
extern "C" int j2b(char *input, char *output, char *id) {
  using namespace std;
  using namespace je2be;
  using namespace je2be::tobe;

  LevelDirectoryStructure structure = LevelDirectoryStructure::Vanilla;
  int concurrency = (int)thread::hardware_concurrency() - 1;
  Options options;
  options.fLevelDirectoryStructure = structure;
  Converter converter(fs::path(input), fs::path(output), options);

  string idStr(id);
  struct Reporter : public Progress {
    string fId;

    explicit Reporter(string const &id) : fId(id) {}

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
        MAIN_THREAD_ASYNC_EM_ASM({
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
  } reporter(idStr);

  return converter.run(concurrency, &reporter).ok() ? 0 : -1;
}
