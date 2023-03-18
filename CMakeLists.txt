cmake_minimum_required(VERSION 3.22)
project(je2be-web)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

if ("${EMSCRIPTEN}" STREQUAL "1")
  set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -pthread -sUSE_ZLIB=1")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -pthread -sUSE_ZLIB=1")
elseif ("${CMAKE_C_COMPILER_ID}" STREQUAL "Clang" OR "${CMAKE_C_COMPILER_ID}" STREQUAL "AppleClang")
  add_definitions(
    -Wno-deprecated-declarations
    -Wno-shorten-64-to-32
  )
endif()

add_subdirectory(deps/je2be-core EXCLUDE_FROM_ALL)

set(common_em_compile_and_link_options
  -fexceptions
  -flto
  -pthread
  -g2)

list(APPEND core_files src/worker/dedicated/core.cpp)
add_executable(core ${core_files})
target_link_libraries(core je2be)

if ("${EMSCRIPTEN}" STREQUAL "1")
  target_compile_options(je2be PRIVATE -fexceptions)
  target_compile_options(core PRIVATE ${common_em_compile_and_link_options})
  target_link_options(core PRIVATE
    ${common_em_compile_and_link_options}
    -sSINGLE_FILE=1
    -sALLOW_MEMORY_GROWTH=1
    -sINLINING_LIMIT=1
    -sENVIRONMENT=worker
    -sINVOKE_RUN=0
    -O3
    -sPTHREAD_POOL_SIZE=navigator.hardwareConcurrency
    -sEXPORTED_FUNCTIONS=_Init,_Deinit,_JavaToBedrock,_BedrockToJava,_Xbox360ToJava,_Xbox360ToBedrock,_free
    -sASSERTIONS)
endif()

source_group(TREE ${CMAKE_CURRENT_LIST_DIR} FILES ${core_files})
