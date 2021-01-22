import fs from 'fs';
import path from 'path';

import YAML from 'yaml';
import jsonToTs from 'json-to-ts';

import config from '../../config.json';
import { createReviver } from './helper/create-reviver';

type Translation = Record<string, unknown>;

const translationDir = path.resolve(process.cwd(), 'src/i18n');

(async function main () {
  await generateJson();
  await generateTypes();
}());

async function generateJson () {
  for (let i = 0; i < config.locales.length; i += 1) {
    const locale = config.locales[i];

    const translationInputPath = path.join(translationDir, locale, 'translation.yaml');
    const translationOutputPath = path.join(translationDir, locale, '__do_not_edit__/translation.json');

    // eslint-disable-next-line no-await-in-loop
    const reviver = await createReviver(translationDir, locale);
    const translationData = fs.readFileSync(translationInputPath, 'utf-8');
    const translation: Translation = YAML.parse(translationData, reviver, {});

    fs.writeFileSync(translationOutputPath, JSON.stringify(translation, null, 2));
  }
}

async function generateTypes () {
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
