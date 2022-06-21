cmake_minimum_required(VERSION 3.22)
project(je2be-web)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -pthread")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -pthread")

if ("${CMAKE_C_COMPILER_ID}" STREQUAL "Clang" OR "${CMAKE_C_COMPILER_ID}" STREQUAL "AppleClang")
  add_definitions(
    -Wno-deprecated-declarations
  )
endif()

add_subdirectory(deps/je2be EXCLUDE_FROM_ALL)

set(je2be_common_em_compile_and_link_options
  -fexceptions
  -flto
  -pthread
  -g)
set(je2be_common_em_compile_options
  ${je2be_common_em_compile_and_link_options})
set(je2be_common_em_link_options
  ${je2be_common_em_compile_and_link_options}
  # -g2
  # --bind
  -lworkerfs.js
  # -sSINGLE_FILE=1
  # -sALLOW_MEMORY_GROWTH=1
  -sINLINING_LIMIT=1
  -sENVIRONMENT=worker
  # -sINVOKE_RUN=0
  -sPROXY_TO_PTHREAD
  # -O3
  -sPTHREAD_POOL_SIZE=10)

list(APPEND j2b_wasm_files src/worker/dedicated/pre-wasm.cpp) # deps/je2be/example/j2b.cpp
add_executable(j2b-wasm ${j2b_wasm_files})
target_link_libraries(j2b-wasm je2be)
target_compile_options(j2b-wasm PRIVATE ${je2be_common_em_compile_options})
target_link_options(j2b-wasm PRIVATE ${je2be_common_em_link_options})

list(APPEND all_files ${j2b_wasm_files})
source_group(TREE ${CMAKE_CURRENT_LIST_DIR} FILES ${all_files})
