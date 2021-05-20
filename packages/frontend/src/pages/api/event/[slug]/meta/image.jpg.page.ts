import prisma from '@/lib/prisma';
import { createApiRoute, request } from '@/pages/api/helper';

export default createApiRoute({
  get: request<Buffer>(async (req, res) => {
    const { slug } = req.query;

    if (typeof slug === 'string') {
      const event = await prisma.event.findUnique({
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
  }),
});
