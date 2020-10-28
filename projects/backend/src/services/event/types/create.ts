import type { EventCreateInput } from '@utils/prisma';
import type { Include, Payload } from './payload';

export type CreateProps = (
  EventCreateInput & {
    questions?: null[];
  }
);

export type Create = {
  /* eslint-disable max-len */
  (props: CreateProps): Promise<Payload<'event'>>;
  <T extends Include>(props: CreateProps, include?: T): Promise<Payload<T>>;
  /* eslint-enable max-len */
}

export type CreateInput = {
  (props: CreateProps): EventCreateInput;
}
