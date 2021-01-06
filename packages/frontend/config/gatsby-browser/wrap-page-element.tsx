import React from 'react';
import TranslationContext from '~components/I18n/Context';

import 'focus-visible';
import '~fix-vx-units';

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
      <TranslationContext.Provider
        value={{
          translation,
          locales,
          locale,
        }}
      >
        {element}
      </TranslationContext.Provider>
    );
  }
);

export default wrapPageElement;
