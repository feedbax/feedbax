import { PrismaClient } from '@feedbax/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const primsa = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse<Buffer>) => {
  const { slug } = req.query;

  if (typeof slug === 'string') {
    const event = await primsa.event.findUnique({
      where: { slug },
      include: {
        meta: true,
      },
    });

    if (event?.meta) {
      res.status(200);
      res.setHeader('Content-Type', 'image/jpg');
      res.send(event.meta.image);

      return;
    }
  }

  res.status(200);
  res.setHeader('Content-Type', 'image/jpg');
  res.send(Buffer.from([7, 7, 7]));
};
