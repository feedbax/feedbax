import consola, { LogLevel } from '@/generic/logger';

type FromGeneric<T> = T & {
  type: 'client' | 'server',
  logLevel?: LogLevel
};

type FromSocket<Socket> = FromGeneric<{ socket: Socket }>;

export default class FBXAPI_BASE<Socket> {
  protected socket: Socket;
  private apiType: string;

  public console = {
    trace: (...args: unknown[]) => {
      consola.trace('FBXAPI', this.apiType, ...args);
    },

    debug: (...args: unknown[]) => {
      consola.debug('FBXAPI', this.apiType, ...args);
    },

    error: (...args: unknown[]) => {
      consola.error('FBXAPI', this.apiType, ...args);
    }
  };

  public constructor(props: FromSocket<Socket>) {
    const { socket, type } = props;
    const { logLevel = LogLevel.Error } = props;

    consola.level = logLevel;
    
    this.apiType = type;
    this.socket = socket;

    this.console.trace('created');
  }
}
