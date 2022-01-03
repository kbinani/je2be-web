#include <emscripten.h>
#include <emscripten/bind.h>

void ConvertChunk() {
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS(core_module) {
  emscripten::function("ConvertChunk", &ConvertChunk);
}
#endif
