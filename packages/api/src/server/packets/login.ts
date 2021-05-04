import type { _PacketHandler } from '@/server/packets/_utils';

type ClientPacketData = import('@/client/packets/login').PacketData;

export type PacketId = 'login';
export type PacketData = {
  uuid: string;
  eventSlug: string;
};

export type PacketProps = {
  id: PacketId;
  handler: _PacketHandler<PacketData, ClientPacketData>;
};