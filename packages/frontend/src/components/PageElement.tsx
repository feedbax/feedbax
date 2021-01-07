import React, { useEffect } from 'react';
import TranslationContext from '~components/I18n/Context';

import 'focus-visible';

import type { Data as TranslationData } from '~types/translation';

type Props = {
  children: React.ReactNode;

  pageContext: {
    locale: string;
    locales: string[];
    translation: TranslationData;
  };
};

const PageElement = React.memo(
  (props: Props): JSX.Element => {
    const { children, pageContext } = props;
    const { locale, locales, translation } = pageContext;

    useEffect(() => {
      const fixViewportUnits = () => {
        const vh = window.innerHeight * 0.01;
        const vw = window.innerWidth * 0.01;

        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--vw', `${vw}px`);
      };

      window.addEventListener('resize', fixViewportUnits);
      fixViewportUnits();

      return () => window.removeEventListener('resize', fixViewportUnits);
    }, []);

    return (
      <TranslationContext.Provider
        value={{
          translation,
          locales,
          locale,
        }}
      >
        {children}
      </TranslationContext.Provider>
    );
  },
);

export default PageElement;
