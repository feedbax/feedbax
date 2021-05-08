import type { _PacketCallback } from '@/client/packets/_utils';
import type { EventWith } from '@/models/event';

type ServerPacketId = import('@/server/packets/login').PacketId;
type ServerPacketData = import('@/server/packets/login').PacketData;

export type PacketData = EventWith<'questions' | 'answers'>;
export type Packet = {
  err?: string;
  event?: PacketData;
};

export type PacketProps = {
  id: ServerPacketId;
  data: ServerPacketData;
  cb: _PacketCallback<Packet>;
};
