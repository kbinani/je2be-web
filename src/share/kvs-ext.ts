import { mkdirp, mount } from "./fs-ext";
import { KvsClient } from "./kvs";

export async function mountFilesAsWorkerFs({
  kvs,
  prefix,
  mountPoint,
}: {
  kvs: KvsClient;
  prefix: string;
  mountPoint: string;
}) {
  const p = prefix.endsWith("/") ? prefix : `${prefix}/`;
  const original = await kvs.files({ withPrefix: p });
  const files = original.map((item) => {
    const file = item.file;
    const subpath = file.name.substring(p.length);
    return new File([file], subpath);
  });
  mkdirp(mountPoint);
  mount("worker", mountPoint, { files });
}
