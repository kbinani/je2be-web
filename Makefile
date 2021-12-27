.PHONY: all
all: public/script/core.js public/script/core.wasm public/script/converter.js

.PHONY: clean
clean:
	rm -rf build/core.wasm build/core.js public/script

build/core.wasm: src/core/main.cpp CMakeLists.txt
	mkdir -p build
	docker run --rm -v $$(pwd):/src/je2be-web -u $$(id -u):$$(id -g) -w /src/je2be-web je2be_build_wasm make build_wasm

build_docker_image:
	docker build -t je2be_build_wasm .

.PHONY: build_wasm
build_wasm:
	cd build && emcmake cmake .. && make -j $$(nproc) core

public/script/converter.js: src/converter/main.ts src/converter/fs-ext.ts src/converter/index.d.ts
	yarn esbuild src/converter/main.ts --bundle --define:process.env.NODE_ENV="production" --outfile=public/script/converter.js

public/script/core.js: build/core.wasm
	mkdir -p public/script
	cp build/core.js public/script/core.js

public/script/core.wasm: build/core.wasm
	mkdir -p public/script
	cp build/core.wasm public/script/core.wasm
