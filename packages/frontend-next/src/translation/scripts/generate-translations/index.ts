import fs from 'fs';
import path from 'path';

import YAML from 'yaml';
import jsonToTs from 'json-to-ts';

import { createReviver } from './create-reviver';

type Translation = Record<string, unknown>;

const locales = ['de', 'en'];
const defaultLocale = 'en';

const inputDir = path.resolve(__dirname, 'languages');
const outputDir = path.resolve(process.cwd(), 'src/translation');

(async function main () {
  await generateJson();
  await generateTypes();
}());

async function generateJson () {
  for (let i = 0; i < locales.length; i += 1) {
    const locale = locales[i];

    const translationInputPath = path.join(inputDir, `${locale}.yaml`);
    const translationOutputPath = path.join(outputDir, locale, '__do_not_edit___translation.json');

    // eslint-disable-next-line no-await-in-loop
    const reviver = await createReviver(inputDir, locale);
    const translationData = fs.readFileSync(translationInputPath, 'utf-8');
    const translation: Translation = YAML.parse(translationData, reviver, {});

    fs.writeFileSync(translationOutputPath, JSON.stringify(translation, null, 2));
  }
}

async function generateTypes () {
  const translationOutputPath = path.join(outputDir, defaultLocale, '__do_not_edit___translation.json');
  const translationData = fs.readFileSync(translationOutputPath, 'utf-8');
  const translation: Translation = JSON.parse(translationData);

  const types = jsonToTs(translation, { rootName: 'Translation' });
  const typesPath = path.join(outputDir, 'translation.d.ts');

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
