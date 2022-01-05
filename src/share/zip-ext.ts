import JSZip from "jszip";

export async function promiseUnzipFileInZip({
  zip,
  path,
}: {
  zip: JSZip;
  path: string;
}): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    zip
      .file(path)
      .async("uint8array")
      .then((buffer) => {
        resolve(buffer);
      })
      .catch(reject);
  });
}
