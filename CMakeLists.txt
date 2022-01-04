cmake_minimum_required(VERSION 3.22)
project(je2be-web)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_subdirectory(deps/je2be EXCLUDE_FROM_ALL)

add_executable(core src/core/core.cpp deps/zlib/contrib/minizip/zip.c deps/zlib/contrib/minizip/ioapi.c)
target_link_libraries(core je2be)
target_link_options(core PRIVATE -lidbfs.js --bind -s SINGLE_FILE=1 -g2 -fexceptions)
target_include_directories(core PRIVATE deps/zlib/contrib/minizip)
target_compile_definitions(core PRIVATE NOCRYPT)
target_compile_options(core PRIVATE -Wno-unused-value -Wno-unknown-attributes -g2 -fexceptions)

add_executable(region-core src/region/region-core.cpp include/db.hpp)
target_link_libraries(region-core je2be)
target_link_options(region-core PRIVATE -lidbfs.js --bind -s SINGLE_FILE=1 -g2 -fexceptions)
target_include_directories(region-core PRIVATE ./include)
target_compile_options(region-core PRIVATE -g2 -fexceptions)

add_executable(pre-core src/conv/pre-core.cpp)
target_link_libraries(pre-core je2be)
target_link_options(pre-core PRIVATE -lidbfs.js --bind -s SINGLE_FILE=1 -g2 -fexceptions)
target_compile_options(pre-core PRIVATE -g2 -fexceptions)
