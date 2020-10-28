import type { Include, Payload } from './payload';

export type GetByEmailProps = { email: string; };
export type GetByEmailPasswordProps = { email: string; password: string; };
export type GetByProps = GetByEmailProps | GetByEmailPasswordProps;

export type GetBy = {
  /* eslint-disable max-len */

  ({ email, password }: GetByEmailPasswordProps): Promise<Payload<'user'>>;
  <T extends Include>({ email, password }: GetByEmailPasswordProps, include?: T): Promise<Payload<T>>;

  ({ email }: GetByEmailProps): Promise<Payload<'user'>>;
  <T extends Include>({ email }: GetByEmailProps, include?: T): Promise<Payload<T>>;

  /* eslint-enable max-len */
};
