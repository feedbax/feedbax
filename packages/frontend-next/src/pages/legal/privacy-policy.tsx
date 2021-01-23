import { memo } from 'react';
import { injcetTranslation } from '@/i18n/injector';

import Head from 'next/head';
import hyphens from '@/components/Hyphens';

import { useFela } from 'react-fela';
import { rules } from '@/styles/pages/legal/privacy-policy';

import type { GetStaticProps } from 'next';

export default memo(
  function PrivacyPolicy ({ content }: PrivacyPolicyProps) {
    const { css } = useFela();

    return (
      <div className={css(rules.container)}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <hyphens.div
          customRule={rules.content}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  },
);

export const getStaticProps: GetStaticProps = (
  async (_props) => {
    const props = await injcetTranslation(_props);
    const fs = await import('fs');

    const contentPath = `${process.cwd()}/src/i18n/${props.locale}/__do_not_edit__/privacy-policy.html`;
    const content = fs.readFileSync(contentPath, 'utf-8');

    return { props: { ...props, content } };
  }
);

type PrivacyPolicyProps = { content: string };
