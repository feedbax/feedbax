export interface Locales {
  id: string;
  parent: string;
  internal: Internal;
  data: string[];
  children: any[];
}

export interface Internal {
  contentDigest: string;
  type: string;
  counter: number;
  owner: string;
}