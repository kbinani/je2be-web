# docker run --rm -v $(pwd):/src/je2be-web -u $(id -u):$(id -g) -w /src/je2be-web [IMAGE NAME HERE] make build/core.wasm

build/core.wasm:
	mkdir -p build
	cd build && emcmake cmake .. && make -j $$(nproc) core
	cp build/core.js public/out/
	cp build/core.wasm public/out/

clean:
	rm -rf build
