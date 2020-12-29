type TranslationContent = import('~types/translation-content').TranslationContent;

type Query = {
  translationMarkdown: TranslationContent;
};

export type PrivacyPolicyProps = {
  data: Query;
};
