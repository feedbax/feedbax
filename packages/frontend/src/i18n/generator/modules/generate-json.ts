import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

import config from '@/i18n/config.json';
import createReviver from '@/i18n/generator/helper/create-reviver';

import type { Translation, Context } from '@/i18n/generator';

export default (
  async function generateJson({ translationDir }: Context): Promise<void> {
    for (let i = 0; i < config.locales.length; i += 1) {
      const locale = config.locales[i];

      const translationInputPath = path.join(translationDir, locale, 'translation.yaml');
      const translationOutputDir = path.join(translationDir, locale, '__generated');
      const translationOutputPath = path.join(translationOutputDir, 'translation.json');

      // eslint-disable-next-line no-await-in-loop
      const reviver = await createReviver(translationDir, locale);
      const translationData = fs.readFileSync(translationInputPath, 'utf-8');
      const translation: Translation = YAML.parse(translationData, reviver, {});

      fs.mkdirSync(translationOutputDir, { recursive: true });
      fs.writeFileSync(translationOutputPath, JSON.stringify(translation, null, 2));
    }
  }
);
