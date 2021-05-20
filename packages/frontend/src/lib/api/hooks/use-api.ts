import create from 'zustand';

import { io } from '@feedbax/api/client/socket';
import FBXAPI, { parser, logger } from '@feedbax/api/client/api';

import useMounted from './use-mounted';

type ApiStore = {
  api?: FBXAPI;
  setApi: (api: FBXAPI) => void;
};

const useStore = create<ApiStore>((set) => ({
  api: undefined,
  setApi: (api) => set((state) => ({
    ...state,
    api,
  })),
}));

const selectors = {
  api: (state: ApiStore) => state.api,
  setApi: (state: ApiStore) => state.setApi,
};

export function useApi() {
  const api = useStore(selectors.api);
  const setApi = useStore(selectors.setApi);

  useMounted(() => {
    if (typeof api === 'undefined') {
      const socket = io('ws://localhost:4000', {
        transports: ['websocket'],
        reconnection: false,
        parser,
      });

      const $api = FBXAPI.from({
        logLevel: logger.LogLevel.Trace,
        socket,
      });

      setApi($api);
    }
  });

  return api;
}
