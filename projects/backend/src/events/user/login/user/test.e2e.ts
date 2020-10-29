import { feedbax } from '@feedbax/protos';
import { setupServer, seedDatabase, setupSocket } from '@utils/e2e';

import type { Server, Seed } from '@utils/e2e';

const TIMEOUT = 60 * 1000;

let server: Server;
let seed: Seed;

beforeAll(async () => {
  server = await setupServer();
  seed = await seedDatabase();
}, TIMEOUT);

afterAll(async () => {
  await seed.destroy();
  server.destroy();
}, TIMEOUT);

it('should return an event object', async (done) => {
  const socket = await setupSocket(server.address);

  const Request = feedbax.Packets.Request.User.Login;
  const Response = feedbax.Packets.Response.User.Login;
  const PacketIds = feedbax.Packets.Ids;

  const message = (
    Request.create({
      user: {
        uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
      },

      event: {
        slug: seed.eventSlug,
      },
    })
  );

  const encoded = Request.encode(message);
  const bytes = encoded.finish();

  socket.emit(`${PacketIds.Login.USER}`, bytes, (data: Uint8Array) => {
    socket.disconnect();

    const $message = Response.decode(data);

    expect($message).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          event: expect.objectContaining({
            slug: seed.eventSlug,
          }),
        }),
      }),
    );

    done();
  });
}, TIMEOUT);

it('should fail with error `event not found`', async (done) => {
  const socket = await setupSocket(server.address);

  const Request = feedbax.Packets.Request.User.Login;
  const Response = feedbax.Packets.Response.User.Login;
  const PacketIds = feedbax.Packets.Ids;

  const message = (
    Request.create({
      user: {
        uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
      },

      event: {
        slug: 'invalid',
      },
    })
  );

  const encoded = Request.encode(message);
  const bytes = encoded.finish();

  socket.emit(`${PacketIds.Login.USER}`, bytes, (data: Uint8Array) => {
    socket.disconnect();

    const $message = Response.decode(data);

    expect($message).toEqual(
      expect.objectContaining({
        error: expect.objectContaining({
          message: 'EventService.getBySlug - event not found',
        }),
      }),
    );

    done();
  });
}, TIMEOUT);

it('should fail with error `invalid packet request data`', async (done) => {
  const socket = await setupSocket(server.address);

  const Request = feedbax.Packets.Request.User.Login;
  const Response = feedbax.Packets.Response.User.Login;
  const PacketIds = feedbax.Packets.Ids;

  const message = (
    Request.create({
      user: {
        uuid: '',
      },

      event: {
        slug: seed.eventSlug,
      },
    })
  );

  const encoded = Request.encode(message);
  const bytes = encoded.finish();

  socket.emit(`${PacketIds.Login.USER}`, bytes, (data: Uint8Array) => {
    socket.disconnect();

    const $message = Response.decode(data);

    expect($message).toEqual(
      expect.objectContaining({
        error: expect.objectContaining({
          message: 'invalid packet request data',
        }),
      }),
    );

    done();
  });
}, TIMEOUT);

it('should fail with error `invalid packet request data`', async (done) => {
  const socket = await setupSocket(server.address);

  const Request = feedbax.Packets.Request.User.Login;
  const Response = feedbax.Packets.Response.User.Login;
  const PacketIds = feedbax.Packets.Ids;

  const message = (
    Request.create({
      user: {
        uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
      },

      event: {
        slug: '',
      },
    })
  );

  const encoded = Request.encode(message);
  const bytes = encoded.finish();

  socket.emit(`${PacketIds.Login.USER}`, bytes, (data: Uint8Array) => {
    socket.disconnect();

    const $message = Response.decode(data);

    expect($message).toEqual(
      expect.objectContaining({
        error: expect.objectContaining({
          message: 'invalid packet request data',
        }),
      }),
    );

    done();
  });
}, TIMEOUT);
