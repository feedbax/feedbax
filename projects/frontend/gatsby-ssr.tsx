import React from 'react';

import TranslationContext from '~components/I18n/Context';
import { translations } from '~locales';

import type { Locales } from '~locales';
import type { WrapPageElementNodeArgs } from 'gatsby';

type Props = WrapPageElementNodeArgs & {
  props: {
    pageContext: {
      originalPath: string;
      originalMatchPath?: string;
      locale: Locales;
    };
  };
};

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = (
  (props: Props): JSX.Element => {
    const { element, props: pros2 } = props;
    const { params, pageContext } = pros2;
    const { locale, originalPath, originalMatchPath } = pageContext;

    const translation = translations[locale];

    return (
      <TranslationContext.Provider
        value={{
          translation,
          locale,

          location: {
            params,
            path: originalPath,
            matchPath: originalMatchPath,
          },
        }}
      >
        {element}
      </TranslationContext.Provider>
    );
  }
);
