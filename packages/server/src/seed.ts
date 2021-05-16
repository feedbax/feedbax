import { PrismaClient } from '@feedbax/prisma';
import { generate } from '@/utils/flake';

import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

const deleteOldSeededData = async (prisma: PrismaClient) => {
  await prisma.like.deleteMany({});
  await prisma.answer.deleteMany({});

  await prisma.questionSettings.deleteMany({});
  await prisma.question.deleteMany({});

  await prisma.eventSettings.deleteMany({});
  await prisma.eventMeta.deleteMany({});
  await prisma.event.deleteMany({});

  await prisma.workspacesOnUsers.deleteMany({});
  await prisma.workspace.deleteMany({});
  await prisma.user.deleteMany({});
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

      workspaces: {
        create: {
          userRole: 'Administrator',
          workspace: {
            create: {
              id: generate(),
              name: 'Development',

              events: {
                create: {
                  id: generate(),
                  slug: 'dev',

                  settings: {
                    create: {
                      startDate: new Date(),
                      endDate: new Date(),
                    },
                  },

                  meta: {
                    create: {
                      title: 'Glaubst du ...?',
                      description: 'Beantworte unser steps-faq und hilf uns dabei, die Fragen deiner Generation zu beantworten.',
                      image: fs.readFileSync(path.join(process.cwd(), 'og_image.jpg')),
                    },
                  },

                  questions: {
                    create: [
                      {
                        id: generate(),
                        text: 'Wel­che an­de­ren Fra­gen hast du selbst noch, die nicht zu den Ka­te­go­ri­en pas­sen?',
                        order: 1,

                        settings: {
                          create: {
                            allowAnswers: true,
                            limitAnswers: true,
                            answersLimit: 2,

                            allowLikes: true,
                            limitLikes: true,
                            likesLimit: 5,

                            likesDisplayMode: 'Numeric',
                          },
                        },

                        answers: {
                          create: [
                            {
                              id: generate(),
                              author: generate(),
                              text: 'Wie kann man für Gott bren­nen (auch das gan­ze Le­ben lang)?',

                              likes: {
                                create: [
                                  { author: generate() },
                                  { author: generate() }
                                ],
                              },
                            },

                            {
                              id: generate(),
                              author: generate(),
                              text: 'Wie kann ich Zei­ten in mei­nem Le­ben ver­mei­den, in de­nen ich mich von Gott ent­fer­ne?',

                              likes: {
                                create: [
                                  { author: generate() },
                                  { author: generate() }
                                ],
                              },
                            },
                          ],
                        },
                      },

                      {
                        id: generate(),
                        text: 'Was glaubst du?',
                        order: 0,

                        settings: {
                          create: {
                            allowAnswers: true,
                            limitAnswers: true,
                            answersLimit: 2,

                            allowLikes: true,
                            limitLikes: true,
                            likesLimit: 5,

                            likesDisplayMode: 'Percentage',
                          },
                        },

                        answers: {
                          create: [
                            {
                              id: generate(),
                              author: generate(),
                              text: 'Wie kann man für Gott bren­nen (auch das gan­ze Le­ben lang)?',

                              likes: {
                                create: [
                                  { author: generate() },
                                  { author: generate() }
                                ],
                              },
                            },

                            {
                              id: generate(),
                              author: generate(),
                              text: 'Wie kann ich Zei­ten in mei­nem Le­ben ver­mei­den, in de­nen ich mich von Gott ent­fer­ne?',

                              likes: {
                                create: [
                                  { author: generate() },
                                  { author: generate() }
                                ],
                              },
                            },
                          ],
                        },
                      },

                      {
                        id: generate(),
                        text: 'Wel­che Fra­gen an den Glau­ben ha­ben dei­ne Be­kann­ten, die nicht an Gott glau­ben?',
                        order: 2,

                        settings: {
                          create: {
                            allowAnswers: false,
                            limitAnswers: true,
                            answersLimit: 2,

                            allowLikes: true,
                            limitLikes: true,
                            likesLimit: 5,

                            likesDisplayMode: 'Percentage',
                          },
                        },

                        answers: {
                          create: [
                            {
                              id: generate(),
                              author: generate(),
                              text: 'War­um ist aus­ge­rech­net dein Gott der ein­zig wah­re, ein­zi­ge Gott',

                              likes: {
                                create: [
                                  { author: generate() },
                                  { author: generate() }
                                ],
                              },
                            },

                            {
                              id: generate(),
                              author: generate(),
                              text: 'Wie kann ein lie­ben­der Gott so viel Leid zu­las­sen?',

                              likes: {
                                create: [
                                  { author: generate() },
                                  { author: generate() }
                                ],
                              },
                            },
                          ],
                        },
                      }
                    ],
                  },
                },
              },
            },
          },
        }
      },
    },
  });

  await prisma.$disconnect();
})();
