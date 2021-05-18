import fs from 'fs';
import path from 'path';
import glob from 'glob';

import prettyFormat from 'pretty-format';
import Link from 'next/link';

import { Fragment } from 'react';
import { compiler } from 'markdown-to-jsx';

import config from '@/lib/i18n/config.json';
import getHyphen from '@/lib/i18n/generator/helper/get-hypen';

import type { Context } from '@/lib/i18n/generator';

type Loader = { locale: string; componentPath: string };

export default (
  async function generateMarkdown({ translationDir }: Context): Promise<void> {
    const mdTemplatePath = path.join(__dirname, './template-md-component.tsx');
    const mdTemplateContent = fs.readFileSync(mdTemplatePath, 'utf-8');

    const loaderTemplatePath = path.join(__dirname, './template-loader.ts');
    const loaderTemplateContent = fs.readFileSync(loaderTemplatePath, 'utf-8');

    const loadersMap = new Map<string, Loader[]>();

    for (let i = 0; i < config.locales.length; i += 1) {
      const locale = config.locales[i];

      // eslint-disable-next-line no-await-in-loop
      const { hyphenateHTMLSync } = await getHyphen(locale);

      const translationInputDir = path.join(translationDir, locale);
      const markdownPattern = path.join(translationInputDir, '**/*.md');

      const fileNames = glob.sync(markdownPattern);

      for (let j = 0; j < fileNames.length; j += 1) {
        const fileName = fileNames[j];
        const fileParsedPath = path.parse(fileName);

        const markdown = fs.readFileSync(fileName, 'utf-8');

        const markdownJSX = compiler(markdown, {
          wrapper: Fragment,

          overrides: {
            a: {
              component: Link,
            },
          },
        });

        const markdownHTML = prettyFormat(markdownJSX, {
          plugins: [prettyFormat.plugins.ReactElement],
          min: true,
        });

        const markdownHTMLHyphenated = hyphenateHTMLSync(markdownHTML);

        fs.writeFileSync(
          path.join(translationInputDir, '__generated', `${fileParsedPath.name}.tsx`),

          mdTemplateContent
            .replace('__datetime', `${Date.now()}`)
            .replace('<>{/* __markdown */}</>', markdownHTMLHyphenated),
        );

        const loaders = loadersMap.get(fileParsedPath.name) ?? [];

        loaders.push({ locale, componentPath: `@/lib/i18n/locales/${locale}/__generated/${fileParsedPath.name}` });
        loadersMap.set(fileParsedPath.name, loaders);
      }
    }

    const loaderEntriesIterator = loadersMap.entries();
    const loaderEntries = Array.from(loaderEntriesIterator);

    for (let i = 0; i < loaderEntries.length; i += 1) {
      const [fileName, loaders] = loaderEntries[i];

      const loaderDir = path.join(translationDir, 'generic/__generated');
      const loaderPath = path.join(loaderDir, `loader-${fileName}.ts`);

      const loadersCode = loaders.map(
        ({ locale, componentPath }) => (
          `  ${locale}: dynamic(() => import('${componentPath}')),`
        ),
      );

      const loaderCode = loaderTemplateContent
        .replace('__datetime', `${Date.now()}`)
        .replace('// __loaders', loadersCode.join('\n'));

      fs.mkdirSync(loaderDir, { recursive: true });
      fs.writeFileSync(loaderPath, loaderCode);
    }
  }
);
