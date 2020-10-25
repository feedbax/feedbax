import { prisma } from '@utils/prisma';
import { includes } from './user.types';

import type { GetBy, Include } from './user.types';

export default class UserService {
  public static getBy: GetBy = (
    async (props: any, include: Include = 'user'): Promise<any> => {
      if (props.email && props.password) {
        const user = (
          await prisma.user.findFirst({
            where: {
              email: props.email,
              password: props.password,
            },

            include: includes[include],
          })
        );

        if (user === null) {
          throw new Error('UserService.getBy - user not found');
        }

        return user;
      }

      throw new Error('UserService.getBy - wrong usage');
    }
  );
}
