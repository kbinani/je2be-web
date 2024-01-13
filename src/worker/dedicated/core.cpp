#if defined(EMSCRIPTEN)
#include <emscripten.h>
#define J2B_EXPORT EMSCRIPTEN_KEEPALIVE extern "C"
#else
#define J2B_EXPORT extern "C"
#endif

#include <je2be.hpp>

#include <iostream>
#include <sstream>
#include <thread>

#include <nlohmann/json.hpp>

#define J2B_DEBUG_CHUNK_FILTER_RADIUS (0)

namespace fs = std::filesystem;

namespace {

pthread_t sMainThreadId = 0;

void PostProgressMessage(std::string const &id, std::string const &stage, double progress, uint32_t numConvertedChunks) {
#if defined(EMSCRIPTEN)
  if (pthread_self() == sMainThreadId) {
    // clang-format off
    EM_ASM({
      // ProgressMessage
      const m = {};
      m["type"] = "progress";
      m["id"] = UTF8ToString($0, $1);
      m["step"] = UTF8ToString($2, $3);
      m["progress"] = $4;
      m["count"] = $5;
      self.postMessage(m);
    }, id.c_str(), id.size(), stage.c_str(), stage.size(), progress, numConvertedChunks);
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
      m["step"] = UTF8ToString($2, $3);
      m["progress"] = $4;
      m["count"] = $5;
      self.postMessage(m);
      Module._free($0);
      Module._free($2);
    }, idPtr, id.size(), stagePtr, stage.size(), progress, numConvertedChunks);
    // clang-format on
  }
#endif
}

char *CreateStatusJson(je2be::Status st) {
  if (auto error = st.error(); error) {
    nlohmann::json json;
    if (!error->fWhat.empty()) {
      json["what"] = error->fWhat;
    }
    nlohmann::json trace;
    for (int i = (int)error->fTrace.size() - 1; i >= 0; i--) {
      nlohmann::json where;
      where["file"] = error->fTrace[i].fFile;
      where["line"] = error->fTrace[i].fLine;
      trace.push_back(where);
    }
    json["trace"] = trace;
    std::string jsonStr = nlohmann::to_string(json);
    char *jsonPtr = (char *)calloc(jsonStr.size() + 1, sizeof(char));
    memcpy(jsonPtr, jsonStr.c_str(), jsonStr.size() * sizeof(char));
    return jsonPtr;
  } else {
    return nullptr;
  }
}

je2be::Status Error(char const *file, int line, std::string what = {}) {
  je2be::Status::Where w(file, line);

  static fs::path const sProjectRoot(fs::path(__FILE__).parent_path());
  std::error_code ec;
  fs::path path(file ? file : "(unknown)");
  fs::path p = fs::relative(path, sProjectRoot, ec);
  if (ec) {
    w.fFile = path.filename().string();
  } else {
    w.fFile = p.string();
  }
  return je2be::Status(je2be::Status::ErrorData(w, what));
}

struct J2BProgress : public je2be::java::Progress {
  explicit J2BProgress(std::string const &id) : fId(id) {}

  bool reportConvert(je2be::Rational<je2be::u64> const &progress, uint64_t numConvertedChunks) override {
    PostProgressMessage(fId, "convert", progress.toD(), numConvertedChunks);
    return true;
  }

  bool reportEntityPostProcess(je2be::Rational<je2be::u64> const &progress) override {
    PostProgressMessage(fId, "postprocess", progress.toD(), 0);
    return true;
  }

  bool reportCompaction(je2be::Rational<je2be::u64> const &progress) override {
    PostProgressMessage(fId, "compaction", progress.toD(), 0);
    return true;
  }

  std::string fId;
};

struct B2JProgress : public je2be::bedrock::Progress {
  explicit B2JProgress(std::string const &id) : fId(id) {}

  bool reportConvert(je2be::Rational<je2be::u64> const &progress, uint64_t numConvertedChunks) override {
    PostProgressMessage(fId, "convert", progress.toD(), numConvertedChunks);
    return true;
  }

  bool reportTerraform(je2be::Rational<je2be::u64> const &progress, uint64_t numConvertedChunks) override {
    PostProgressMessage(fId, "postprocess", progress.toD(), numConvertedChunks);
    return true;
  }

  std::string fId;
};

struct LCEProgress : public je2be::lce::Progress {
  explicit LCEProgress(std::string const &id) : fId(id) {}

  bool report(je2be::Rational<je2be::u64> const &progress) override {
    PostProgressMessage(fId, "extract", progress.toD(), 0);
    return true;
  }

  std::string fId;
};

je2be::Status UnsafeJavaToBedrock(char *input, char *output, char *id) {
  using namespace std;
  using namespace je2be;
  using namespace je2be::java;

  Options options;
  options.fLevelDirectoryStructure = LevelDirectoryStructure::Vanilla;
#if J2B_DEBUG_CHUNK_FILTER_RADIUS
  int r = J2B_DEBUG_CHUNK_FILTER_RADIUS;
  for (int x = -r; x <= r; x++) {
    for (int z = -r; z <= r; z++) {
      options.fChunkFilter.insert(je2be::Pos2i(x, z));
    }
  }
#endif
  J2BProgress progress(id);

  int concurrency = (int)thread::hardware_concurrency() - 1;
  return Converter::Run(fs::path(input), fs::path(output), options, concurrency, &progress);
}

je2be::Status UnsafeBedrockToJava(char *input, char *output, char *id) {
  using namespace std;
  using namespace je2be;
  using namespace je2be::bedrock;

  Options options;
#if J2B_DEBUG_CHUNK_FILTER_RADIUS
  int r = J2B_DEBUG_CHUNK_FILTER_RADIUS;
  for (int x = -r; x <= r; x++) {
    for (int z = -r; z <= r; z++) {
      options.fChunkFilter.insert(je2be::Pos2i(x, z));
    }
  }
#endif
  B2JProgress progress(id);

  int concurrency = (int)thread::hardware_concurrency() - 1;
  return Converter::Run(fs::path(input), fs::path(output), options, concurrency, &progress);
}

je2be::Status UnsafeXbox360ToJava(char *input, char *output, char *id) {
  using namespace std;
  using namespace je2be;
  using namespace je2be::xbox360;

  int concurrency = (int)thread::hardware_concurrency() - 1;
  lce::Options options;
#if J2B_DEBUG_CHUNK_FILTER_RADIUS
  int r = J2B_DEBUG_CHUNK_FILTER_RADIUS;
  for (int x = -r; x <= r; x++) {
    for (int z = -r; z <= r; z++) {
      options.fChunkFilter.insert(je2be::Pos2i(x, z));
    }
  }
#endif
  LCEProgress progress(id);
  return Converter::Run(fs::path(input), fs::path(output), concurrency, options, &progress);
}

je2be::Status UnsafeXbox360ToBedrock(char *input, char *output, char *id) {
  using namespace std;
  using namespace je2be;

  auto javaOutput = fs::temp_directory_path() / "java";
  if (!je2be::Fs::CreateDirectories(javaOutput)) {
    return Error(__FILE__, __LINE__, "can't create directory " + javaOutput.string());
  }

  int concurrency = (int)thread::hardware_concurrency() - 1;

  {
    lce::Options options;
#if J2B_DEBUG_CHUNK_FILTER_RADIUS
    int r = J2B_DEBUG_CHUNK_FILTER_RADIUS;
    for (int x = -r; x <= r; x++) {
      for (int z = -r; z <= r; z++) {
        options.fChunkFilter.insert(je2be::Pos2i(x, z));
      }
    }
#endif
    LCEProgress progress(id);
    auto st = xbox360::Converter::Run(fs::path(input), javaOutput, concurrency, options, &progress);
    if (!st.ok()) {
      return st;
    }
  }

  {
    java::Options options;
#if J2B_DEBUG_CHUNK_FILTER_RADIUS
    int r = J2B_DEBUG_CHUNK_FILTER_RADIUS;
    for (int x = -r; x <= r; x++) {
      for (int z = -r; z <= r; z++) {
        options.fChunkFilter.insert(je2be::Pos2i(x, z));
      }
    }
#endif
    J2BProgress progress(id);
    return java::Converter::Run(javaOutput, fs::path(output), options, concurrency, &progress);
  }
}

je2be::Status UnsafePS3ToJava(char *input, char *output, char *id) {
  using namespace std;
  using namespace je2be;
  using namespace je2be::ps3;

  int concurrency = (int)thread::hardware_concurrency() - 1;
  lce::Options options;
#if J2B_DEBUG_CHUNK_FILTER_RADIUS
  int r = J2B_DEBUG_CHUNK_FILTER_RADIUS;
  for (int x = -r; x <= r; x++) {
    for (int z = -r; z <= r; z++) {
      options.fChunkFilter.insert(je2be::Pos2i(x, z));
    }
  }
#endif
  LCEProgress progress(id);
  return Converter::Run(fs::path(input), fs::path(output), concurrency, options, &progress);
}

je2be::Status UnsafePS3ToBedrock(char *input, char *output, char *id) {
  using namespace std;
  using namespace je2be;

  auto javaOutput = fs::temp_directory_path() / "java";
  if (!je2be::Fs::CreateDirectories(javaOutput)) {
    return Error(__FILE__, __LINE__, "can't create directory " + javaOutput.string());
  }

  int concurrency = (int)thread::hardware_concurrency() - 1;

  {
    lce::Options options;
#if J2B_DEBUG_CHUNK_FILTER_RADIUS
    int r = J2B_DEBUG_CHUNK_FILTER_RADIUS;
    for (int x = -r; x <= r; x++) {
      for (int z = -r; z <= r; z++) {
        options.fChunkFilter.insert(je2be::Pos2i(x, z));
      }
    }
#endif
    LCEProgress progress(id);
    auto st = ps3::Converter::Run(fs::path(input), javaOutput, concurrency, options, &progress);
    if (!st.ok()) {
      return st;
    }
  }

  {
    java::Options options;
#if J2B_DEBUG_CHUNK_FILTER_RADIUS
    int r = J2B_DEBUG_CHUNK_FILTER_RADIUS;
    for (int x = -r; x <= r; x++) {
      for (int z = -r; z <= r; z++) {
        options.fChunkFilter.insert(je2be::Pos2i(x, z));
      }
    }
#endif
    J2BProgress progress(id);
    return java::Converter::Run(javaOutput, fs::path(output), options, concurrency, &progress);
  }
}

char *Wrap(std::function<je2be::Status(char *input, char *output, char *id)> converter, char *input, char *output, char *id) {
  try {
    auto st = converter(input, output, id);
    return CreateStatusJson(st);
  } catch (fs::filesystem_error &e) {
    return CreateStatusJson(Error(__FILE__, __LINE__, e.what()));
  } catch (std::exception &e) {
    return CreateStatusJson(Error(__FILE__, __LINE__, e.what()));
  } catch (char const *what) {
    return CreateStatusJson(Error(__FILE__, __LINE__, what));
  } catch (...) {
    return CreateStatusJson(Error(__FILE__, __LINE__));
  }
}

} // namespace

J2B_EXPORT void Init() {
  sMainThreadId = pthread_self();
}

J2B_EXPORT void Deinit() {
  sMainThreadId = 0;
}

J2B_EXPORT char *JavaToBedrock(char *input, char *output, char *id) {
  return Wrap(UnsafeJavaToBedrock, input, output, id);
}

J2B_EXPORT char *BedrockToJava(char *input, char *output, char *id) {
  return Wrap(UnsafeBedrockToJava, input, output, id);
}

J2B_EXPORT char *Xbox360ToJava(char *input, char *output, char *id) {
  return Wrap(UnsafeXbox360ToJava, input, output, id);
}

J2B_EXPORT char *Xbox360ToBedrock(char *input, char *output, char *id) {
  return Wrap(UnsafeXbox360ToBedrock, input, output, id);
}

J2B_EXPORT char *PS3ToJava(char *input, char *output, char *id) {
  return Wrap(UnsafePS3ToJava, input, output, id);
}

J2B_EXPORT char *PS3ToBedrock(char *input, char *output, char *id) {
  return Wrap(UnsafePS3ToBedrock, input, output, id);
}
