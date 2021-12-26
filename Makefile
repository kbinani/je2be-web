build/cli.wasm:
	mkdir -p build
	cd build && emcmake cmake ../deps/je2be && make -j $$(nproc) cli

clean:
	rm -rf build
