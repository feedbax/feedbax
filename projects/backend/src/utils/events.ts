import { workerId } from '@utils/worker';
import { feedbax } from '@feedbax/protos';

import type { Socket } from 'socket.io';

const PacketIds = feedbax.Packets.Ids;

export type Handler = (...args: any[]) => Promise<void>;
export const $try = (
  (socket: Socket, handler: Handler): Handler => {
    const $handler: Handler = (
      async (...args) => {
        try {
          await handler.bind(socket)(...args);
        } catch (error) {
          const ack = args[args.length - 1];

          const Response = feedbax.Packets.Response.Utils.Empty;
          const errorMessage = Response.create({ error: { message: error.message } });
          const errorBinary = Response.encode(errorMessage).finish();

          console.error(`[worker-${workerId}]`, `[socket-${socket.id}]`, '[error]', error.message);

          if (typeof ack === 'function') {
            ack(errorBinary);
          } else {
            socket.emit(`${PacketIds.Utils.ERROR}`, errorBinary);
          }
        }
      }
    );

    return $handler;
  }
);

const isNull = (
  <T>(value: T | null): value is null => {
    if (value === null) return true;
    return false;
  }
);

// const notNull = (
//   <T>(value: T | null): value is T => !isNull(value)
// );

export type CheckTypes = 'string' | 'object';
export const checkValid = (
  (value: unknown, checkType: CheckTypes): boolean => {
    switch (checkType) {
      case 'string': {
        if (typeof value !== 'string') {
          return false;
        }

        const isSet = value !== undefined;
        const isEmpty = value === '';

        return isSet && !isEmpty;
      }

      case 'object': {
        if (typeof value !== 'object' || isNull(value)) {
          return false;
        }

        const isSet = value !== undefined;
        const isEmpty = Object.keys(value).length === 0;

        return isSet && !isEmpty;
      }

      default:
        return false;
    }
  }
);
