import { feedbax } from '@feedbax/protos';
import { $try } from '@utils/events';

import userLoginHandler from './user';
import adminLoginHandler from './admin';

import type { Socket } from 'socket.io';

const PacketIds = feedbax.Packets.Ids;

const createLoginHandler = (
  (socket: Socket): void => {
    socket.on(`${PacketIds.Login.USER}`, $try(socket, userLoginHandler));
    socket.on(`${PacketIds.Login.ADMIN}`, $try(socket, adminLoginHandler));
  }
);

export default createLoginHandler;
