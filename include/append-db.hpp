#pragma once

class AppendDb {
public:
  explicit AppendDb(std::string id)
      : fValid(true), fDir(std::filesystem::path("/je2be") / id / "out" / "db"), fTableNumber(1), fOptions(Options()) {
    namespace fs = std::filesystem;
    std::error_code ec;
    fs::create_directories(fDir, ec);

    fFile.reset(openTableFile(fTableNumber));
    if (!fFile) {
      fValid = false;
      return;
    }
    fBuilder.reset(new leveldb::TableBuilder(fOptions, fFile.get()));
    fApproxSize = 0;
    fSequence = 0;
  }

  bool close() {
    using namespace std;
    using namespace leveldb;

    if (!fValid) {
      return false;
    }

    fBuilder->Finish();
    fFile->Close();
    if (fSmallest) {
      InternalKey largest;
      if (fLargest) {
        largest = *fLargest;
      } else {
        largest = *fSmallest;
      }
      fVersionEdit.AddFile(1, fTableNumber, fBuilder->FileSize(), *fSmallest, largest);
    }

    fVersionEdit.SetLastSequence(fSequence);
    fVersionEdit.SetNextFile(fTableNumber + 1);
    fVersionEdit.SetLogNumber(0);
    string manifestRecord;
    fVersionEdit.EncodeTo(&manifestRecord);

    string manifestFileName = "MANIFEST-000001";

    unique_ptr<WritableFile> meta(OpenWritable(fDir / manifestFileName));
    leveldb::log::Writer writer(meta.get());
    Status st = writer.AddRecord(manifestRecord);
    if (!st.ok()) {
      return false;
    }
    meta->Close();
    meta.reset();

    unique_ptr<WritableFile> current(OpenWritable(fDir / "CURRENT"));
    st = current->Append(manifestFileName + "\x0a");
    if (!st.ok()) {
      return false;
    }
    current->Close();
    current.reset();

    return true;
  }

  int append(intptr_t valuePtr, intptr_t keyPtr, int keySize) {
    if (!fValid) {
      return -1;
    }
    if (doAppend(valuePtr, keyPtr, keySize)) {
      if (fTableNumber > 0) {
        return fTableNumber - 1;
      } else {
        return 0;
      }
    } else {
      return -1;
    }
  }

private:
  bool doAppend(intptr_t valuePtr, intptr_t rawKeyPtr, int keySize) {
    using namespace std;
    using namespace mcfile;
    using namespace leveldb;
    namespace fs = std::filesystem;

    char const *keyPtr = (char const *)rawKeyPtr;

    uint32_t compressedValueSize = *(uint32_t *)valuePtr;
    vector<uint8_t> valueBuffer;
    if (compressedValueSize > 0) {
      copy_n(((uint8_t *)valuePtr) + 4, compressedValueSize, back_inserter(valueBuffer));
      if (!Compression::decompress(valueBuffer)) {
        return false;
      }
    }

    size_t approxSize = fApproxSize + keySize + compressedValueSize;
    if (approxSize > fOptions.max_file_size && fSmallest) {
      fBuilder->Finish();
      fFile->Close();

      InternalKey largest;
      if (fLargest) {
        largest = *fLargest;
      } else {
        largest = *fSmallest;
      }
      fVersionEdit.AddFile(1, fTableNumber, fBuilder->FileSize(), *fSmallest, largest);

      fSmallest = nullopt;
      fLargest = nullopt;
      fTableNumber++;
      fApproxSize = 0;
      fFile.reset(openTableFile(fTableNumber));
      if (!fFile) {
        return false;
      }
      fBuilder.reset(new TableBuilder(fOptions, fFile.get()));
    }

    fSequence++;
    Slice value((char const *)valueBuffer.data(), valueBuffer.size());
    Slice userKey(keyPtr, keySize);
    InternalKey ik(userKey, fSequence, kTypeValue);
    fBuilder->Add(ik.Encode(), value);
    fBuilder->Flush();

    if (!fSmallest) {
      fSmallest = ik;
    }
    fLargest = ik;
    fApproxSize += keySize + compressedValueSize;

    return true;
  }

  static leveldb::WritableFile *OpenWritable(std::filesystem::path const &path) {
    using namespace leveldb;
    Env *env = Env::Default();
    WritableFile *file = nullptr;
    Status st = env->NewWritableFile(path, &file);
    if (!st.ok()) {
      return nullptr;
    }
    return file;
  }

  leveldb::WritableFile *openTableFile(uint64_t tableNumber) const {
    return OpenWritable(tableFilePath(tableNumber));
  }

  std::filesystem::path tableFilePath(uint64_t tableNumber) const {
    std::vector<char> buffer(11, (char)0);
    sprintf(buffer.data(), "%06llu.ldb", tableNumber);
    std::string p(buffer.data(), 10);
    return fDir / p;
  }

  static leveldb::Options Options() {
    using namespace leveldb;
    static InternalKeyComparator sCmp(BytewiseComparator());
    leveldb::Options o;
    o.compression = kZlibRawCompression;
    o.comparator = &sCmp;
    return o;
  }

private:
  bool fValid;
  std::filesystem::path fDir;
  uint64_t fTableNumber;
  std::unique_ptr<leveldb::TableBuilder> fBuilder;
  std::unique_ptr<leveldb::WritableFile> fFile;
  size_t fApproxSize;
  leveldb::Options const fOptions;
  uint64_t fSequence;
  leveldb::VersionEdit fVersionEdit;
  std::optional<leveldb::InternalKey> fLargest;
  std::optional<leveldb::InternalKey> fSmallest;
};
