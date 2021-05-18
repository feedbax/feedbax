import path from 'path';

import generateJson from './modules/generate-json';
import generateTypes from './modules/generate-types';
import generateMarkdown from './modules/generate-markdown';

export type Translation = Record<string, unknown>;
export type Context = { translationDir: string };

(async function main() {
  const translationDir = path.resolve(process.cwd(), 'src/lib/i18n/locales');

  await generateJson({ translationDir });
  await generateTypes({ translationDir });
  await generateMarkdown({ translationDir });
}());
