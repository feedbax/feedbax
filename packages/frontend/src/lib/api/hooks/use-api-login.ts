import { useEffect } from 'react';
import { useStore, selectors } from '@/lib/store';
import { useApi } from './use-api';

export function useApiLogin(slug: string | null) {
  const api = useApi();
  const loadEvent = useStore(selectors.loadEvent);
  const reset = useStore(selectors.reset);

  useEffect(
    () => {
      if (typeof slug !== 'string') return;
      if (typeof api === 'undefined') return;

      api.send({
        id: 'login',

        data: {
          uuid: 'author-a',
          eventSlug: slug,
        },

        cb: (data) => {
          if (data.err) {
            api.console.error('send', 'login', 'callback', { data });
            return;
          }

          if (data.event) {
            api.console.debug('send', 'login', 'callback', { data });

            reset();
            loadEvent(data.event);
          }
        },
      });
    },

    [api, slug],
  );
}
