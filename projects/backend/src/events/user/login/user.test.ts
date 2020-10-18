import { Socket } from 'socket.io';
import { feedbax } from '@feedbax/protos';
import { addUser } from '@utils/auth';
import UserService from '@services/user';

import userLoginHandler from './user';

jest.mock('@services/user');
const mockedUserService = UserService as jest.Mocked<typeof UserService>;

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

test('should throw Error(`invalid request packet`) #1', async () => {
  const packetData: RequestData = {};
  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await userLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid request packet');
  }
});

test('should throw Error(`invalid request packet`) #2', async () => {
  const packetData: RequestData = {
    user: undefined,
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await userLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid request packet');
  }
});

test('should throw Error(`invalid request packet`) #3', async () => {
  const packetData: RequestData = {
    user: {},
  };

  const packet = Request.create(packetData);
  const raw = Request.encode(packet).finish();

  try {
    await userLoginHandler.bind(socket)(raw, () => ({}));
  } catch (error) {
    expect(error.message).toBe('invalid request packet');
  }
});

test('should throw Error(`invalid request packet`) #3', async () => {
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
    expect(error.message).toBe('invalid request packet');
  }
});

test('should throw Error(`invalid request packet`) #4', async () => {
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
    expect(error.message).toBe('invalid request packet');
  }
});

test('should throw Error(`invalid request packet`) #5', async () => {
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
    expect(error.message).toBe('invalid request packet');
  }
});

test('should throw Error(`invalid request packet`) #6', async () => {
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
    expect(error.message).toBe('invalid request packet');
  }
});

test('should throw Error(`invalid request packet`) #7', async () => {
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
    expect(error.message).toBe('invalid request packet');
  }
});

test('should throw Error(`invalid request packet`) #8', async () => {
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
    expect(error.message).toBe('invalid request packet');
  }
});

// test('should return an answer packet & auth the socket', async (done) => {
//   done();

//   const packetData: RequestData = {
//     event: {
//       slug: 'valid',
//     },

//     user: {
//       uuid: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
//     },
//   };

//   const packet = Request.create(packetData);
//   const raw = Request.encode(packet).finish();

//   mockedUserService.getBy.mockImplementationOnce(
//     async (): Promise<any> => ({
//       events: [
//         { slug: 'event-jest' },
//       ],
//     }),
//   );

//   await userLoginHandler.bind(socket)(
//     raw, (data: Uint8Array) => {
//       type IResponseUser = feedbax.Packets.Response.User.Login.IResponseUser;
//       type IResponseUserEvent = NonNullable<IResponseUser['event']>;
//       const QuestionType = feedbax.Model.Question.Type;

//       const answer = Response.decode(data);

//       expect(mockedAddUser).toBeCalledWith('socket-jest');
//       expect(answer.oneofEvent).toBe('user');
//       expect(answer.user?.event).toEqual(
//         expect.objectContaining<IResponseUserEvent>({
//           slug: 'event-jest',
//           settings: {},
//           questions: expect.arrayContaining(
//             expect.objectContaining({
//               id: 1,
//               order: 0,
//               type: QuestionType.POLL,
//               text: 'question-jest',
//               settings: {},
//               hasLiked: false,
//               likesCount: 0,
//               answers: expect.arrayContaining(
//                 expect.objectContaining({
//                   id: 1,
//                   text: 'answer-jest',
//                   isMine: false,
//                   hasLiked: false,
//                   likesCount: 0,
//                   timeCreated: 0,
//                 }),
//               ),
//             }),
//           ),
//         }),
//       );

//       done();
//     },
//   );
// });
