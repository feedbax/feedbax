import EventService from '@services/event';

import { feedbax } from '@feedbax/protos';

import { workerId } from '@utils/worker';
import { addUser } from '@utils/auth';

import { validatePacket } from './guards';

import type { Socket } from 'socket.io';
import type { Ack, RequestPacket, ResponsePacket } from './types';

const PacketIds = feedbax.Packets.Ids;
const Request = feedbax.Packets.Request.User.Login;
const Response = feedbax.Packets.Response.User.Login;

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
