import type { EventGetPayload, FindFirstEventArgs } from '@utils/prisma';

export type GetBySlug = { slug: string; };

export type FindFirstArgsInclude = FindFirstEventArgs['include'];
export type GetByReturn<T> = EventGetPayload<{ include: T }>;

export type GetBy = {
  /* eslint-disable max-len */

  <T extends FindFirstArgsInclude>({ slug }: GetBySlug, include?: T): Promise<GetByReturn<T>>;

  /* eslint-enable max-len */
};
