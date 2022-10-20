ARG EMSCRIPTEN_VERSION=3.1.24
FROM emscripten/emsdk:${EMSCRIPTEN_VERSION}
ARG CMAKE_VERSION=3.24.2
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
    && ./embuilder.py build --lto libembind-rtti libGL libGL-mt libal libhtml5 libstubs libstubs-debug libc libc-mt libc-mt-debug libcompiler_rt libcompiler_rt-mt libc++ libc++-mt libc++abi libc++abi-mt libdlmalloc libdlmalloc-mt libsockets libsockets-mt libnoexit libc++abi-debug-mt \
    && echo 'int main() { return 0; }' > /tmp/a.c \
    && emcc -sUSE_ZLIB=1 -flto /tmp/a.c -lz -o /tmp/a.out \
    && rm -f /tmp/a.c /tmp/a.out \
    && chmod o+wrx -R /emsdk
