import UUID from '@utils/uuid';
import EventService from '@services/event';

import { prisma, User } from '@utils/prisma';
import { compare, hashSync } from 'bcrypt';
import { includes } from './types';

import type { GetBy, GetByProps } from './types';
import type { GetByEmailPassword, GetByEmailPasswordProps } from './types';
import type { Create, CreateProps } from './types';
import type { Include, GetCreateInput } from './types';

export default class UserService {
  public static createInput: GetCreateInput = (
    (props) => ({
      id: UUID.create('string'),
      email: props.email,
      password: hashSync(props.password, 10),

      events: props.events ? {
        create: props.events.map(
          (event) => EventService.createInput(event),
        ),
      } : undefined,
    })
  );

  public static create: Create = (
    async (props: CreateProps, include: Include = 'user'): Promise<User> => {
      const user = (
        await prisma.user.create({
          data: UserService.createInput(props),
          include: includes[include],
        })
      );

      return user;
    }
  );

  public static getBy: GetBy = (
    async (props: GetByProps, include: Include = 'user'): Promise<User> => {
      if ('email' in props && 'password' in props) {
        return UserService.getByEmailPassword(props, include);
      }

      throw new Error('UserService.getBy - wrong usage');
    }
  );

  private static getByEmailPassword: GetByEmailPassword = (
    async (props: GetByEmailPasswordProps, include: Include = 'user'): Promise<User> => {
      const user = (
        await prisma.user.findFirst({
          where: { email: props.email },
          include: includes[include],
        })
      );

      if (user === null) {
        throw new Error('UserService.getByEmailPassword - user not found');
      }

      const validPassword = await compare(props.password, user?.password ?? undefined);

      if (!validPassword) {
        throw new Error('UserService.getByEmailPassword - invalid password');
      }

      return user;
    }
  );
}
