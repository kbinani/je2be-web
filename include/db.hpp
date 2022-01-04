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
      const key = UTF8ToString($0, $1);
      const value = UTF8ToString($2, $3);
      put(key, value);
    },
           key.c_str(), key.size(), v.c_str(), v.size());
#endif
  }

  void del(std::string const &key) override {
    //nop
  }

  bool close(std::optional<std::function<void(double progress)>> progress = std::nullopt) override {
    return true;
  }

  void abandon() override {
    //nop
  }
};
