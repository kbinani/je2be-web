#pragma once

class Db : public je2be::tobe::DbInterface {
public:
  bool valid() const override {
    return true;
  }

  void put(std::string const &key, leveldb::Slice const &value) override {
    std::string v = value.ToString();
#if defined(EMSCRIPTEN)
    EM_ASM({
      const key = new Uint8Array($1);
      for (let i = 0; i < $1; i++) {
        key[i] = Module.HEAPU8[$0 + i];
      }
      const value = new Uint8Array($3);
      for (let i = 0; i < $3; i++) {
        value[i] = Module.HEAPU8[$2 + i];
      }
      PutToDb(key, value);
    },
           key.c_str(), key.size(), v.c_str(), v.size());
#endif
  }

  void del(std::string const &key) override {
    // nop
  }

  bool close(std::optional<std::function<void(double progress)>> progress = std::nullopt) override {
    return true;
  }

  void abandon() override {
    // nop
  }
};
