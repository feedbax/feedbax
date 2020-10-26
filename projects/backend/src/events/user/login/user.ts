import { feedbax } from '@feedbax/protos';

import { checkValid } from '@utils/events';
import { workerId } from '@utils/worker';
import { addUser } from '@utils/auth';

import EventService from '@services/event';

import type { Socket } from 'socket.io';

import type { Validator } from './user.types';
import type { Ack, RequestPacket, ResponsePacket } from './user.types';

const PacketIds = feedbax.Packets.Ids;
const Request = feedbax.Packets.Request.User.Login;
const Response = feedbax.Packets.Response.User.Login;

const validatePacket: Validator = (
  (packet) => {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const validations = [
      checkValid(packet.user, 'object'),
      checkValid(packet.user?.uuid, 'string'),
      checkValid(packet.event?.slug, 'string'),
      uuidPattern.test(packet.user?.uuid ?? ''),
    ];

    const $isValid = validations.reduce((a, b) => a && b, true);
    if (!$isValid) throw new Error('invalid packet request data');
  }
);

const userLoginHandler = (
  async function (this: Socket, raw: Uint8Array, response: Ack): Promise<void> {
    console.log(`[worker-${workerId}]`, `[socket-${this.id}]`, 'handling packet', PacketIds.Login.USER);

    const packet: RequestPacket = Request.decode(raw);
    console.log(`[worker-${workerId}]`, `[socket-${this.id}]`, 'handling packet', packet);

    validatePacket(packet);

    const { uuid } = packet.user;
    const { slug } = packet.event;

    const event = await EventService.getProtoBy({ slug }, uuid, 'event.questions.answers.likes');

    const answer: ResponsePacket = Response.create({ user: { event } });
    const answerBinary = Response.encode(answer).finish();

    addUser(this.id);
    response(answerBinary);
  }
);

export default userLoginHandler;
