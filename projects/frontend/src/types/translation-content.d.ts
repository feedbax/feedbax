export interface TranslationContent {
  id: string;
  parent: string;
  internal: Internal;
  locale: string;
  file: string;
  data: string;
  children: any[];
}

export interface Internal {
  contentDigest: string;
  type: string;
  counter: number;
  owner: string;
}