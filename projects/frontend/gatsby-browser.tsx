import React from 'react';

import TranslationContext from '~components/I18n/Context';
import { translations } from '~locales';

import type { Locales } from '~locales';
import type { WrapPageElementBrowserArgs } from 'gatsby';

type Props = WrapPageElementBrowserArgs & {
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
  ({ element, props }: Props): JSX.Element => {
    const { params, pageContext } = props;
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
