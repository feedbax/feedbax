import { memo, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { io } from '@feedbax/api/client/socket';
import FBXAPI, { parser, logger } from '@feedbax/api/client/api';

import type { GetStaticPaths, GetStaticProps } from 'next';
import { useStore } from '@/store';

export default memo(
  function Event() {
    const router = useRouter();

    const store = useStore();
    const loadEvent = useStore((state) => state.loadEvent);

    const apiRef = useRef<boolean>(false);

    useEffect(() => console.log('store', store), [store]);

    useEffect(() => {
      if (typeof router.query.slug === 'string' && apiRef.current === false) {
        apiRef.current = true;

        const socket = io('ws://localhost:4000', { parser, transports: ['websocket'] });
        const api = FBXAPI.from({ socket, logLevel: logger.LogLevel.Trace });

        api.send({
          id: 'login',

          data: {
            uuid: 'author-a',
            eventSlug: router.query.slug,
          },

          cb: (data) => {
            if (data.err) {
              api.console.error('api.send', 'login', 'callback', data.err);
              return;
            }

            if (data.event) {
              api.console.debug('api.send', 'login', 'callback', data.event);
              loadEvent(data.event);
            }
          },
        });
      }
    }, [router.query.slug]);

    if (router.isFallback) return <div>Loading..</div>;

    return (
      <pre>
        {JSON.stringify(router, null, 2)}
      </pre>
    );
  },
);

export const getStaticProps: GetStaticProps = (
  async () => ({
    props: {},
    revalidate: 1,
  })
);

export const getStaticPaths: GetStaticPaths = (
  async () => ({ paths: [], fallback: true })
);
