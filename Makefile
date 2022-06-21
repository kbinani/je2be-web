.PHONY: all
all: public/script/front.js public/sworker.js public/script/pre.js public/script/j2b-wasm.js public/script/j2b-wasm.worker.js public/script/j2b-wasm.wasm

.PHONY: clean
clean:
	rm -rf .wasm-built build/j2b-wasm.js build/j2b-wasm.worker.js build/j2b-wasm.wasm public/script

.PHONY: build_docker_image
build_docker_image:
	docker build -t je2be_build_wasm .


.wasm-built: src/worker/dedicated/pre-wasm.cpp deps/je2be/example/j2b.cpp include/proxy-db.hpp CMakeLists.txt
	mkdir -p build
	docker run --rm -v $$(pwd):/src/je2be-web -u $$(id -u):$$(id -g) -w /src/je2be-web je2be_build_wasm make wasm_target
	touch .wasm-built

.PHONY: wasm_target
wasm_target:
	cd build && emcmake cmake .. && make -j $$(nproc) j2b-wasm


build/j2b-wasm.js: .wasm-built

public/script/j2b-wasm.js: build/j2b-wasm.js
	mkdir -p public/script
	cp build/j2b-wasm.js public/script/j2b-wasm.js


public/script/j2b-wasm.worker.js: build/j2b-wasm.worker.js
	mkdir -p public/script
	cp build/j2b-wasm.worker.js public/script/j2b-wasm.worker.js

public/script/j2b-wasm.wasm: build/j2b-wasm.wasm
	mkdir -p public/script
	cp build/j2b-wasm.wasm public/script/j2b-wasm.wasm

public/script/pre.js: src/worker/dedicated/pre.ts src/share/fs-ext.ts src/worker/dedicated/index.d.ts src/share/messages.ts src/share/version.ts
	yarn pre --minify

public/script/front.js: src/front/index.tsx src/front/main.tsx src/front/footer.tsx src/front/header.tsx src/front/progress.tsx src/share/messages.ts src/share/version.ts
	yarn front --minify

public/sworker.js: src/worker/service/sworker.ts src/share/messages.ts src/share/version.ts
	yarn sworker --minify
