.PHONY: all
all: public/script/front.js public/sworker.js public/script/converter.js public/script/core.js public/script/core.worker.js

.PHONY: clean
clean:
	rm -rf .wasm-built build/core.js build/core.worker.js public/script public/sworker.js

.PHONY: build_docker_image
build_docker_image:
	docker build -t je2be_build_wasm .


.wasm-built: src/worker/dedicated/core.cpp CMakeLists.txt
	mkdir -p build
	docker run --rm -v $$(pwd):/src/je2be-web -u emscripten:emscripten -w /src/je2be-web je2be_build_wasm make wasm_target
	touch .wasm-built

.PHONY: wasm_target
wasm_target:
	cd build && emcmake cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_LIBRARY_PATH=/emsdk/upstream/emscripten/cache/sysroot/lib/wasm32-emscripten/lto && make -j $$(nproc) core

build/core.js: .wasm-built

public/script/core.js: build/core.js
	mkdir -p public/script
	cp $^ $@


public/script/core.worker.js: build/core.worker.js
	mkdir -p public/script
	cp $^ $@

public/script/converter.js:
	yarn converter --minify

public/script/front.js:
	yarn front --minify

public/sworker.js:
	yarn sworker --minify
