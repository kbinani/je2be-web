FROM emscripten/emsdk:latest
ARG CMAKE_VERSION=3.22.1
RUN cd /src && wget https://github.com/Kitware/CMake/releases/download/v${CMAKE_VERSION}/cmake-${CMAKE_VERSION}.tar.gz
RUN apt update && apt remove cmake -y && apt install libssl-dev -y
RUN cd /src && tar zxf cmake-${CMAKE_VERSION}.tar.gz && cd cmake-${CMAKE_VERSION} && ./bootstrap && make -j $(nproc) && make install
