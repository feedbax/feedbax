import { workerId } from '@utils/worker';
import { prisma } from '@utils/prisma';

import Flake from 'flake-idgen';
import baseX from 'base-x';
import moment from 'moment';

import type { Worker } from '@utils/prisma';

type Props = {
  buffer?: Buffer;
  string?: string;
};

export default class UUID {
  private static TTL = 120 * 1000;

  private static $workerId: number;

  private static flake: Flake;
  private static bs62 = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  private static updateInterval: NodeJS.Timeout;

  public static create(): UUID;
  public static create(returnType: 'buffer'): Buffer;
  public static create(returnType: 'string'): string;
  public static create(returnType: 'uuid'): UUID;
  public static create(returnType: any = 'uuid'): unknown {
    return UUID.$create({}, returnType);
  }

  public static fromString(uuid: string): UUID;
  public static fromString(uuid: string, returnType: 'buffer'): Buffer;
  public static fromString(uuid: string, returnType: 'string'): string;
  public static fromString(uuid: string, returnType: 'uuid'): UUID;
  public static fromString(uuid: string, returnType: any = 'uuid'): unknown {
    return UUID.$create({ string: uuid }, returnType);
  }

  public static fromBuffer(uuid: Buffer): UUID;
  public static fromBuffer(uuid: Buffer, returnType: 'buffer'): Buffer;
  public static fromBuffer(uuid: Buffer, returnType: 'string'): string;
  public static fromBuffer(uuid: Buffer, returnType: 'uuid'): UUID;
  public static fromBuffer(uuid: Buffer, returnType: any = 'uuid'): unknown {
    return UUID.$create({ buffer: uuid }, returnType);
  }

  private static $create(): UUID;
  private static $create(props: Props, returnType: 'buffer'): Buffer;
  private static $create(props: Props, returnType: 'string'): string;
  private static $create(props: Props, returnType: 'uuid'): UUID;
  private static $create(props: Props = {}, returnType: any = 'uuid'): unknown {
    const uuid = new this(props);

    switch (returnType) {
      case 'buffer':
        return uuid.buffer;

      case 'string':
        return uuid.string;

      default:
      case 'uuid':
        return uuid;
    }
  }

  public static async init(): Promise<void> {
    UUID.$workerId = await UUID.getWorkerId();
    UUID.flake = new Flake({ id: UUID.$workerId });

    console.log(`[worker-${workerId}]`, 'UUID.init', UUID.$workerId);

    UUID.updateInterval = setInterval(UUID.updateKeepAlive, UUID.TTL / 2);
  }

  public static destroy(): void {
    clearInterval(UUID.updateInterval);
  }

  private static async updateKeepAlive(): Promise<void> {
    await prisma.worker.deleteMany({
      where: {
        keepAlive: {
          lte: moment().subtract(UUID.TTL, 'milliseconds').toDate(),
        },
      },
    });

    await prisma.worker.update({
      data: {
        keepAlive: moment().toDate(),
      },

      where: {
        id: UUID.$workerId,
      },
    });
  }

  private static async getWorkerId(): Promise<number> {
    const getAvailableWorkerId = (
      async (): Promise<number> => {
        const workers = await prisma.worker.findMany({ orderBy: { id: 'asc' } });
        const workerIds = workers.map((w) => w.id);

        const getFirstAvailableReducer = (
          (prev: number, curr: number, i: number, array: number[]): number => {
            if (i === 0 && curr >= 1) return curr - 1;

            if (prev !== -1) {
              array.splice(1);
              return prev;
            }

            if (array[i + 1] - curr > 1) return curr + 1;

            return prev;
          }
        );

        const NO_ID_FOUND = -1 as const;
        const freeId = [...workerIds].reduce(getFirstAvailableReducer, NO_ID_FOUND);

        if (freeId === NO_ID_FOUND) return workerIds.length;
        return freeId;
      }
    );

    let $worker: Worker | undefined;

    const sleep = (
      async (ms: number): Promise<void> => (
        new Promise<void>((resolve) => setTimeout(resolve, ms))
      )
    );

    while (!$worker) {
      try {
        $worker = (
          await prisma.worker.create({ // eslint-disable-line no-await-in-loop
            data: {
              id: await getAvailableWorkerId(), // eslint-disable-line no-await-in-loop
              keepAlive: moment().toDate(),
            },
          })
        );

        // eslint-disable-next-line no-await-in-loop
        await sleep(100 + Math.random() * 900);
      } catch (error) {
        console.error(error.message);
      }
    }

    return $worker.id;
  }

  private uuidBuffer!: Buffer;
  private uuidString!: string;

  public constructor({ buffer, string }: Props) {
    if (typeof UUID.$workerId === 'undefined') {
      throw new Error('class UUID is not initialized yet');
    }

    if (buffer && !string) {
      this.uuidBuffer = buffer;
      this.uuidString = UUID.bs62.encode(buffer);
      return;
    }

    if (string && !buffer) {
      this.uuidString = string;
      this.uuidBuffer = UUID.bs62.decode(string);
      return;
    }

    this.uuidBuffer = UUID.flake.next();
    this.uuidString = UUID.bs62.encode(this.uuidBuffer);
  }

  public get buffer(): Buffer {
    return this.uuidBuffer;
  }

  public get string(): string {
    return this.uuidString;
  }
}
