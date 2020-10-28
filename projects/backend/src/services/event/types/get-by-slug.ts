import type { GetBySlugProps } from './get-by';
import type { Include, Payload } from './payload';

export type GetBySlug = {
  /* eslint-disable max-len */
  ({ slug }: GetBySlugProps): Promise<Payload<'event'>>;
  <T extends Include>({ slug }: GetBySlugProps, include?: T): Promise<Payload<T>>;
  /* eslint-enable max-len */
};
