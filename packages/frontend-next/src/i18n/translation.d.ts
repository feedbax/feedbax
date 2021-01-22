/**
 * DO NOT EDIT, THIS FILE WAS GENERATED
 * @ 2021-01-22T10:56:58.705Z
 */

/* eslint-disable */

interface Translation {
  menu: Menu;
  home: Home;
  generic: Generic;
}

interface Generic {
  footer: Footer;
  cookie_consent: Cookieconsent;
  locales: Locales;
}

interface Locales {
  de: string;
  en: string;
  it: string;
  pl: string;
  hr: string;
}

interface Cookieconsent {
  title: string;
  content: string;
  small: string;
  agree: string;
}

interface Footer {
  privacy_policy: string;
  imprint: string;
  disclaimer: string;
}

interface Home {
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

interface Benefit6 {
  title: string;
  content_1: string;
}

interface Benefit4 {
  title: string;
  content_1: string;
  content_2: string;
}

interface Menu {
  change_locale: string;
  create_event: string;
  logout: string;
}