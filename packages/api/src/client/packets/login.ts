import type { _PacketCallback } from '@/client/packets/_utils';

type ServerPacketId = import('@/server/packets/login').PacketId;
type ServerPacketData = import('@/server/packets/login').PacketData;

export type PacketData = {
  err?: string;
  event?: {
    id: string;
    questions: string[];
  };
};

export type PacketProps = {
  id: ServerPacketId;
  data: ServerPacketData;
  cb: _PacketCallback<PacketData>;
};