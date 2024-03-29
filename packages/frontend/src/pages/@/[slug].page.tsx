import { motion, AnimatePresence } from 'framer-motion';

import { memo } from 'react';
import { useEffect, useState, useRef } from 'react';
import { useStore, selectors } from '@/lib/store';
import { useApiLogin } from '@/lib/api';

import Head from 'next/head';
import CookieConsent from '@/components/CookieConsent/dynamic';

import Loading from './components/Loading';
import Logo from './components/Logo';
import Pagination from './components/Pagination';
import Questions from './components/Questions';
import Filters from './components/Filters';
import Reactions from './components/Reactions';

import prisma from '@/lib/prisma';
import styles from './page.module.scss';

import type { GetServerSideProps } from 'next';
import type { Variants, Transition } from 'framer-motion';

const LOADING_TIMEOUT = 1000;

const variants: Variants = {
  initial: {
    opacity: 1,
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
  },

  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    WebkitBackdropFilter: 'blur(0px)',
  },
};

const transition: Transition = {
  duration: 0.4,
};

export default memo(
  function Event(props: Props) {
    const now = useRef(Date.now());

    const { slug, ogTitle } = props;
    const { ogDescription, ogImage } = props;

    const [isLoading, setLoading] = useState(true);
    const event = useStore(selectors.event.get);

    useEffect(
      function eventChanged() {
        if (event.id !== undefined) {
          console.log('event', event);

          const timeSinceCreated = Date.now() - now.current;
          setTimeout(() => setLoading(false), LOADING_TIMEOUT - timeSinceCreated);
        }
      },

      [event],
    );

    useApiLogin(slug);

    return (
      <div className={styles.container}>
        <Head>
          <meta property="og:title" content={ogTitle ?? undefined} />
          <meta property="og:description" content={ogDescription ?? undefined} />
          <meta property="og:image" content={ogImage ?? undefined} />
        </Head>

        <CookieConsent />

        <AnimatePresence>
          {isLoading && (
            <motion.div
              className={styles.loading}
              transition={transition}
              variants={variants}
              initial="initial"
              exit="exit"
            >
              <Loading />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.heading} ref={console.log}>
          <Logo />
          <Pagination />
          <Questions />
          <Filters />
        </div>

        <Reactions />
      </div>
    );
  },
);

type Params = { slug: string };
type Props = {
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;

  slug: string | null;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = (
  async (context) => {
    const slug = context.params?.slug;
    const { host } = context.req.headers;

    const event = await prisma.event.findUnique({
      where: { slug },
      select: {
        meta: {
          select: {
            title: true,
            description: true,
          },
        },
      },
    });

    return {
      props: {
        slug: slug ?? null,
        ogTitle: event?.meta?.title ?? slug ?? null,
        ogDescription: event?.meta?.description ?? null,
        ogImage: `${host}/api/event/${slug}/meta/image.jpg`,
      },
    };
  }
);
