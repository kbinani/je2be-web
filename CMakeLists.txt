cmake_minimum_required(VERSION 3.22)
project(je2be-web)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_subdirectory(deps/je2be EXCLUDE_FROM_ALL)

set(je2be_common_em_compile_and_link_options
  -fexceptions
  -flto)
set(je2be_common_em_compile_options
  ${je2be_common_em_compile_and_link_options})
set(je2be_common_em_link_options
  ${je2be_common_em_compile_and_link_options}
  -g2
  --bind
  -lworkerfs.js
  -sSINGLE_FILE=1
  -sALLOW_MEMORY_GROWTH=1
  -sINLINING_LIMIT=1
  -sENVIRONMENT=worker
  -sINVOKE_RUN=0
  -O3)

add_executable(region-wasm
  src/worker/dedicated/region-wasm.cpp
  include/db.hpp
  include/proxy-db.hpp)
target_link_libraries(region-wasm je2be)
target_include_directories(region-wasm PRIVATE include)
target_compile_options(region-wasm PRIVATE ${je2be_common_em_compile_options})
target_link_options(region-wasm PRIVATE ${je2be_common_em_link_options})

add_executable(pre-wasm src/worker/dedicated/pre-wasm.cpp)
target_link_libraries(pre-wasm je2be)
target_compile_options(pre-wasm PRIVATE ${je2be_common_em_compile_options})
target_link_options(pre-wasm PRIVATE ${je2be_common_em_link_options})

add_executable(post-wasm
  src/worker/dedicated/post-wasm.cpp
  include/db.hpp
  deps/zlib/contrib/minizip/zip.c
  deps/zlib/contrib/minizip/ioapi.c)
target_include_directories(post-wasm PRIVATE
  include
  deps/zlib/contrib/minizip)
target_link_libraries(post-wasm je2be)
target_compile_definitions(post-wasm PRIVATE NOCRYPT)
target_compile_options(post-wasm PRIVATE
  -Wno-unused-value
  ${je2be_common_em_compile_options})
target_link_options(post-wasm PRIVATE ${je2be_common_em_link_options})
