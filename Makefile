.PHONY: all
all: public/script/front.js public/sworker.js public/script/chunk.js public/script/chunk-core.js public/script/pre.js public/script/pre-core.js public/script/post.js

.PHONY: clean
clean:
	rm -rf build/pre-core.js build/chunk-core.js build/chunk-core-prefix.js public/script

.PHONY: build_docker_image
build_docker_image:
	docker build -t je2be_build_wasm .


.PHONY: build_chunk_core_wasm
build_chunk_core_wasm:
	cd build && emcmake cmake .. && make -j $$(nproc) chunk-core

build/chunk-core.js: src/chunk/chunk-core.cpp include/db.hpp CMakeLists.txt
	mkdir -p build
	docker run --rm -v $$(pwd):/src/je2be-web -u $$(id -u):$$(id -g) -w /src/je2be-web je2be_build_wasm make build_chunk_core_wasm

public/script/chunk-core.js: build/chunk-core-prefix.js build/chunk-core.js
	mkdir -p public/script
	cat build/chunk-core-prefix.js build/chunk-core.js > public/script/chunk-core.js


.PHONY: build_pre_core_wasm
build_pre_core_wasm:
	cd build && emcmake cmake .. && make -j $$(nproc) pre-core

build/pre-core.js: src/conv/pre-core.cpp CMakeLists.txt
	mkdir -p build
	docker run --rm -v $$(pwd):/src/je2be-web -u $$(id -u):$$(id -g) -w /src/je2be-web je2be_build_wasm make build_pre_core_wasm

public/script/pre-core.js: build/pre-core.js
	mkdir -p public/script
	cp build/pre-core.js public/script/pre-core.js


public/script/pre.js: src/conv/pre.ts src/conv/fs-ext.ts src/conv/index.d.ts src/share/messages.ts src/share/version.ts
	yarn pre --minify

public/script/chunk.js: src/conv/chunk.ts src/conv/fs-ext.ts src/conv/index.d.ts src/share/messages.ts src/share/version.ts
	yarn chunk --minify

public/script/post.js: src/conv/post.ts src/conv/fs-ext.ts src/conv/index.d.ts src/share/messages.ts src/share/version.ts
	yarn post --minify

public/script/front.js: src/front/index.tsx src/front/main.tsx src/front/footer.tsx src/front/header.tsx src/front/progress.tsx src/share/messages.ts src/share/version.ts
	yarn front --minify

public/sworker.js: src/sworker/sworker.ts src/share/messages.ts src/share/version.ts
	yarn sworker

build/chunk-core-prefix.js: src/chunk/chunk-core-prefix.ts src/share/db-backend.ts
	yarn chunk-core-prefix
