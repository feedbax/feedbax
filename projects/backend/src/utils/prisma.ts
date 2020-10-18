import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/prefer-default-export
export const prisma = new PrismaClient();
export * from '@prisma/client';
