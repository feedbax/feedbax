import React from 'react';
import TranslationContext from '~components/I18n/Context';

import type { WrapPageElementBrowserArgs } from 'gatsby';
import type { TranslationDataClean } from '~components/I18n/types';

type Props = WrapPageElementBrowserArgs & {
  props: {
    pageContext: {
      originalPath: string;
      originalMatchPath?: string;

      locale: string;
      locales: string[];
      translation: TranslationDataClean;
    };
  };
};

const wrapPageElement = (
  ({ element, props }: Props): JSX.Element => {
    const { params, pageContext } = props;

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

export default wrapPageElement;
