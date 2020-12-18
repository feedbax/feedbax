import React from 'react';
import TranslationContext from '~components/I18n/Context';

import type { WrapPageElementNodeArgs } from 'gatsby';
import type { TranslationData } from '~graphql-types';

type Props = WrapPageElementNodeArgs & {
  props: {
    pageContext: {
      originalPath: string;
      originalMatchPath?: string;

      locale: string;
      locales: string[];
      translation: TranslationData;
    };
  };
};

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = (
  (props: Props): JSX.Element => {
    const { element, props: props2 } = props;
    const { params, pageContext } = props2;

    const { originalPath, originalMatchPath } = pageContext;
    const { locale, locales, translation } = pageContext;

    return (
      <TranslationContext.Provider
        value={{
          translation,
          locales,
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
