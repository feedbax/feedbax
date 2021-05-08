import type { _PacketHandler } from '@/server/packets/_utils';

type ClientPacket = import('@/client/packets/login').Packet;

export type PacketId = 'login';
export type PacketData = {
  uuid: string;
  eventSlug: string;
};

export type PacketProps = {
  id: PacketId;
  handler: _PacketHandler<PacketData, ClientPacket>;
};