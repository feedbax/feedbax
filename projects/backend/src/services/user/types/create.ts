import type { UserCreateInput } from '@utils/prisma';
import type { CreateProps as CreateEventProps } from '@services/event/types';
import type { PickPartial } from '@utils/types';

import type { Include, Payload } from './payload';

export type CreateProps = (
  PickPartial<UserCreateInput, 'id'> & {
    events?: CreateEventProps[];
  }
);

export type Create = {
  /* eslint-disable max-len */
  (props: CreateProps): Promise<Payload<'user'>>;
  <T extends Include>(props: CreateProps, include?: T): Promise<Payload<T>>;
  /* eslint-enable max-len */
}

export type GetCreateInput = {
  (props: CreateProps): UserCreateInput;
}
