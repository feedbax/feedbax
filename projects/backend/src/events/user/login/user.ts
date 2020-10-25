import { feedbax } from '@feedbax/protos';

import { checkValid } from '@utils/events';
import { workerId } from '@utils/worker';
import { addUser } from '@utils/auth';

import type { Socket } from 'socket.io';
import EventService from '@services/event';

const PacketIds = feedbax.Packets.Ids;

type RequestPacket = feedbax.Packets.Request.User.Login;
const Request = feedbax.Packets.Request.User.Login;

type ResponsePacket = feedbax.Packets.Response.User.Login;
const Response = feedbax.Packets.Response.User.Login;

type Ack = (res: Uint8Array) => void;

export type ValidRequestPacket = RequestPacket & {
  user: {
    uuid: string;
  };

  event: {
    slug: string;
  };
};

export function isValid(packet: RequestPacket): packet is ValidRequestPacket {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const validations = [
    checkValid(packet.user, 'object'),
    checkValid(packet.user?.uuid, 'string'),
    checkValid(packet.event?.slug, 'string'),
    uuidPattern.test(packet.user?.uuid ?? ''),
  ];

  const $isValid = validations.reduce((a, b) => a && b, true);

  if (!$isValid) throw new Error('invalid packet request data');
  return true;
}

const userLoginHandler = (
  async function (this: Socket, raw: Uint8Array, response: Ack): Promise<void> {
    console.log(`[worker-${workerId}]`, `[socket-${this.id}]`, 'handling packet', PacketIds.Login.USER);

    const packet: RequestPacket = Request.decode(raw);
    console.log(`[worker-${workerId}]`, `[socket-${this.id}]`, 'handling packet', packet);

    if (isValid(packet)) {
      const { uuid } = packet.user;
      const { slug } = packet.event;

      const event = await EventService.getProtoBy({ slug }, uuid, 'event.questions.answers.likes');

      const answer: ResponsePacket = Response.create({ user: { event } });
      const answerBinary = Response.encode(answer).finish();

      addUser(this.id);
      response(answerBinary);
    }
  }
);

export default userLoginHandler;
