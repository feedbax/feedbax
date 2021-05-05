import { LogLevel } from '@/base/logger';
import FBXAPI_BASE from '@/base/api';

import type { Socket } from 'socket.io';

type FromGeneric<T> = T & { logLevel?: LogLevel };
type FromSocket = FromGeneric<{ socket: Socket }>;

export default class FBXAPI extends FBXAPI_BASE<Socket> {
  public static from(props: FromSocket): FBXAPI {
    return new FBXAPI(props);
  }

  public constructor({ socket, logLevel = LogLevel.Error }: FromSocket) {
    super({ socket, type: 'server', logLevel });
  }

  public on(props: import('@/server/packets/login').PacketProps): void;
  public on(props: any): void {
    this.console.debug('on', props.id);
    this.socket.on(props.id, props.handler);
  }
}

export { default as parser } from '@/base/parser';
export * as logger from '@/base/logger';
