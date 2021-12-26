project(je2be-web)

if (NOT CMAKE_CXX_STANDARD)
  set(CMAKE_CXX_STANDARD 20)
  set(CMAKE_CXX_STANDARD_REQUIRED ON)
  set(CMAKE_CXX_EXTENSIONS OFF)
endif()

add_subdirectory(deps/je2be)
add_executable(core src/core/main.cpp)
target_link_libraries(core je2be)
