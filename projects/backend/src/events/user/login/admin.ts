import { feedbax } from '@feedbax/protos';

import { checkValid } from '@utils/events';
import { workerId } from '@utils/worker';
import { addAdmin } from '@utils/auth';

import UserService from '@services/user';

import type { Socket } from 'socket.io';

import type { Validator } from './admin.types';
import type { Ack, RequestPacket, ResponsePacket } from './admin.types';

const PacketIds = feedbax.Packets.Ids;
const Request = feedbax.Packets.Request.User.Login;
const Response = feedbax.Packets.Response.User.Login;

const validatePacket: Validator = (
  (packet) => {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const validations = [
      checkValid(packet.user, 'object'),
      checkValid(packet.user?.uuid, 'string'),
      checkValid(packet.user?.email, 'string'),
      checkValid(packet.user?.password, 'string'),
      uuidPattern.test(packet.user?.uuid ?? ''),
    ];

    const $isValid = validations.reduce((a, b) => a && b, true);
    if (!$isValid) throw new Error('invalid packet request data');
  }
);

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
