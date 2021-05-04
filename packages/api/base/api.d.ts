import { LogLevel } from "./logger";
declare type FromGeneric<T> = T & {
    type: 'client' | 'server';
    logLevel?: LogLevel;
};
declare type FromSocket<Socket> = FromGeneric<{
    socket: Socket;
}>;
export default class FBXAPI_BASE<Socket> {
    protected socket: Socket;
    private apiType;
    console: {
        trace: (...args: unknown[]) => void;
        debug: (...args: unknown[]) => void;
        error: (...args: unknown[]) => void;
    };
    constructor(props: FromSocket<Socket>);
}
export {};
