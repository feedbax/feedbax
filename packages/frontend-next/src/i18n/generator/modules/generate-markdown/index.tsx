import fs from 'fs';
import path from 'path';
import glob from 'glob';

import { Fragment } from 'react';
import { compiler } from 'markdown-to-jsx';
import { renderToStaticMarkup } from 'react-dom/server';

import config from '@/i18n/config.json';
import getHyphen from '@/i18n/generator/helper/get-hypen';

import type { Context } from '@/i18n/generator';

export default (
  async function generateMarkdown ({ translationDir }: Context): Promise<void> {
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

        const markdownPath = path.join(
          translationInputDir,
          '__do_not_edit__',
          `${fileParsedPath.name}.html`,
        );

        fs.writeFileSync(
          markdownPath,
          markdownHTMLHyphenated,
        );
      }
    }
  }
);
