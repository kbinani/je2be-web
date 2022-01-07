.PHONY: all
all: public/script/front.js public/sworker.js public/script/region.js public/script/region-core.js public/script/pre.js public/script/pre-core.js public/script/post.js public/script/post-core.js

.PHONY: clean
clean:
	rm -rf .wasm-build build/pre-core.js build/region-core.js build/post-core.js public/script

.PHONY: build_docker_image
build_docker_image:
	docker build -t je2be_build_wasm .


.wasm-build: src/dworker/pre-core.cpp src/dworker/region-core.cpp src/dworker/post-core.cpp include/db.hpp include/append-db.hpp CMakeLists.txt
	mkdir -p build
	docker run --rm -v $$(pwd):/src/je2be-web -u $$(id -u):$$(id -g) -w /src/je2be-web je2be_build_wasm make wasm_target
	touch .wasm-build

.PHONY: wasm_target
wasm_target:
	cd build && emcmake cmake .. && make -j $$(nproc) pre-core region-core post-core


build/region-core.js: .wasm-build
build/pre-core.js: .wasm-build
build/post-core.js: .wasm-build

public/script/region-core.js: build/region-core.js
	mkdir -p public/script
	cp build/region-core.js public/script/region-core.js

public/script/pre-core.js: build/pre-core.js
	mkdir -p public/script
	cp build/pre-core.js public/script/pre-core.js

public/script/post-core.js: build/post-core.js
	mkdir -p public/script
	cp build/post-core.js public/script/post-core.js


public/script/pre.js: src/dworker/pre.ts src/dworker/fs-ext.ts src/dworker/index.d.ts src/share/messages.ts src/share/version.ts
	yarn pre --minify

public/script/region.js: src/dworker/region.ts src/dworker/fs-ext.ts src/dworker/index.d.ts src/share/messages.ts src/share/version.ts
	yarn region --minify

public/script/post.js: src/dworker/post.ts src/dworker/fs-ext.ts src/dworker/index.d.ts src/share/messages.ts src/share/version.ts
	yarn post --minify

public/script/front.js: src/front/index.tsx src/front/main.tsx src/front/footer.tsx src/front/header.tsx src/front/progress.tsx src/share/messages.ts src/share/version.ts
	yarn front --minify

public/sworker.js: src/sworker/sworker.ts src/share/messages.ts src/share/version.ts
	yarn sworker --minify
