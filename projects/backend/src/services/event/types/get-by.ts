import type { Include, Payload } from './payload';

export type GetBySlugProps = { slug: string; };
export type GetByProps = GetBySlugProps;

export type GetBy = {
  /* eslint-disable max-len */
  ({ slug }: GetBySlugProps): Promise<Payload<'event'>>;
  <T extends Include>({ slug }: GetBySlugProps, include?: T): Promise<Payload<T>>;
  /* eslint-enable max-len */
};
