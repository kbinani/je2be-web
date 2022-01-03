.PHONY: all
all: public/script/core.js public/script/conv.js public/script/front.js public/sworker.js

.PHONY: clean
clean:
	rm -rf build/core.wasm build/core.js public/script

build/core.js: src/core/core.cpp CMakeLists.txt
	mkdir -p build
	docker run --rm -v $$(pwd):/src/je2be-web -u $$(id -u):$$(id -g) -w /src/je2be-web je2be_build_wasm make build_wasm

.PHONY: build_docker_image
build_docker_image:
	docker build -t je2be_build_wasm .

.PHONY: build_wasm
build_wasm:
	cd build && emcmake cmake .. && make -j $$(nproc) core

public/script/core.js: build/core.js
	mkdir -p public/script
	cp build/core.js public/script/core.js

public/script/conv.js: src/conv/conv.ts src/conv/fs-ext.ts src/conv/index.d.ts src/share/messages.ts src/share/version.ts
	yarn conv --minify

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
