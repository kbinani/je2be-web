#if defined(EMSCRIPTEN)
#include <emscripten.h>
#include <emscripten/bind.h>
#endif

#include <iostream>

#include <db/log_reader.h>
#include <je2be.hpp>
#include <zip.h>

#include "db.hpp"

using namespace std;
using namespace mcfile;
using namespace je2be;
using namespace je2be::tobe;
using namespace leveldb;
namespace fs = std::filesystem;

int Post(string id) {
  fs::path inputDir = fs::path("/je2be") / id / "in";
  fs::path outputDir = fs::path("/je2be") / id / "out";
  auto dbPath = outputDir / "db";

  error_code ec;
  fs::create_directories(dbPath, ec);
  if (ec) {
    return -1;
  }

  InputOption io;
  io.fLevelDirectoryStructure = LevelDirectoryStructure::Vanilla;
  auto data = Level::Read(io.getLevelDatFilePath(inputDir));
  if (!data) {
    return -1;
  }
  Level level = Level::Import(*data);

  bool ok = Datapacks::Import(inputDir, outputDir);

  auto levelData = make_unique<LevelData>(inputDir, io);

  auto worldDataDir = fs::path("/je2be") / id / "wd";
  for (Dimension dim : {Dimension::Overworld, Dimension::Nether, Dimension::End}) {
    auto dir = worldDataDir / to_string(static_cast<uint8_t>(dim));
    for (auto it : fs::directory_iterator(dir)) {
      auto file = it.path();
      auto s = make_shared<stream::FileInputStream>(file);
      stream::InputStreamReader reader(s);
      auto tag = make_shared<nbt::CompoundTag>();
      if (!tag->read(reader)) {
        return -1;
      }
      auto wd = WorldData::FromNbt(*tag);
      if (!wd) {
        return -1;
      }
      wd->drain(*levelData);
    }
  }

  auto ldbDir = fs::path("/je2be") / id / "ldb";
  ec.clear();
  fs::create_directories(ldbDir, ec);
  ::Db db(ldbDir, "level");

  auto localPlayerData = Converter::LocalPlayerData(*data, *levelData);
  if (localPlayerData) {
    auto k = mcfile::be::DbKey::LocalPlayer();
    db.put(k, *localPlayerData);
  }

  if (ok) {
    level.fCurrentTick = max(level.fCurrentTick, levelData->fMaxChunkLastUpdate);
    ok = level.write(outputDir / "level.dat");
    if (ok) {
      ok = levelData->put(db, *data);
    }
  }

  ec.clear();
  fs::remove_all(inputDir, ec);

  if (!db.valid()) {
    return -1;
  }
  if (!db.flush()) {
    return -1;
  }

  return db.fNumFiles;
}

void RemoveAll(string dir) {
  error_code ec;
  fs::remove_all(fs::path(dir), ec);
}

static bool GetInternalKey(Slice *input, InternalKey *dst) {
  Slice str;
  if (GetLengthPrefixedSlice(input, &str)) {
    return dst->DecodeFrom(str);
  } else {
    return false;
  }
}

static bool GetLevel(Slice *input, int *level) {
  uint32_t v;
  if (GetVarint32(input, &v) && v < config::kNumLevels) {
    *level = v;
    return true;
  } else {
    return false;
  }
}

bool ExtractFileMetaData(fs::path file, vector<FileMetaData> &buffer) {
  using namespace std;
  using namespace leveldb;

  // Tag numbers for serialized VersionEdit.  These numbers are written to
  // disk and should not be changed.
  enum Tag {
    kComparator = 1,
    kLogNumber = 2,
    kNextFileNumber = 3,
    kLastSequence = 4,
    kCompactPointer = 5,
    kDeletedFile = 6,
    kNewFile = 7,
    // 8 was used for large value refs
    kPrevLogNumber = 9
  };

  auto env = Env::Default();
  SequentialFile *sf = nullptr;
  if (!env->NewSequentialFile(file, &sf).ok()) {
    return false;
  }
  leveldb::log::Reader reader(sf, nullptr, true, 0);
  Slice record;
  string scratch;
  if (!reader.ReadRecord(&record, &scratch)) {
    return false;
  }
  delete sf;

  VersionEdit v;
  v.DecodeFrom(record);

  Slice input = record;
  const char *msg = nullptr;
  uint32_t tag;

  // Temporary storage for parsing
  int level;
  uint64_t number;
  FileMetaData f;
  Slice str;
  InternalKey key;

  // private members of VersionEdit
  std::string comparator_;
  uint64_t log_number_;
  uint64_t prev_log_number_;
  uint64_t next_file_number_;
  SequenceNumber last_sequence_;
  bool has_comparator_;
  bool has_log_number_;
  bool has_prev_log_number_;
  bool has_next_file_number_;
  bool has_last_sequence_;
  std::vector<std::pair<int, InternalKey>> compact_pointers_;
  //DeletedFileSet deleted_files_;
  std::vector<std::pair<int, FileMetaData>> new_files_;

  while (msg == nullptr && GetVarint32(&input, &tag)) {
    switch (tag) {
    case kComparator:
      if (GetLengthPrefixedSlice(&input, &str)) {
        comparator_ = str.ToString();
        has_comparator_ = true;
      } else {
        msg = "comparator name";
      }
      break;

    case kLogNumber:
      if (GetVarint64(&input, &log_number_)) {
        has_log_number_ = true;
      } else {
        msg = "log number";
      }
      break;

    case kPrevLogNumber:
      if (GetVarint64(&input, &prev_log_number_)) {
        has_prev_log_number_ = true;
      } else {
        msg = "previous log number";
      }
      break;

    case kNextFileNumber:
      if (GetVarint64(&input, &next_file_number_)) {
        has_next_file_number_ = true;
      } else {
        msg = "next file number";
      }
      break;

    case kLastSequence:
      if (GetVarint64(&input, &last_sequence_)) {
        has_last_sequence_ = true;
      } else {
        msg = "last sequence number";
      }
      break;

    case kCompactPointer:
      if (GetLevel(&input, &level) && GetInternalKey(&input, &key)) {
        compact_pointers_.push_back(std::make_pair(level, key));
      } else {
        msg = "compaction pointer";
      }
      break;

    case kDeletedFile:
      if (GetLevel(&input, &level) && GetVarint64(&input, &number)) {
        //deleted_files_.insert(std::make_pair(level, number));
      } else {
        msg = "deleted file";
      }
      break;

    case kNewFile:
      if (GetLevel(&input, &level) && GetVarint64(&input, &f.number) &&
          GetVarint64(&input, &f.file_size) &&
          GetInternalKey(&input, &f.smallest) &&
          GetInternalKey(&input, &f.largest)) {
        //new_files_.push_back(std::make_pair(level, f));
        buffer.push_back(f);
      } else {
        msg = "new-file entry";
      }
      break;

    default:
      msg = "unknown tag";
      break;
    }
  }
  if (msg == nullptr && !input.empty()) {
    msg = "invalid tag";
  }
  if (msg != nullptr) {
    return false;
  }
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

bool MergeManifests(string id, int numWorkers, uint32_t lastSequence) {
  using namespace std;
  using namespace mcfile;
  namespace fs = std::filesystem;

  auto dir = fs::path("/je2be") / id / "out" / "db";

  vector<FileMetaData> buffer;
  for (int i = 0; i < numWorkers; i++) {
    auto file = dir / (to_string(i) + ".manifest");
    if (!ExtractFileMetaData(file, buffer)) {
      return false;
    }
  }

  VersionEdit edit;
  uint64_t nextTableNumber = 1;
  for (FileMetaData const &meta : buffer) {
    edit.AddFile(1, nextTableNumber, meta.file_size, meta.smallest, meta.largest);
    nextTableNumber++;
  }
  edit.SetLastSequence(lastSequence);
  edit.SetNextFile(nextTableNumber);
  edit.SetLogNumber(0);
  string manifestRecord;
  edit.EncodeTo(&manifestRecord);

  string manifestFileName = "MANIFEST-000001";

  unique_ptr<WritableFile> meta(OpenWritable(dir / manifestFileName));
  leveldb::log::Writer writer(meta.get());
  Status st = writer.AddRecord(manifestRecord);
  if (!st.ok()) {
    return false;
  }
  meta->Close();
  meta.reset();

  unique_ptr<WritableFile> current(OpenWritable(dir / "CURRENT"));
  st = current->Append(manifestFileName + "\x0a");
  if (!st.ok()) {
    return false;
  }
  current->Close();
  current.reset();

  return true;
}

#if defined(EMSCRIPTEN)
EMSCRIPTEN_BINDINGS() {
  emscripten::function("Post", &Post);
  emscripten::function("RemoveAll", &RemoveAll);
  emscripten::function("MergeManifests", &MergeManifests);
}
#endif
