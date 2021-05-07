import Emitter from 'component-emitter';

import { Encoder as MSGPACKEncoder } from "@msgpack/msgpack";
import { Decoder as MSGPACKDecoder } from "@msgpack/msgpack";

enum PacketType {
  CONNECT,
  DISCONNECT,
  EVENT,
  ACK,
  CONNECT_ERROR,
  BINARY_EVENT,
  BINARY_ACK,
}

interface Packet {
  type: PacketType;
  nsp: string;
  data?: any;
  id?: number;
  attachments?: number;
}

class Encoder {
  private static packetEncoder = new MSGPACKEncoder();

  encode(packet: Packet) {
    const rawData = Encoder.packetEncoder.encode(packet);
    const buffer = rawData.buffer.slice(rawData.byteOffset, rawData.byteLength + rawData.byteOffset);
    const data = [buffer];

    return data;
  }
}

class Decoder extends Emitter {
  private static packetDecoder = new MSGPACKDecoder();

  add(chunk: Buffer) {
    let packet: Packet;

    try {
      packet = Decoder.packetDecoder.decode(chunk) as Packet;
    } catch (error) {
      throw new Error("decoding failed");
    }
  
    if (this.isPacketValid(packet)) {
      this.emit("decoded", packet);
    } else {
      throw new Error("invalid format");
    }
  }

  isPacketValid({ type, data, nsp, id }: Packet) {
    const isNamespaceValid = typeof nsp === "string";
    const isAckIdValid = id === undefined || Number.isInteger(id);

    if (!isNamespaceValid || !isAckIdValid) {
      return false;
    }

    switch (type) {
      case PacketType.CONNECT:
        return data === undefined || typeof data === "object";

      case PacketType.DISCONNECT:
        return data === undefined;

      case PacketType.EVENT:
        return Array.isArray(data) && data.length > 0;

      case PacketType.ACK:
        return Array.isArray(data);

      case PacketType.CONNECT_ERROR:
        return typeof data === "object";

      default:
        return false;
    }
  }

  destroy() {}
}

export default { Encoder, Decoder };
