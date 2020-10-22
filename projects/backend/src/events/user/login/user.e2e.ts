import path from 'path';
import { fork } from 'child_process';
import { feedbax } from '@feedbax/protos';

import $io from 'socket.io-client';

import type { AddressInfo } from 'net';
import type { ChildProcess } from 'child_process';

let server: ChildProcess;
let socket: SocketIOClient.Socket;
let address: AddressInfo;

const log = (data: Buffer) => console.log('server-data ', data.toString());
const err = (data: Buffer) => console.log('server-error', data.toString());

beforeAll((done) => {
  server = fork(
    path.join(__dirname, '../../../processes/single-server.ts'),
    [], { execArgv: ['-r', 'ts-node/register'], silent: true },
  );

  server.stdout?.on('data', log);
  server.stderr?.on('data', err);

  server.on('message', (addressJson) => {
    address = JSON.parse(addressJson.toString());
    done();
  });

  server.send('ping');
});

afterAll(() => {
  server.stdout?.off('data', log);
  server.kill();
});

beforeEach((done) => {
  socket = $io(`http://${address?.address}:${address?.port}`, {
    forceNew: true,
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    done();
  });
});

afterEach(() => {
  if (socket.connected) {
    socket.disconnect();
  }
});

it('nothing', (done) => {
  const Request = feedbax.Packets.Request.User.Login;
  const Response = feedbax.Packets.Response.User.Login;
  const PacketIds = feedbax.Packets.Ids;

  const message = Request.create({
    user: {
      uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
    },

    event: {
      slug: 'test',
    },
  });

  const encoded = Request.encode(message);
  const bytes = encoded.finish();

  socket.emit(`${PacketIds.Login.USER}`, bytes, (data: Uint8Array) => {
    const $message = Response.decode(data);
    console.log('message', JSON.stringify($message, null, 2));

    done();
  });
});
