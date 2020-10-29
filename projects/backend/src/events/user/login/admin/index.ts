import UserService from '@services/user';

import { feedbax } from '@feedbax/protos';

import { workerId } from '@utils/worker';
import { addAdmin } from '@utils/auth';

import { validatePacket } from './guards';

import type { Socket } from 'socket.io';
import type { Ack, RequestPacket, ResponsePacket } from './types';

const PacketIds = feedbax.Packets.Ids;
const Request = feedbax.Packets.Request.User.Login;
const Response = feedbax.Packets.Response.User.Login;

const adminLoginHandler = (
  async function (this: Socket, raw: Uint8Array, response: Ack): Promise<void> {
    console.log(`[worker-${workerId}]`, `[socket-${this.id}]`, 'handling packet', PacketIds.Login.ADMIN);

    const packet: RequestPacket = Request.decode(raw);
    console.log(`[worker-${workerId}]`, `[socket-${this.id}]`, 'handling packet', packet);

    validatePacket(packet);

    const { email, password } = packet.user;

    const user = await UserService.getBy({ email, password }, 'user.events');
    const events = user.events.map((e) => ({ slug: e.slug }));

    const answer: ResponsePacket = Response.create({ admin: { events } });
    const answerBinary = Response.encode(answer).finish();

    addAdmin(this.id);
    response(answerBinary);
  }
);

export default adminLoginHandler;
