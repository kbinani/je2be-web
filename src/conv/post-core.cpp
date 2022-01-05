#if defined(EMSCRIPTEN)
#include <emscripten.h>
#include <emscripten/bind.h>
#endif

#include <iostream>

#include <je2be.hpp>

using namespace std;
using namespace mcfile;
using namespace je2be;
using namespace je2be::tobe;
namespace fs = std::filesystem;

bool Post(string id) {
  auto worldDataDir = fs::path("/je2be") / id / "wd";
  for (Dimension dim : {Dimension::Overworld, Dimension::Nether, Dimension::End}) {
    auto dir = worldDataDir / to_string(static_cast<uint8_t>(dim));
    for (auto it : fs::directory_iterator(dir)) {
      auto file = it.path();
      auto s = make_shared<stream::FileInputStream>(file);
      stream::InputStreamReader reader(s);
      auto tag = make_shared<nbt::CompoundTag>();
      if (!tag->read(reader)) {
        return false;
      }
    }
  }
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS() {
  emscripten::function("Post", &Post);
}
#endif
