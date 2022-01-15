#pragma once

class ProxyDb : public je2be::tobe::DbInterface {
private:
  std::string const fId;

public:
  ProxyDb(std::string id) : fId(id) {
#if defined(EMSCRIPTEN)
    EM_ASM({
      const id = UTF8ToString($0, $1);
      const m = {};
      m["type"] = "db_open";
      m["id"] = id;
      self.postMessage(m);
    },
           id.c_str(), id.size());
#endif
  }

  bool valid() const override {
    return true;
  }

  void put(std::string const &key, leveldb::Slice const &value) override {
    using namespace std;
#if defined(EMSCRIPTEN)
    EM_ASM({
      const m = {};
      const key = new Uint8Array($1);
      for (let i = 0; i < $1; i++) {
        key[i] = Module.HEAPU8[$0 + i];
      }
      const value = new Uint8Array($3);
      for (let i = 0; i < $3; i++) {
        value[i] = Module.HEAPU8[$2 + i];
      }
      const id = UTF8ToString($4, $5);
      m["type"] = "db_put";
      m["key"] = key;
      m["value"] = value;
      m["id"] = id;
      self.postMessage(m);
    },
           key.c_str(), key.size(), value.data(), value.size(), fId.c_str(), fId.size());
#endif
  }

  void del(std::string const &key) override {
  }

  bool close(std::optional<std::function<void(double progress)>> progress = std::nullopt) override {
#if defined(EMSCRIPTEN)
    EM_ASM({
      const m = {};
      const id = UTF8ToString($0, $1);
      m["type"] = "db_close";
      m["id"] = id;
      self.postMessage(m);
    },
           fId.c_str(), fId.size());
#endif
    return true;
  }

  void abandon() override {
  }
};
