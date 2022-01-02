ARG EMSCRIPTEN_VERSION=3.1.0
FROM emscripten/emsdk:${EMSCRIPTEN_VERSION}
ARG CMAKE_VERSION=3.22.1
RUN apt update \
    && apt remove cmake -y \
    && mkdir -p /src \
    && cd /src \
    && wget https://github.com/Kitware/CMake/releases/download/v${CMAKE_VERSION}/cmake-${CMAKE_VERSION}.tar.gz \
    && tar zxf cmake-${CMAKE_VERSION}.tar.gz \
    && cd cmake-${CMAKE_VERSION} \
    && ./bootstrap --parallel=$(nproc) -- -DCMAKE_USE_OPENSSL=OFF -DBUILD_TESTING=OFF \
    && make -j $(nproc) \
    && make install \
    && rm -rf /src/cmake-${CMAKE_VERSION} /src/cmake-${CMAKE_VERSION}.tar.gz
