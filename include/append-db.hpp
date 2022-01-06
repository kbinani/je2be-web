#pragma once

class AppendDb {
public:
  explicit AppendDb(std::string id) : fDir(std::filesystem::path("/je2be") / id / "out" / "db") {}

  bool append(std::string file, intptr_t key, int keySize) {
    //TODO:
    return false;
  }

private:
  std::filesystem::path fDir;
};
