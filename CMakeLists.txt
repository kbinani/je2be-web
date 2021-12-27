cmake_minimum_required(VERSION 3.22)
project(je2be-web)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_subdirectory(deps/je2be)
add_executable(core src/core/main.cpp)
target_link_libraries(core je2be)
target_link_options(core PRIVATE -lidbfs.js --bind)
