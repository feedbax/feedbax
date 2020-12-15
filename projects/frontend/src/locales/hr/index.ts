// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../globals.d.ts" />

import translations from './translations.json';
import PrivacyPolicy from './privacy-policy.mdx';
import locales from '../locales.json';

export default {
  ...translations,

  locales,

  'privacy-policy': {
    content: PrivacyPolicy,
  },
};
