import React from 'react';
import TranslationContext from '~components/I18n/Context';

import 'focus-visible';
import '~fix-vx-units';

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
    const { element, props: props2 } = props;
    const { pageContext } = props2;
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
