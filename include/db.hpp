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
    std::string v = value.ToString();
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
    namespace fs = std::filesystem;
    auto env = Env::Default();
    WritableFile *ptr = nullptr;
    auto path = fDir / (fBasename + ".ldb." + to_string(fNumFiles));
    vector<pair<string, string>> buffer;
    buffer.swap(fBuffer);
    auto st = env->NewWritableFile(path, &ptr);
    if (!st.ok()) {
      return false;
    }
    unique_ptr<WritableFile> wf(ptr);
    Options o;
    o.compression = kZlibRawCompression;
    TableBuilder tb(o, wf.get());
    sort(buffer.begin(), buffer.end(), [](auto const &a, auto const &b) {
      Comparator const *comp = BytewiseComparator();
      return comp->Compare(a.first, b.first) < 0;
    });
    for (auto const &pair : buffer) {
      tb.Add(pair.first, pair.second);
    }
    st = tb.Finish();
    if (!st.ok()) {
      return false;
    }
    st = wf->Close();
    if (!st.ok()) {
      return false;
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
  std::vector<std::pair<std::string, std::string>> fBuffer;
};
