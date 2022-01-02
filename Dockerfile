ARG EMSCRIPTEN_VERSION=3.1.0
FROM emscripten/emsdk:${EMSCRIPTEN_VERSION}
ARG CMAKE_VERSION=3.22.1
RUN apt update \
    && apt remove cmake -y \
    && mkdir -p /src \
    && cd /src \
    && wget https://github.com/Kitware/CMake/releases/download/v${CMAKE_VERSION}/cmake-${CMAKE_VERSION}-linux-x86_64.sh \
    && sh ./cmake-${CMAKE_VERSION}-linux-x86_64.sh --skip-license --prefix=/usr/local --exclude-subdir \
    && rm -f /src/cmake-${CMAKE_VERSION}-linux-x86_64.sh
