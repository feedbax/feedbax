import fs from 'fs';
import path from 'path';
import glob from 'glob';

import { Fragment } from 'react';
import { compiler } from 'markdown-to-jsx';
import { renderToStaticMarkup } from 'react-dom/server';

import config from '@/i18n/config.json';
import getHyphen from '@/i18n/generator/helper/get-hypen';

import type { Context } from '@/i18n/generator';

type Loader = { locale: string; componentPath: string };

export default (
  async function generateMarkdown ({ translationDir }: Context): Promise<void> {
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
        const markdownJSX = compiler(markdown, { wrapper: Fragment });
        const markdownHTML = renderToStaticMarkup(markdownJSX);
        const markdownHTMLHyphenated = hyphenateHTMLSync(markdownHTML);

        fs.writeFileSync(
          path.join(translationInputDir, '__generated', `${fileParsedPath.name}.tsx`),

          mdTemplateContent
            .replace('__datetime', `${Date.now()}`)
            .replace('{__markdown}', markdownHTMLHyphenated),
        );

        const loaders = loadersMap.get(fileParsedPath.name) ?? [];

        loaders.push({ locale, componentPath: `@/i18n/locales/${locale}/__generated/${fileParsedPath.name}` });
        loadersMap.set(fileParsedPath.name, loaders);
      }
    }

    const _loaderEntries = loadersMap.entries();
    const loaderEntries = Array.from(_loaderEntries);

    for (let i = 0; i < loaderEntries.length; i += 1) {
      const [fileName, loaders] = loaderEntries[i];

      const loadersCode = loaders.map(
        ({ locale, componentPath }) => (
          `  ${locale}: dynamic(() => import('${componentPath}')),`
        ),
      );

      fs.writeFileSync(
        path.join(
          translationDir,
          'generic/__generated',
          `loader-${fileName}.ts`,
        ),

        loaderTemplateContent
          .replace('__datetime', `${Date.now()}`)
          .replace('// __loaders', loadersCode.join('\n')),
      );
    }
  }
);
