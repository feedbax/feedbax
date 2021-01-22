import fs from 'fs';
import path from 'path';
import jsonToTs from 'json-to-ts';

import config from '@/i18n/config.json';

import type { Translation, Context } from '@/i18n/generator';

export default (
  async function generateTypes ({ translationDir }: Context): Promise<void> {
    const translationOutputPath = path.join(translationDir, config.defaultLocale, '__do_not_edit__/translation.json');
    const translationData = fs.readFileSync(translationOutputPath, 'utf-8');
    const translation: Translation = JSON.parse(translationData);

    const types = jsonToTs(translation, { rootName: 'Translation' });
    const typesPath = path.join(translationDir, 'translation.d.ts');

    const typesHead = [
      '/**',
      ' * DO NOT EDIT, THIS FILE WAS GENERATED',
      ` * @ ${(new Date()).toISOString()}`,
      ' */',
      '',
      '/* eslint-disable */',
      '',
    ];

    const typesFull = [
      typesHead.join('\n'),
      types.join('\n\n'),
    ];

    fs.writeFileSync(typesPath, typesFull.join('\n'));
  }
);
