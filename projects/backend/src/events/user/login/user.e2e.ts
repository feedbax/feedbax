import { feedbax } from '@feedbax/protos';
import { setupServer, seedDatabase } from '@utils/e2e';

import $io from 'socket.io-client';

import type { Server, Seed } from '@utils/e2e';

let server: Server;
let seed: Seed;

let socket: SocketIOClient.Socket;

const TIMEOUT = 60 * 1000;

beforeAll(async () => {
  server = await setupServer();
  seed = await seedDatabase();
}, TIMEOUT);

afterAll(async () => {
  await seed.destroy();
  server.destroy();
}, TIMEOUT);

beforeEach((done) => {
  const address = server?.address;

  socket = $io(`http://${address.address}:${address.port}`, {
    forceNew: true,
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    done();
  });
}, TIMEOUT);

afterEach(() => {
  if (socket.connected) {
    socket.disconnect();
  }
}, TIMEOUT);

it('nothing', (done) => {
  const Request = feedbax.Packets.Request.User.Login;
  const Response = feedbax.Packets.Response.User.Login;
  const PacketIds = feedbax.Packets.Ids;

  const message = Request.create({
    user: {
      uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
    },

    event: {
      slug: seed.eventSlug,
    },
  });

  const encoded = Request.encode(message);
  const bytes = encoded.finish();

  socket.emit(`${PacketIds.Login.USER}`, bytes, (data: Uint8Array) => {
    const $message = Response.decode(data);
    console.log('message', JSON.stringify($message, null, 2));

    done();
  });
}, TIMEOUT);
