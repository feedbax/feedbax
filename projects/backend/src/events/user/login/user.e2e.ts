import path from 'path';
import { fork } from 'child_process';
import { feedbax } from '@feedbax/protos';

import $io from 'socket.io-client';

import type { AddressInfo } from 'net';
import type { ChildProcess } from 'child_process';

let server: ChildProcess;
let socket: SocketIOClient.Socket;
let address: AddressInfo;

beforeAll((done) => {
  server = fork(
    path.join(__dirname, '../../../processes/single.ts'),
    [], { execArgv: ['-r', 'ts-node/register'], silent: true },
  );

  server.on('message', (addressJson) => {
    address = JSON.parse(addressJson.toString());
    done();
  });

  server.send('ping');
});

afterAll(() => {
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

// it('should', (done) => {
//   const uri = `http://[${address.address}]:${address.port}`;
//   console.log('connect to', uri);

//   const socket = socketio.connect(uri, {
//     transports: ['websocket'],
//     reconnectionDelay: 0,
//     forceNew: true,
//   });

//   const Request = feedbax.Packets.Request.User.Login;
//   const PacketIds = feedbax.Packets.Ids;

//   const message = Request.create({
//     user: {
//       uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
//     },

//     event: {
//       slug: 'test',
//     },
//   });

//   const encoded = Request.encode(message);
//   const bytes = encoded.finish();

//   console.log(bytes);

//   socket.on('connect', () => {
//     console.log('socket connected');

//     socket.emit(`${PacketIds.Login.USER}`, bytes, (data: Uint8Array) => {
//       console.log(data);

//       socket.close();
//       done();
//     });
//   });

//   socket.on('error', (err: Error) => console.error(err));
// }, 20000);
