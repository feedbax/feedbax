import { Socket } from 'socket.io';
import { feedbax } from '@feedbax/protos';
import { addAdmin } from '@utils/auth';
import UserService from '@services/user';

import adminLoginHandler from './admin';

jest.mock('@services/user');
const mockedUserService = UserService as jest.Mocked<typeof UserService>;

jest.mock('@utils/auth');
const mockedAddAdmin = addAdmin as jest.MockedFunction<typeof addAdmin>;

type RequestData = feedbax.Packets.Request.User.ILogin;
const Request = feedbax.Packets.Request.User.Login;

const Response = feedbax.Packets.Response.User.Login;

const socket: Socket = {
  id: 'socket-jest',
} as Socket;

beforeAll(() => {
  console.log = jest.fn();
});

test('should throw Error(`invalid packet request data`) #1', async () => {
  const packetData: RequestData = {};
  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await adminLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should throw Error(`invalid packet request data`) #2', async () => {
  const packetData: RequestData = {
    user: undefined,
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await adminLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should throw Error(`invalid packet request data`) #3', async () => {
  const packetData: RequestData = {
    user: {},
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await adminLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should throw Error(`invalid packet request data`) #3', async () => {
  const packetData: RequestData = {
    user: {
      uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
      email: 'valid',
      password: undefined, // invalid
    },
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await adminLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should throw Error(`invalid packet request data`) #4', async () => {
  const packetData: RequestData = {
    user: {
      uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
      email: 'valid',
      password: '', // invalid
    },
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await adminLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should throw Error(`invalid packet request data`) #5', async () => {
  const packetData: RequestData = {
    user: {
      uuid: 'invalid',
      email: 'valid',
      password: 'valid',
    },
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await adminLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should return an answer packet & auth the socket', async (done) => {
  const packetData: RequestData = {
    user: {
      uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
      email: 'valid',
      password: 'valid',
    },
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  mockedUserService.getBy.mockImplementationOnce(
    async (): Promise<any> => ({
      events: [
        { slug: 'event-jest' },
      ],
    }),
  );

  await adminLoginHandler.bind(socket)(
    raw, (data: Uint8Array) => {
      type IResponseAdmin = feedbax.Packets.Response.User.Login.IResponseAdmin;
      type IResponseAdminEvent = NonNullable<IResponseAdmin['events']>[number];

      const answer = Response.decode(data);

      expect(mockedAddAdmin).toBeCalledWith('socket-jest');

      expect(answer.oneofEvent).toBe('admin');
      expect(answer.admin?.events).toEqual(
        expect.arrayContaining([
          expect.objectContaining<IResponseAdminEvent>({
            slug: 'event-jest',
          }),
        ]),
      );

      done();
    },
  );
});
