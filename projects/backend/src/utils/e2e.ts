import UserService from '@services/user';
import UUID from '@utils/uuid';

import path from 'path';
import $io from 'socket.io-client';

import { fork } from 'child_process';
import { prisma } from '@utils/prisma';

import type { AddressInfo } from 'net';
import type { ChildProcess } from 'child_process';

export type Server = {
  server: ChildProcess;
  address: AddressInfo;
  destroy: () => void;
};

const log = (data: Buffer) => console.log('server-data ', data.toString());
const err = (data: Buffer) => console.log('server-error', data.toString());

export const setupSocket = (
  async (address: AddressInfo): Promise<SocketIOClient.Socket> => (
    new Promise<SocketIOClient.Socket>((resolve) => {
      const $socket = $io(`http://${address.address}:${address.port}`, {
        forceNew: true,
        transports: ['websocket'],
      });

      $socket.on('connect', () => {
        resolve($socket);
      });
    })
  )
);

export const setupServer = (
  async (): Promise<Server> => (
    new Promise<Server>((resolve) => {
      const server = fork(
        path.join(__dirname, '../processes/single-server.ts'),
        [], { execArgv: ['-r', 'ts-node/register'], silent: true },
      );

      server.stdout?.on('data', log);
      server.stderr?.on('data', err);

      server.on('message', (addressJson) => {
        const address = JSON.parse(addressJson.toString());

        resolve({
          server,
          address,
          destroy: () => {
            server.stdout?.off('data', log);
            server.stderr?.off('data', log);
            server.kill();
          },
        });
      });

      server.send('ping');
    })
  )
);

export type Seed = {
  eventSlug: string;

  user: {
    id: string;
    email: string;
    password: string;
  };

  destroy: () => Promise<void>;
};

export const seedDatabase = (
  async (): Promise<Seed> => {
    await UUID.init();

    const eventData = {
      slug: UUID.create('string'),
      startDate: new Date(),
      durationInDays: 3,
      settings: {
        customFooter: 'jest',
      },
    };

    const userData = {
      email: `${UUID.create('string')}@feedb.ax`,
      password: 'jest',
      events: [eventData],
    };

    const user = await UserService.create(userData, 'user.events');

    return {
      eventSlug: eventData.slug,

      user: {
        id: user.id,
        email: userData.email,
        password: userData.password,
      },

      destroy: async () => {
        UUID.destroy();

        await prisma.user.delete({
          where: {
            id: user.id,
          },
        });

        await prisma.$disconnect();
      },
    };
  }
);

/**
    await prisma.user.create({
      data: {
        id: userId,
        email: `${userId}@feedb.ax`,
        password: await hash(userPassword, 10),
        events: {
          create: {
            slug: eventSlug,
            startDate: new Date(),
            durationInDays: 3,
            settings: {
              customFooter: 'jest',
            },

            questions: {
              create: [
                {
                  id: UUID.create('string'),
                  order: 0,
                  text: 'question-1',
                  type: 'POLL',
                  answers: {
                    create: [
                      {
                        id: UUID.create('string'),
                        author: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
                        created: new Date(),
                        text: 'question-1--answer-1',
                        likes: {
                          create: [
                            {
                              id: UUID.create('string'),
                              author: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f4',
                            },
                          ],
                        },
                      },

                      {
                        id: UUID.create('string'),
                        author: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f4',
                        created: new Date(),
                        text: 'question-1--answer-2',
                        likes: {
                          create: [
                            {
                              id: UUID.create('string'),
                              author: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },

                {
                  id: UUID.create('string'),
                  order: 0,
                  text: 'question vote',
                  type: 'VOTE',
                  answers: {
                    create: [
                      {
                        id: UUID.create('string'),
                        author: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
                        created: new Date(),
                        text: 'question-2--answer-1',
                        likes: {
                          create: [
                            {
                              id: UUID.create('string'),
                              author: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f4',
                            },
                          ],
                        },
                      },

                      {
                        id: UUID.create('string'),
                        author: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f4',
                        created: new Date(),
                        text: 'question-2--answer-2',
                        likes: {
                          create: [
                            {
                              id: UUID.create('string'),
                              author: 'a535a43b-a8d9-4e03-ac5c-0dc70f9767f3',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    });
 */
