import { useContext } from 'react';
import TranslationContext from '~components/I18n/Context';

import type { Translate } from '~components/I18n/types';

type TranslationHook = () => {
  locale: string;
  locales: string[];
  t: Translate;
};

const useTranslation: TranslationHook = (
  () => {
    const contextData = useContext(TranslationContext);

    const { locale, locales } = contextData;
    const { translation } = contextData;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const t: Translate = (
      (p1?: any, p2?: any, p3?: any) => {
        try {
          if (p1 && p2 && p3) {
            return (translation as any)[p1][p2][p3];
          }

          if (p1 && p2) {
            return (translation as any)[p1][p2];
          }

          if (p1) {
            return (translation as any)[p1];
          }
        } catch (error) {
          return 'error, translation not found.';
        }

        return translation;
      }
    );
    /* eslint-enable @typescript-eslint/no-explicit-any */

    return {
      locale,
      locales,
      t,
    };
  }
);

export default useTranslation;
