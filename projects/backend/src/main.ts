import cluster from 'cluster';
import { primary, replica } from '@processes';
import { prisma } from '@utils/prisma';

async function main(): Promise<void> {
  try {
    if (cluster.isMaster) {
      await primary();
    } else {
      await replica();
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
