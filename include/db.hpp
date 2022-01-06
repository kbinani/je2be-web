#pragma once

class Db : public je2be::tobe::DbInterface {
public:
  explicit Db(std::filesystem::path dir, std::string basename) : fDir(dir), fBasename(basename) {}

  bool valid() const override {
    return fValid;
  }

  void put(std::string const &key, leveldb::Slice const &value) override {
    if (!fValid) {
      return;
    }
    std::vector<uint8_t> v;
    std::copy_n(value.data(), value.size(), std::back_inserter(v));
    if (!mcfile::Compression::compress(v)) {
      fValid = false;
      return;
    }
    fBuffer.push_back(std::make_pair(key, v));
    if (fBuffer.size() >= 512) {
      fValid = flush();
    }
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

  bool flush() {
    using namespace std;
    using namespace leveldb;
    using namespace mcfile;
    namespace fs = std::filesystem;

    if (!fValid) {
      return false;
    }

    auto keys = fDir / (fBasename + "." + to_string(fNumFiles) + ".keys");
    auto values = fDir / (fBasename + "." + to_string(fNumFiles) + ".values");

    vector<pair<string, vector<uint8_t>>> buffer;
    fBuffer.swap(buffer);

    je2be::ScopedFile valuesF(File::Open(values, File::Mode::Write));
    je2be::ScopedFile keysF(File::Open(keys, File::Mode::Write));
    if (!valuesF) {
      fValid = false;
      return false;
    }
    if (!keysF) {
      fValid = false;
      return false;
    }

    uint32_t pos = 0;
    for (auto const &pair : buffer) {
      uint32_t valueSize = pair.second.size();
      if (fwrite(&valueSize, sizeof(valueSize), 1, valuesF) != 1) {
        fValid = false;
        return false;
      }
      if (fwrite(pair.second.data(), valueSize, 1, valuesF) != 1) {
        fValid = false;
        return false;
      }
      pos += valueSize + sizeof(valueSize);
      uint32_t keySize = pair.first.size();
      if (fwrite(&pos, sizeof(pos), 1, keysF) != 1) {
        fValid = false;
        return false;
      }
      if (fwrite(&keySize, sizeof(keySize), 1, keysF) != 1) {
        fValid = false;
        return false;
      }
      if (fwrite(pair.first.c_str(), keySize, 1, keysF) != 1) {
        fValid = false;
        return false;
      }
    }

    fNumFiles++;
    return true;
  }

public:
  int fNumFiles = 0;

private:
  bool fValid = true;
  std::filesystem::path fDir;
  std::string fBasename;
  std::vector<std::pair<std::string, std::vector<uint8_t>>> fBuffer;
};
