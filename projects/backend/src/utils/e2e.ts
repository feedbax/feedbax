import path from 'path';
import { fork } from 'child_process';
import { prisma } from '@utils/prisma';
import UUID from '@utils/uuid';

import type { AddressInfo } from 'net';
import type { ChildProcess } from 'child_process';

export type Server = {
  server: ChildProcess;
  address: AddressInfo;
  destroy: () => void;
};

const log = (data: Buffer) => console.log('server-data ', data.toString());
const err = (data: Buffer) => console.log('server-error', data.toString());

// eslint-disable-next-line import/prefer-default-export
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
  userId: string;

  destroy: () => Promise<void>;
};

export const seedDatabase = (
  async (): Promise<Seed> => {
    await UUID.init();

    const userId = UUID.create('string');
    const eventSlug = UUID.create('string');

    await prisma.user.create({
      data: {
        id: userId,
        email: `${eventSlug}@feedb.ax`,
        password: 'jest',
        events: {
          create: {
            slug: eventSlug,
            startDate: new Date(),
            durationInDays: 3,
            settings: {
              custom_footer: 'jest',
            },
          },
        },
      },
    });

    return {
      userId,
      eventSlug,

      destroy: async () => {
        UUID.destroy();

        // await prisma.event.delete({
        //   where: {
        //     slug: eventSlug,
        //   },
        // });

        console.log('before', (await prisma.user.findMany()).length, 'users');
        console.log('before', (await prisma.event.findMany()).length, 'events');

        await prisma.user.delete({
          where: {
            id: userId,
          },
        });

        console.log('after', (await prisma.user.findMany()).length, 'users');
        console.log('after', (await prisma.event.findMany()).length, 'events');

        await prisma.$disconnect();
      },
    };
  }
);
