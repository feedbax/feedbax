import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';

import { io } from '@feedbax/api/client/socket';
import FBXAPI, { parser, logger } from '@feedbax/api/client/api';

import type { GetStaticPaths, GetStaticProps } from 'next';

export default memo(
  function Event() {
    const router = useRouter();

    useEffect(() => {
      const socket = io('ws://localhost:4000', { parser, transports: ['websocket'] });
      const api = FBXAPI.from({ socket, logLevel: logger.LogLevel.Trace });

      api.send({
        id: 'login',
        data: {
          uuid: '',
          eventSlug: '',
        },

        cb: (data) => {
          if (data.err) {
            api.console.error('api.send', 'login', 'callback', data.err);
            return;
          }

          api.console.debug('api.send', 'login', 'callback', data.event);
        },
      });
    }, []);

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
