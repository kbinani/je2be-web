export function directoryNameFromFileList(
  fileList: FileList
): string | undefined {
  let dirname: string | undefined = undefined;
  for (let i = 0; i < fileList.length; i++) {
    const item = fileList.item(i);
    if (!item) {
      continue;
    }
    const index = item.webkitRelativePath.indexOf(item.name);
    if (index < 0) {
      continue;
    }
    const name = item.webkitRelativePath.substring(0, index);
    if (dirname === undefined) {
      dirname = name;
    } else {
      if (dirname.length > name.length) {
        dirname = name;
      }
    }
  }
  if (dirname === undefined) {
    return undefined;
  }
  if (dirname.endsWith("/")) {
    dirname = dirname.substring(0, dirname.length - 1);
  }
  return dirname;
}
