#if defined(EMSCRIPTEN)
#include <emscripten.h>
#endif

#include <iostream>
#include <sstream>

#include <je2be.hpp>

namespace fs = std::filesystem;

namespace {

pthread_t sMainThreadId = 0;

void PostProgressMessage(std::string const &id, std::string const &stage, double progress, double total) {
#if defined(EMSCRIPTEN)
  if (pthread_self() == sMainThreadId) {
    // clang-format off
    EM_ASM({
      // ProgressMessage
      const m = {};
      m["type"] = "progress";
      m["id"] = UTF8ToString($0, $1);
      m["stage"] = UTF8ToString($2, $3);
      m["progress"] = $4;
      m["total"] = $5;
      self.postMessage(m);
    }, id.c_str(), id.size(), stage.c_str(), stage.size(), progress, total);
    // clang-format on
  } else {
    char *idPtr = (char *)calloc(id.size() + 1, sizeof(char));
    memcpy(idPtr, id.c_str(), id.size() * sizeof(char));

    char *stagePtr = (char *)calloc(stage.size() + 1, sizeof(char));
    memcpy(stagePtr, stage.c_str(), stage.size() * sizeof(char));

    // clang-format off
    MAIN_THREAD_ASYNC_EM_ASM({
      // ProgressMessage
      const m = {};
      m["type"] = "progress";
      m["id"] = UTF8ToString($0, $1);
      m["stage"] = UTF8ToString($2, $3);
      m["progress"] = $4;
      m["total"] = $5;
      self.postMessage(m);
      Module._free($0);
      Module._free($2);
    }, idPtr, id.size(), stagePtr, stage.size(), progress, total);
    // clang-format on
  }
#endif
}

} // namespace

extern "C" void initialize() {
  sMainThreadId = pthread_self();
}

extern "C" char *j2b(char *input, char *output, char *id) {
  using namespace std;
  using namespace je2be;
  using namespace je2be::tobe;

  int concurrency = (int)thread::hardware_concurrency() - 1;

  Options options;
  options.fLevelDirectoryStructure = LevelDirectoryStructure::Vanilla;

  Converter converter(fs::path(input), fs::path(output), options);

  string idStr(id);
  struct Reporter : public Progress {
    string fId;

    explicit Reporter(string const &id) : fId(id) {}

    bool report(Phase phase, double progress, double total) override {
      switch (phase) {
      case Phase::Convert:
        PostProgressMessage(fId, "convert", progress, total);
        break;
      case Phase::LevelDbCompaction:
        PostProgressMessage(fId, "compaction", progress, total);
        break;
      }
      return true;
    }
  } reporter(idStr);

  auto st = converter.run(concurrency, &reporter);
  if (auto error = st.error(); error) {
    nlohmann::json json;
    json["what"] = error->fWhat;
    nlohmann::json where;
    where["file"] = error->fWhere.fFile;
    where["line"] = error->fWhere.fLine;
    json["where"] = where;
    string jsonStr = nlohmann::to_string(json);
    char *jsonPtr = (char *)calloc(jsonStr.size() + 1, sizeof(char));
    memcpy(jsonPtr, jsonStr.c_str(), jsonStr.size() * sizeof(char));
    return jsonPtr;
  } else {
    return nullptr;
  }
}
