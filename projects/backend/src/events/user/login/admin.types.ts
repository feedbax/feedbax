import type { feedbax } from '@feedbax/protos';

export type RequestPacket = feedbax.Packets.Request.User.Login;
export type ResponsePacket = feedbax.Packets.Response.User.Login;
export type Ack = (res: Uint8Array) => void;

export type ValidRequestPacket = RequestPacket & {
  user: {
    uuid: string;
    email: string;
    password: string;
  }
};

export type Validator = (packet: RequestPacket) => asserts packet is ValidRequestPacket;
