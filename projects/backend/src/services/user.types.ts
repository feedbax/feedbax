import type { UserGetPayload, FindFirstUserArgs } from '@utils/prisma';

export type GetByEmail = { email: string; };
export type GetByEmailPassword = { email: string; password: string; };

export type FindFirstArgsInclude = FindFirstUserArgs['include'];
export type GetByReturn<T> = UserGetPayload<{ include: T }>;

export type GetBy = {
  /* eslint-disable max-len */

  <T extends FindFirstArgsInclude>({ email }: GetByEmail, include?: T): Promise<GetByReturn<T>>;
  <T extends FindFirstArgsInclude>({ email, password }: GetByEmailPassword, include?: T): Promise<GetByReturn<T>>;

  /* eslint-enable max-len */
};
