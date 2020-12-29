export interface Translation {
  id: string;
  parent: string;
  internal: Internal;
  locale: string;
  data: Data;
  children: any[];
}

export interface Data {
  menu: Menu;
  home: Home;
  generic: Generic;
}

export interface Generic {
  footer: Footer;
  cookie_consent: Cookieconsent;
  locales: Locales;
}

export interface Locales {
  de: string;
  en: string;
  it: string;
  pl: string;
  hr: string;
}

export interface Cookieconsent {
  title: string;
  content: string;
  small: string;
  agree: string;
}

export interface Footer {
  privacy_policy: string;
  imprint: string;
  disclaimer: string;
}

export interface Home {
  lets_go: string;
  see_more: string;
  your_tool: string;
  benefit_1: string;
  benefit_2: string;
  benefit_3: string;
  benefit_4: Benefit4;
  benefit_5: Benefit4;
  benefit_6: Benefit6;
}

export interface Benefit6 {
  title: string;
  content_1: string;
}

export interface Benefit4 {
  title: string;
  content_1: string;
  content_2: string;
}

export interface Menu {
  change_locale: string;
  create_event: string;
  logout: string;
}

export interface Internal {
  contentDigest: string;
  type: string;
  counter: number;
  owner: string;
}