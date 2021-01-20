import fs from 'fs';
import path from 'path';

import YAML from 'yaml';
import jsonToTs from 'json-to-ts';

import { createReviver } from './create-reviver';

type Translation = Record<string, unknown>;
type Context = { translationsDir: string; locales: string[]; };

(async function main () {
  const translationsDir = path.resolve(process.cwd(), 'src/translation');
  const locales = ['de', 'en'];

  await generateJson({ translationsDir, locales });
  await generateTypes({ translationsDir, locales });
}());

async function generateJson (props: Context) {
  const { translationsDir, locales } = props;

  for (let i = 0; i < locales.length; i += 1) {
    const locale = locales[i];

    const translationDir = path.join(translationsDir, locale);
    const translationPath = path.join(translationDir, 'translations.yaml');
    const translationJsonPath = path.join(translationDir, 'translations.json');

    // eslint-disable-next-line no-await-in-loop
    const reviver = await createReviver(translationDir);
    const translationData = fs.readFileSync(translationPath, 'utf-8');
    const translation: Translation = YAML.parse(translationData, reviver, {});

    fs.writeFileSync(translationJsonPath, JSON.stringify(translation, null, 2));
  }
}

async function generateTypes (props: Context) {
  const { translationsDir, locales } = props;
  const [firstLocale] = locales;

  const translationDir = path.join(translationsDir, firstLocale);
  const translationPath = path.join(translationDir, 'translations.json');
  const translationData = fs.readFileSync(translationPath, 'utf-8');
  const translation: Translation = JSON.parse(translationData);

  const types = jsonToTs(translation, { rootName: 'Translation' });
  const typesPath = path.join(translationsDir, 'translation.d.ts');

  fs.writeFileSync(typesPath, types.join('\n\n'));
}
