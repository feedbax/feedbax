/// <reference path="../../../global.d.ts" />

import translations from "./translations.json";
import PrivacyPolicy from "./privacy-policy.mdx";

export default {
  ...translations,
  "privacy-policy": {
    content: PrivacyPolicy,
  },
};
