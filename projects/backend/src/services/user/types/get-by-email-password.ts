import type { GetByEmailPasswordProps } from './get-by';
import type { Include, Payload } from './payload';

export type GetByEmailPassword = {
  /* eslint-disable max-len */

  ({ email, password }: GetByEmailPasswordProps): Promise<Payload<'user'>>;
  <T extends Include>({ email, password }: GetByEmailPasswordProps, include?: T): Promise<Payload<T>>;

  /* eslint-enable max-len */
};
