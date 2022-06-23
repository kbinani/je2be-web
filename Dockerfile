ARG EMSCRIPTEN_VERSION=3.1.14
FROM emscripten/emsdk:${EMSCRIPTEN_VERSION}
ARG CMAKE_VERSION=3.23.2
RUN apt update \
    && apt remove cmake -y \
    && apt install gpg -y \
    && mkdir -p /src \
    && cd /src \
    && wget https://github.com/Kitware/CMake/releases/download/v${CMAKE_VERSION}/cmake-${CMAKE_VERSION}-linux-x86_64.sh \
    && wget https://github.com/Kitware/CMake/releases/download/v${CMAKE_VERSION}/cmake-${CMAKE_VERSION}-SHA-256.txt.asc \
    && wget https://github.com/Kitware/CMake/releases/download/v${CMAKE_VERSION}/cmake-${CMAKE_VERSION}-SHA-256.txt \
    && gpg --keyserver hkps://keyserver.ubuntu.com --recv-keys C6C265324BBEBDC350B513D02D2CEF1034921684 \
    && gpg --verify cmake-${CMAKE_VERSION}-SHA-256.txt.asc cmake-${CMAKE_VERSION}-SHA-256.txt \
    && sha256sum -c --ignore-missing cmake-${CMAKE_VERSION}-SHA-256.txt \
    && sh ./cmake-${CMAKE_VERSION}-linux-x86_64.sh --skip-license --prefix=/usr/local --exclude-subdir \
    && rm -f /src/cmake-${CMAKE_VERSION}-linux-x86_64.sh
RUN cd /emsdk/upstream/emscripten \
    && ./embuilder.py build --lto libembind-rtti libGL libGL-mt libal libhtml5 libstubs libstubs-debug libc libc-mt libc-mt-debug libcompiler_rt libcompiler_rt-mt libc++ libc++-mt libc++abi libc++abi-mt libdlmalloc libdlmalloc-mt libsockets libsockets-mt libnoexit \
    && chown emscripten:emscripten -R /emsdk/upstream/emscripten/cache/sysroot/lib/wasm32-emscripten/lto \
    && chmod og+w /emsdk/upstream/emscripten/cache/sysroot/lib/wasm32-emscripten/lto
