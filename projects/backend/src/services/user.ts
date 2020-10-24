import { prisma } from '@utils/prisma';

import type { GetBy } from './user.types';

export default class UserService {
  public static getBy: GetBy = (
    async (props: any, include?: any): Promise<any> => {
      if (props.email && props.password) {
        const user = (
          await prisma.user.findFirst({
            where: {
              email: props.email,
              password: props.password,
            },

            include,
          })
        );

        if (user === null) {
          throw new Error('User.getBy - user not found');
        }

        return user;
      }

      throw new Error('User.getBy - wrong usage');
    }
  );
}
