.PHONY: all
all: public/script/core.js public/script/core.wasm public/script/conv.js public/script/front.js public/sworker.js

.PHONY: clean
clean:
	rm -rf build/core.wasm build/core.js public/script

build/core.wasm: src/core/core.cpp CMakeLists.txt
	mkdir -p build
	docker run --rm -v $$(pwd):/src/je2be-web -u $$(id -u):$$(id -g) -w /src/je2be-web je2be_build_wasm make build_wasm

.PHONY: build_docker_image
build_docker_image:
	docker build -t je2be_build_wasm .

.PHONY: build_wasm
build_wasm:
	cd build && emcmake cmake .. && make -j $$(nproc) core

public/script/core.js: build/core.wasm
	mkdir -p public/script
	cp build/core.js public/script/core.js

public/script/core.wasm: build/core.wasm
	mkdir -p public/script
	cp build/core.wasm public/script/core.wasm

public/script/conv.js: src/conv/conv.ts src/conv/fs-ext.ts src/conv/index.d.ts
	yarn conv

public/script/front.js: src/front/index.tsx src/front/main.tsx src/share/messages.ts
	yarn front

public/sworker.js: src/sworker/sworker.ts
	yarn sworker
