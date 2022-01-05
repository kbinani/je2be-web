.PHONY: all
all: public/script/front.js public/sworker.js public/script/region.js public/script/region-core.js public/script/pre.js public/script/pre-core.js public/script/post.js

.PHONY: clean
clean:
	rm -rf build/pre-core.js build/region-core.js public/script

.PHONY: build_docker_image
build_docker_image:
	docker build -t je2be_build_wasm .


.PHONY: build_region_core_wasm
build_region_core_wasm:
	cd build && emcmake cmake .. && make -j $$(nproc) region-core

build/region-core.js: src/region/region-core.cpp include/db.hpp CMakeLists.txt
	mkdir -p build
	docker run --rm -v $$(pwd):/src/je2be-web -u $$(id -u):$$(id -g) -w /src/je2be-web je2be_build_wasm make build_region_core_wasm
	touch build/region-core.js

public/script/region-core.js: build/region-core.js
	mkdir -p public/script
	cp build/region-core.js public/script/region-core.js


.PHONY: build_pre_core_wasm
build_pre_core_wasm:
	cd build && emcmake cmake .. && make -j $$(nproc) pre-core

build/pre-core.js: src/conv/pre-core.cpp CMakeLists.txt
	mkdir -p build
	docker run --rm -v $$(pwd):/src/je2be-web -u $$(id -u):$$(id -g) -w /src/je2be-web je2be_build_wasm make build_pre_core_wasm
	touch build/pre-core.js

public/script/pre-core.js: build/pre-core.js
	mkdir -p public/script
	cp build/pre-core.js public/script/pre-core.js


public/script/pre.js: src/conv/pre.ts src/conv/fs-ext.ts src/conv/index.d.ts src/share/messages.ts src/share/version.ts
	yarn pre --minify

public/script/region.js: src/conv/region.ts src/conv/fs-ext.ts src/conv/index.d.ts src/share/messages.ts src/share/version.ts
	yarn region --minify

public/script/post.js: src/conv/post.ts src/conv/fs-ext.ts src/conv/index.d.ts src/share/messages.ts src/share/version.ts
	yarn post --minify

public/script/front.js: src/front/index.tsx src/front/main.tsx src/front/footer.tsx src/front/header.tsx src/front/progress.tsx src/share/messages.ts src/share/version.ts
	yarn front --minify

public/sworker.js: src/sworker/sworker.ts src/share/messages.ts src/share/version.ts
	yarn sworker --minify
