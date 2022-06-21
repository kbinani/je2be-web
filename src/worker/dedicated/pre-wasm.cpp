#if defined(EMSCRIPTEN)
#include <emscripten.h>
// #include <emscripten/bind.h>
#endif

#include <iostream>

#include <je2be.hpp>

using namespace std;
// using namespace mcfile;
// using namespace je2be;
// using namespace je2be::tobe;
namespace fs = std::filesystem;

EMSCRIPTEN_KEEPALIVE
extern "C" int work(char *input, char *output) {
  je2be::LevelDirectoryStructure structure = je2be::LevelDirectoryStructure::Vanilla;
  int concurrency = std::thread::hardware_concurrency();
  je2be::tobe::Options options;
  options.fLevelDirectoryStructure = structure;
  je2be::tobe::Converter converter(std::filesystem::path(input), std::filesystem::path(output), options);

  struct Reporter : public je2be::tobe::Progress {
    bool report(Phase phase, double progress, double total) override {
      std::cout << (int)phase << " " << progress << "/" << total << std::endl;
      return true;
    }
  };
  Reporter reporter;

  return converter.run(concurrency, &reporter) ? 0 : -1;
}

int main(int argc, char *argv[]) {
  std::cout << "argc=" << argc << std::endl;
  for (int i = 0; i < argc; i++) {
    std::cout << "#" << i << "; " << argv[i] << std::endl;
  }
  return 0;
}

// int Pre(std::string id, std::string input, std::string output, int levelStructure, intptr_t javaEditionMap) {
//   Options opt;
//   opt.fLevelDirectoryStructure = LevelDirectoryStructure::Vanilla;
//   switch (levelStructure) {
//   case 1:
//     opt.fLevelDirectoryStructure = LevelDirectoryStructure::Paper;
//     break;
//   case 0:
//   default:
//     opt.fLevelDirectoryStructure = LevelDirectoryStructure::Vanilla;
//     break;
//   }
//   fs::path inputPath(input);
//   fs::path outputPath(output);

//   auto rootPath = fs::path(output);
//   auto dbPath = rootPath / "db";

//   error_code ec;
//   fs::create_directories(dbPath, ec);
//   if (ec) {
//     return -1;
//   }

//   struct Reporter : public je2be::tobe::Progress {
//     bool report(Phase phase, double progress, double total) override {
//       std::cout << (int)phase << " " << progress << "/" << total << std::endl;
//       return true;
//     }
//   };

//   std::cout << "hardware_concurrency=" << std::thread::hardware_concurrency() << std::endl;
//   Reporter reporter;
//   je2be::tobe::Converter conv(inputPath, outputPath, opt);
//   auto st = conv.run(10, &reporter);
//   return 0;

//   JavaEditionMap jem(input, opt);
//
//   std::cout << "starting thread..." << std::endl;
//   try {
//     std::thread th([]() {
//       std::cout << "from worker thread" << std::endl;
//       std::cout.flush();
//     });
//     std::cout << "thread started, and calling detach..." << std::endl;
//     th.detach();
//     std::cout << "detach called" << std::endl;
//   } catch (std::exception &e) {
//     std::cout << "caught exception: what=" << e.what() << std::endl;
//   }
//
//   size_t length = jem.fScaleLookupTable.size() * 2;
//   int32_t *ptr = (int32_t *)malloc(4 * length);
//   size_t i = 0;
//   for (auto k : jem.fScaleLookupTable) {
//     ptr[i++] = k.first;
//     ptr[i++] = k.second;
//   }
//
//   *(intptr_t *)javaEditionMap = (intptr_t)ptr;
//   return length;

// }

// void RemoveAll(string dir) {
//   error_code ec;
//   fs::remove_all(fs::path(dir), ec);
// }

// #if defined(EMSCRIPTEN)
// EMSCRIPTEN_BINDINGS() {
//   emscripten::function("Pre", &Pre);
//   emscripten::function("RemoveAll", &RemoveAll);
// }
// #endif
