import JSZip from "jszip";

export async function promiseUnzipFileInZip({
  zip,
  path,
}: {
  zip: JSZip;
  path: string;
}): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    const file = zip.file(path);
    if (!file) {
      reject();
      return;
    }
    file
      .async("uint8array")
      .then((buffer) => {
        resolve(buffer);
      })
      .catch(reject);
  });
}
