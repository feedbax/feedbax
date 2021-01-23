import fs from 'fs';
import path from 'path';

import type { GetStaticPropsContext } from 'next';

export const injcetTranslation = (
  async <T extends GetStaticPropsContext> (props: T): Promise<T & { translation: Translation }> => {
    const { locale } = props;

    if (typeof locale === 'undefined') throw new Error('locale is undefined');

    const translationsDir = path.resolve(process.cwd(), 'src/i18n');
    const translationDir = path.join(translationsDir, locale);
    const translationPath = path.join(translationDir, '__do_not_edit__/translation.json');
    const translationData = fs.readFileSync(translationPath, 'utf-8');

    const translation = JSON.parse(translationData);

    return {
      ...props,
      translation,
    };
  }
);
