.PHONY: all
all: public/script/front.js public/sworker.js public/script/region.js public/script/region-wasm.js public/script/pre.js public/script/pre-wasm.js public/script/post.js public/script/post-wasm.js

.PHONY: clean
clean:
	rm -rf .wasm-build build/pre-wasm.js build/region-wasm.js build/post-wasm.js public/script

.PHONY: build_docker_image
build_docker_image:
	docker build -t je2be_build_wasm .


.wasm-built: src/worker/dedicated/pre-wasm.cpp src/worker/dedicated/region-wasm.cpp src/worker/dedicated/post-wasm.cpp include/db.hpp include/append-db.hpp CMakeLists.txt
	mkdir -p build
	docker run --rm -v $$(pwd):/src/je2be-web -u $$(id -u):$$(id -g) -w /src/je2be-web je2be_build_wasm make wasm_target
	touch .wasm-built

.PHONY: wasm_target
wasm_target:
	cd build && emcmake cmake .. && make -j $$(nproc) pre-wasm region-wasm post-wasm


build/region-wasm.js: .wasm-built
build/pre-wasm.js: .wasm-built
build/post-wasm.js: .wasm-built

public/script/region-wasm.js: build/region-wasm.js
	mkdir -p public/script
	cp build/region-wasm.js public/script/region-wasm.js

public/script/pre-wasm.js: build/pre-wasm.js
	mkdir -p public/script
	cp build/pre-wasm.js public/script/pre-wasm.js

public/script/post-wasm.js: build/post-wasm.js
	mkdir -p public/script
	cp build/post-wasm.js public/script/post-wasm.js


public/script/pre.js: src/worker/dedicated/pre.ts src/share/fs-ext.ts src/worker/dedicated/index.d.ts src/share/messages.ts src/share/version.ts
	yarn pre --minify

public/script/region.js: src/worker/dedicated/region.ts src/share/fs-ext.ts src/worker/dedicated/index.d.ts src/share/messages.ts src/share/version.ts
	yarn region --minify

public/script/post.js: src/worker/dedicated/post.ts src/share/fs-ext.ts src/worker/dedicated/index.d.ts src/share/messages.ts src/share/version.ts
	yarn post --minify

public/script/front.js: src/front/index.tsx src/front/main.tsx src/front/footer.tsx src/front/header.tsx src/front/progress.tsx src/share/messages.ts src/share/version.ts
	yarn front --minify

public/sworker.js: src/worker/service/sworker.ts src/share/messages.ts src/share/version.ts
	yarn sworker --minify
