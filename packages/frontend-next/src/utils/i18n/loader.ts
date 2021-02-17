import { injcetTranslation } from '@/utils/i18n/injector';
import type { GetStaticProps } from 'next';

export const withI18n = (
  (fn: GetStaticProps): GetStaticProps => async (context) => {
    const contextWithTranslation = await injcetTranslation(context);
    return fn(contextWithTranslation);
  }
);
