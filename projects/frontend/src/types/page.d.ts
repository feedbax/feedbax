export interface Page {
  id: string;
  children: any[];
  parent?: any;
  internal: Internal;
  sourceInstanceName: string;
  relativePath: string;
  extension: string;
  prettySize: string;
  modifiedTime: string;
  accessTime: string;
  changeTime: string;
  birthTime: string;
  root: string;
  dir: string;
  base: string;
  ext: string;
  name: string;
  absolutePath: string;
  relativeDirectory: string;
  dev: number;
  mode: number;
  nlink: number;
  uid: number;
  rdev: number;
  blksize: number;
  ino: number;
  size: number;
  blocks: number;
  atimeMs: number;
  mtimeMs: number;
  ctimeMs: number;
  birthtimeMs: number;
  atime: string;
  mtime: string;
  ctime: string;
  birthtime: string;
}

export interface Internal {
  contentDigest: string;
  type: string;
  mediaType: string;
  description: string;
  counter: number;
  owner: string;
}