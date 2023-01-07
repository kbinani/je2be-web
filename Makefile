.PHONY: all
all: public/script/front.js public/sworker.js public/script/converter.js public/script/core.js public/script/core.worker.js

.PHONY: clean
clean:
	rm -rf .wasm-built build public/script public/sworker.js

.PHONY: docker_image
docker_image:
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
		&& emcmake cmake ../.. -DCMAKE_BUILD_TYPE=Release \
		&& cmake --build . --parallel --target core --config Release --verbose

.PHONY: rebuild_wasm
rebuild_wasm:
	rm -f build/cxx/core.js build/cxx/core.worker.js
	docker run \
		--rm \
		-v $$(pwd):/src/je2be-web \
		-u $$(id -u):$$(id -g) \
		-w /src/je2be-web/build/cxx \
		je2be_build_wasm \
		cmake --build . --parallel --target core --config Release --verbose
	cp build/cxx/core.js public/script/core.js
	cp build/cxx/core.worker.js public/script/core.worker.js
	touch .wasm-built

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
