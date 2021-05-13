import create from 'zustand';

import { io } from '@feedbax/api/client/socket';
import FBXAPI, { parser, logger } from '@feedbax/api/client/api';

import useMounted from './use-mounted';

type ApiStore = {
  api?: FBXAPI;
  setApi: (api: FBXAPI) => void;
};

const useApi = create<ApiStore>((set) => ({
  api: undefined,

  setApi: (api) => set((state) => ({
    ...state,
    api,
  })),
}));

export default function useFeedbaxApi() {
  const api = useApi((state) => state.api);
  const setApi = useApi((state) => state.setApi);

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
