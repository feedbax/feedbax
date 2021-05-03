import { memo } from 'react';
import { useTranslation } from '@/i18n/hooks';

import Head from 'next/head';
import Link from 'next/link';
import Logo from '@/components/Logo';

import licenses from '@licenses';
import legalStyles from '@/pages/legal/page.module.scss';
import styles from './page.module.scss';

import type { GetStaticPaths, GetStaticProps } from 'next';

type Unpacked<T> = T extends (infer U)[] ? U : T;
type Licenses = typeof licenses;
type License = Unpacked<Licenses>;

type Props = {
  license?: License;
};

type AnyObject = Record<string, unknown>;
type Parameter = {
  license: string;
};

export default memo(
  function Disclaimer({ license }: Props) {
    const { t } = useTranslation();

    return (
      <div className={legalStyles.container}>
        <Head>
          <title>{t('pages', 'disclaimer', 'title')}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Logo
          href="/legal/disclaimer"
          className={legalStyles.logo}
        />

        <div className={styles.content}>
          <h3>{license?.name}</h3>
          <div>{`Version: ${license?.version}`}</div>
          <div>{`Author: ${license?.author ?? '-'}`}</div>
          <div>{`License: ${license?.license}`}</div>

          <Link href={license?.repository ?? '#'}>
            Repository
          </Link>

          {', '}

          <Link href={license?.source ?? '#'}>
            Source
          </Link>

          <p>{license?.licenseText}</p>
        </div>
      </div>
    );
  },
);

export const getStaticProps: GetStaticProps<AnyObject, Parameter> = (
  async ({ params }) => {
    const { default: slugify } = await import('slugify');

    for (let i = 0; i < licenses.length; i += 1) {
      const license = licenses[i];
      const licenseId = `${license.name}-${license.version}`;
      const licenseLink = slugify(licenseId);

      if (licenseLink === params?.license) {
        return { props: { license } };
      }
    }

    return { props: {} };
  }
);

export const getStaticPaths: GetStaticPaths<Parameter> = (
  async ({ locales }) => {
    if (!locales) throw new Error('locales undefined');

    const { default: slugify } = await import('slugify');

    type Path = {
      locale: string;
      params: {
        license: string;
      }
    };

    const paths: Path[] = [];

    for (let i = 0; i < (locales?.length ?? 0); i += 1) {
      const locale = locales[i];

      for (let j = 0; j < licenses.length; j += 1) {
        const license = licenses[j];
        const licenseId = `${license.name}-${license.version}`;
        const licenseLink = slugify(licenseId);

        paths.push({
          locale,
          params: {
            license: licenseLink,
          },
        });
      }
    }

    return ({ paths, fallback: false });
  }
);
