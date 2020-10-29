import { Socket } from 'socket.io';
import { feedbax } from '@feedbax/protos';
import { addUser } from '@utils/auth';
import EventService from '@services/event';

import userLoginHandler from '.';

jest.mock('@services/event');
const mockedUserService = EventService as jest.Mocked<typeof EventService>;

jest.mock('@utils/auth');
const mockedAddUser = addUser as jest.MockedFunction<typeof addUser>;

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
    await userLoginHandler.bind(socket)(raw, () => ({}));
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
    await userLoginHandler.bind(socket)(raw, () => ({}));
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
    await userLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should throw Error(`invalid packet request data`) #3', async () => {
  const packetData: RequestData = {
    user: {
      uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
    },
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await userLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should throw Error(`invalid packet request data`) #4', async () => {
  const packetData: RequestData = {
    event: undefined,
    user: {
      uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
    },
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await userLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should throw Error(`invalid packet request data`) #5', async () => {
  const packetData: RequestData = {
    event: {},
    user: {
      uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
    },
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await userLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should throw Error(`invalid packet request data`) #6', async () => {
  const packetData: RequestData = {
    event: {
      slug: undefined,
    },

    user: {
      uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
    },
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await userLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should throw Error(`invalid packet request data`) #7', async () => {
  const packetData: RequestData = {
    event: {
      slug: '',
    },

    user: {
      uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
    },
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await userLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should throw Error(`invalid packet request data`) #8', async () => {
  const packetData: RequestData = {
    event: {
      slug: 'valid',
    },

    user: {
      uuid: 'invalid',
    },
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await userLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid packet request data');
  }
});

test('should return an answer packet & auth the socket', async (done) => {
  const packetData: RequestData = {
    event: {
      slug: 'valid',
    },

    user: {
      uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
    },
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  mockedUserService.getProtoBy.mockImplementationOnce(
    async (): Promise<any> => (
      feedbax.Model.Event.create({
        slug: 'event-jest',
      })
    ),
  );

  await userLoginHandler.bind(socket)(
    raw, (data: Uint8Array) => {
        type IResponseUser = feedbax.Packets.Response.User.Login.IResponseUser;
        type IResponseUserEvent = NonNullable<IResponseUser['event']>;

        const answer = Response.decode(data);

        expect(mockedAddUser).toBeCalledWith('socket-jest');
        expect(answer.oneofEvent).toBe('user');
        expect(answer.user?.event).toEqual(
          expect.objectContaining<IResponseUserEvent>({
            slug: 'event-jest',
          }),
        );

        done();
    },
  );
});
