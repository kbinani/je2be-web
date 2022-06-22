.PHONY: all
all: public/script/front.js public/sworker.js public/script/converter.js public/script/core.js public/script/core.worker.js public/script/core.wasm

.PHONY: clean
clean:
	rm -rf .wasm-built build/core.js build/core.worker.js build/core.wasm public/script public/sworker.js

.PHONY: build_docker_image
build_docker_image:
	docker build -t je2be_build_wasm .


.wasm-built: src/worker/dedicated/core.cpp CMakeLists.txt
	mkdir -p build
	docker run --rm -v $$(pwd):/src/je2be-web -u $$(id -u):$$(id -g) -w /src/je2be-web je2be_build_wasm make wasm_target
	touch .wasm-built

.PHONY: wasm_target
wasm_target:
	cd build && emcmake cmake .. && make -j $$(nproc) core


build/core.js: .wasm-built

public/script/core.js: build/core.js
	mkdir -p public/script
	echo $@
	echo $<
	echo $^
	cp build/core.js public/script/core.js


public/script/core.worker.js: build/core.worker.js
	mkdir -p public/script
	cp build/core.worker.js public/script/core.worker.js

public/script/core.wasm: build/core.wasm
	mkdir -p public/script
	cp build/core.wasm public/script/core.wasm

public/script/converter.js: src/worker/dedicated/converter.ts src/share/fs-ext.ts src/worker/dedicated/index.d.ts src/share/messages.ts src/share/version.ts
	yarn converter --minify

public/script/front.js: src/front/index.tsx src/front/main.tsx src/front/footer.tsx src/front/header.tsx src/front/progress.tsx src/share/messages.ts src/share/version.ts
	yarn front --minify

public/sworker.js: src/worker/service/sworker.ts src/share/messages.ts src/share/version.ts
	yarn sworker --minify
