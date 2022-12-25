.PHONY: all
all: public/script/front.js public/sworker.js public/script/converter.js public/script/core.js public/script/core.worker.js

.PHONY: clean
clean:
	rm -rf .wasm-built build public/script public/sworker.js

.PHONY: build_docker_image
build_docker_image:
	docker build -t je2be_build_wasm .


.wasm-built: src/worker/dedicated/core.cpp CMakeLists.txt
	mkdir -p build/cxx
	docker run \
		--rm \
		-v $$(pwd):/src/je2be-web \
		-u $$(id -u):$$(id -g) \
		-w /src/je2be-web \
		je2be_build_wasm \
		make wasm_target
	touch .wasm-built

.PHONY: wasm_target
wasm_target:
	cd build/cxx \
		&& emcmake cmake ../.. -DCMAKE_BUILD_TYPE=Release -DCMAKE_LIBRARY_PATH=/emsdk/upstream/emscripten/cache/sysroot/lib/wasm32-emscripten/lto \
		&& cmake --build . --parallel --target core --config Release --verbose


# script/core.js
build/cxx/core.js: .wasm-built

public/script/core.js: build/cxx/core.js
	mkdir -p public/script
	cp $^ $@


# script/core.worker.js
build/cxx/core.worker.js: .wasm-built

public/script/core.worker.js: build/cxx/core.worker.js
	mkdir -p public/script
	cp $^ $@


# script/converter.js
public/script/converter.js: build/ts/script/converter.js
	mkdir -p public/script
	cp $^ $@

build/ts/script/converter.js:
	yarn converter


# script/front.js
public/script/front.js: build/ts/script/front.js
	mkdir -p public/script
	cp $^ $@

build/ts/script/front.js:
	yarn front


# sworker.js
public/sworker.js: build/ts/sworker.js
	mkdir -p public/script
	cp $^ $@

build/ts/sworker.js:
	yarn sworker
