import { LogLevel } from '@/base/logger';
import FBXAPI_BASE from '@/base/api';

import type { Socket } from 'socket.io-client';

type FromGeneric<T> = T & { logLevel?: LogLevel };
type FromSocket = FromGeneric<{ socket: Socket }>;

export default class FBXAPI extends FBXAPI_BASE<Socket> {
  public static from(props: FromSocket): FBXAPI {
    return new FBXAPI(props);
  }

  public constructor({ socket, logLevel = LogLevel.Error }: FromSocket) {
    super({ socket, type: 'client', logLevel });
  }

  public send(props: import('@/client/packets/login').PacketProps): void;
  public send(props: any): void {
    this.console.debug('send', props.id);
    this.socket.emit(props.id, props.data, props.cb);
  }
}

export { default as parser } from '@/base/parser';
export * as logger from '@/base/logger';
