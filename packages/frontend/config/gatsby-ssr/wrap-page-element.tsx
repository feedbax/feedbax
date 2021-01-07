import React from 'react';
import PageElement from '~components/PageElement';

import type { WrapPageElementNodeArgs } from 'gatsby';

type TranslationData = import('~types/translation').Data;

type Props = WrapPageElementNodeArgs & {
  props: {
    pageContext: {
      locale: string;
      locales: string[];
      translation: TranslationData;
    };
  };
};

const wrapPageElement = (
  (props: Props): JSX.Element => {
    const { element, props: { pageContext } } = props;
    const { locale, locales, translation } = pageContext;

    return (
      <PageElement
        pageContext={{
          translation,
          locales,
          locale,
        }}
      >
        {element}
      </PageElement>
    );
  }
);

export default wrapPageElement;
