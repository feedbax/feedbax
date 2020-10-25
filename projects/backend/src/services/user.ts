import { prisma } from '@utils/prisma';
import { includes } from './user.types';
import { compare } from 'bcrypt';

import type { GetBy, Include } from './user.types';

export default class UserService {
  public static getBy: GetBy = (
    async (props: any, include: Include = 'user'): Promise<any> => {
      if (props.email && props.password) {
        const user = (
          await prisma.user.findFirst({
            where: {
              email: props.email,
            },

            include: includes[include],
          })
        );

        if (user === null) {
          throw new Error('UserService.getBy - user not found');
        }

        const validPassword = (
          await compare(props.password, user?.password ?? '')
        );

        if (!validPassword) {
          throw new Error('UserService.getBy - invalid password');
        }

        return user;
      }

      throw new Error('UserService.getBy - wrong usage');
    }
  );
}
