import { Prisma, PrismaClient } from '@feedbax/prisma';
import { generate } from '@/utils/flake';

import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

const deleteOldSeededData = async (prisma: PrismaClient) => {
  const oldUser = await prisma.user.findUnique({
    where: {
      email: 'silas@rosenkra.nz',
    },

    include: {
      events: {
        include: {
          meta: true,
          questions: {
            include: {
              answers: {
                include: {
                  likes: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (oldUser) {
    for (const event of oldUser.events) {
      for (const question of event.questions) {
        for (const answer of question.answers) {
          for (const like of answer.likes) {
            try {
              await prisma.like.delete({ where: { author_answerId: like } });
            } catch (error) {
              console.log(error);
            }
          }

          try {
            await prisma.answer.delete({ where: { id: answer.id } });
          } catch (error) {
            console.log(error);
          }
        }

        try {
          await prisma.question.delete({ where: { id: question.id } });
        } catch (error) {
          console.log(error);
        }
      }

      if (event.meta) {
        try {
          await prisma.eventMeta.delete({ where: { eventId: event.id } });
        } catch (error) {
          console.log(error);
        }
      }

      try {
        await prisma.event.delete({ where: { id: event.id } });
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await prisma.user.delete({ where: { id: oldUser.id } });
    } catch (error) {
      console.log(error);
    }
  }
};

(async () => {
  const prisma = new PrismaClient();

  await deleteOldSeededData(prisma);
  await prisma.user.create({
    data: {
      id: generate(),
      name: 'Silas Rosenkranz',
      email: 'silas@rosenkra.nz',
      password: bcrypt.hashSync('dev', 10),

      events: {
        create: {
          id: generate(),
          slug: 'dev',

          meta: {
            create: {
              title: 'Glaubst du ...?',
              description: 'Beantworte unser steps-faq und hilf uns dabei, die Fragen deiner Generation zu beantworten.',
              image: fs.readFileSync(path.join(process.cwd(), 'og_image.jpg')),
              imageMimeType: 'image/jpg',
            },
          },

          questions: {
            create: [
              {
                id: generate(),
                text: 'Wel­che an­de­ren Fra­gen hast du selbst noch, die nicht zu den Ka­te­go­ri­en pas­sen?',
                likesCount: 0,
                order: 1,

                answersMode: 'ReadOnly',
                likesDisplayMode: 'Percentage',

                answers: {
                  create: [
                    {
                      id: generate(),
                      author: generate(),
                      text: 'Wie kann man für Gott bren­nen (auch das gan­ze Le­ben lang)?',
                    },

                    {
                      id: generate(),
                      author: generate(),
                      text: 'Wie kann ich Zei­ten in mei­nem Le­ben ver­mei­den, in de­nen ich mich von Gott ent­fer­ne?',
                    },
                  ],
                },
              },

              {
                id: generate(),
                text: 'Was glaubst du?',
                likesCount: 0,
                order: 0,

                answersMode: 'ReadWrite',
                likesDisplayMode: 'Numeric',

                answers: {
                  create: [
                    {
                      id: generate(),
                      author: generate(),
                      text: 'Wie kann man für Gott bren­nen (auch das gan­ze Le­ben lang)?',
                    },

                    {
                      id: generate(),
                      author: generate(),
                      text: 'Wie kann ich Zei­ten in mei­nem Le­ben ver­mei­den, in de­nen ich mich von Gott ent­fer­ne?',
                    },
                  ],
                },
              },

              {
                id: generate(),
                text: 'Wel­che Fra­gen an den Glau­ben ha­ben dei­ne Be­kann­ten, die nicht an Gott glau­ben?',
                likesCount: 0,
                order: 2,

                answersMode: 'ReadOnly',
                likesDisplayMode: 'Percentage',

                answers: {
                  create: [
                    {
                      id: generate(),
                      author: generate(),
                      text: 'War­um ist aus­ge­rech­net dein Gott der ein­zig wah­re, ein­zi­ge Gott',
                    },

                    {
                      id: generate(),
                      author: generate(),
                      text: 'Wie kann ein lie­ben­der Gott so viel Leid zu­las­sen?',
                    },
                  ],
                },
              }
            ],
          },
        },
      },
    },
  });

  await prisma.$disconnect();
})();
