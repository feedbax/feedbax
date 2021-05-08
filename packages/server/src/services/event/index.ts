import { PrismaClient } from '@feedbax/prisma';
import { GetInitialBy } from './actions/get-initial-by';

export default class EventService {
  private static prisma = new PrismaClient();

  public static getInitialBy = GetInitialBy.action.bind({ prisma: EventService.prisma });
}
