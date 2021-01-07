import React from 'react';
import PageElement from '~components/PageElement';

import type { WrapPageElementBrowserArgs } from 'gatsby';

type TranslationData = import('~types/translation').Data;

type Props = WrapPageElementBrowserArgs & {
  props: {
    pageContext: {
      locale: string;
      locales: string[];
      translation: TranslationData;
    };
  };
};

const wrapPageElement = (
  ({ element, props }: Props): JSX.Element => {
    const { pageContext } = props;
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
