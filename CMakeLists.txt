cmake_minimum_required(VERSION 3.22)
project(je2be-web)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

if ("${CMAKE_C_COMPILER_ID}" STREQUAL "Clang" OR "${CMAKE_C_COMPILER_ID}" STREQUAL "AppleClang")
  add_definitions(
    -Wno-deprecated-declarations
  )
endif()

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

list(APPEND pre_wasm_files src/worker/dedicated/pre-wasm.cpp)
add_executable(pre-wasm ${pre_wasm_files})
target_link_libraries(pre-wasm je2be)
target_compile_options(pre-wasm PRIVATE ${je2be_common_em_compile_options})
target_link_options(pre-wasm PRIVATE ${je2be_common_em_link_options})

list(APPEND region_wasm_files
  src/worker/dedicated/region-wasm.cpp
  include/proxy-db.hpp)
add_executable(region-wasm ${region_wasm_files})
target_link_libraries(region-wasm je2be)
target_include_directories(region-wasm PRIVATE include)
target_compile_options(region-wasm PRIVATE ${je2be_common_em_compile_options})
target_link_options(region-wasm PRIVATE ${je2be_common_em_link_options})

list(APPEND post_wasm_files src/worker/dedicated/post-wasm.cpp)
add_executable(post-wasm ${post_wasm_files})
target_include_directories(post-wasm PRIVATE include)
target_link_libraries(post-wasm je2be)
target_compile_options(post-wasm PRIVATE ${je2be_common_em_compile_options})
target_link_options(post-wasm PRIVATE ${je2be_common_em_link_options})

list(APPEND all_files ${pre_wasm_files} ${region_wasm_files} ${post_wasm_files})
source_group(TREE ${CMAKE_CURRENT_LIST_DIR} FILES ${all_files})
