import fs from 'fs';
import path from 'path';
import jsonToTs from 'json-to-ts';

import config from '@/lib/i18n/config.json';

import type { Translation, Context } from '@/lib/i18n/generator';

export default (
  async function generateTypes({ translationDir }: Context): Promise<void> {
    const translationOutputPath = path.join(translationDir, config.defaultLocale, '__generated/translation.json');
    const translationData = fs.readFileSync(translationOutputPath, 'utf-8');
    const translation: Translation = JSON.parse(translationData);

    const types = jsonToTs(translation, { rootName: 'Translation' });
    const typesPath = path.join(translationDir, '../translation.d.ts');

    const typesHead = [
      '/**',
      ' * DO NOT MODIFY THIS FILE DIRECTLY.',
      ' * IT HAS BEEN GENERATED.',
      ' *',
      ` * @ ${Date.now()}`,
      ' */',
      '',
    ];

    const typesFull = [
      typesHead.join('\n'),
      types.join('\n\n'),
      '',
    ];

    fs.writeFileSync(typesPath, typesFull.join('\n'));
  }
);
