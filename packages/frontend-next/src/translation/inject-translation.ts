import fs from 'fs';
import path from 'path';
import merge from 'lodash.merge';

import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticProps } from 'next';

export const injectTranslation = (
  <
    P extends { [key: string]: unknown } = { [key: string]: unknown },
    Q extends ParsedUrlQuery = ParsedUrlQuery
  > (getStaticProps: GetStaticProps<P, Q>): GetStaticProps<P, Q> => (
    async (props) => {
      const { locale } = props;

      if (typeof locale === 'undefined') throw new Error('locale is undefined');

      const translationsDir = path.resolve(process.cwd(), 'src/translation');
      const translationDir = path.join(translationsDir, locale);
      const translationPath = path.join(translationDir, '__do_not_edit___translation.json');
      const translationData = fs.readFileSync(translationPath, 'utf-8');

      const translation = JSON.parse(translationData);
      const mainProps = await getStaticProps(props);

      return merge(mainProps, {
        props: {
          translation,
        },
      });
    }
  )
);
