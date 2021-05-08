import { AnswersMode, LikesDisplayMode, PrismaClient } from '@feedbax/prisma';
import { generate } from './flake';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const seed = async () => {
  await prisma.user.create({
    data: {
      id: generate(),
      email: 'silas@rosenkra.nz',
      name: 'Silas Rosenkranz',
      password: bcrypt.hashSync('dev', 10),
      events: {
        create: {
          id: generate(),
          slug: 'dev',
          questions: {
            create: [
              {
                id: generate(),
                answersMode: AnswersMode.ReadOnly,
                likesDisplayMode: LikesDisplayMode.Percentage,
                text: 'question-percentage-ro',
                likesCount: 0,

                answers: {
                  create: [
                    {
                      id: generate(),
                      text: 'question-percentage-ro-answer-a',
                      author: 'author-a',
                      likesCount: 3,
                      likes: {
                        create: [
                          {
                            author: 'author-a',
                          },
                          {
                            author: 'author-b',
                          },
                          {
                            author: 'author-c',
                          }
                        ],
                      },
                    },
                    {
                      id: generate(),
                      text: 'question-percentage-ro-answer-b',
                      author: 'author-b',
                      likesCount: 2,
                      likes: {
                        create: [
                          {
                            author: 'author-b',
                          },
                          {
                            author: 'author-c',
                          }
                        ],
                      },
                    },
                  ],
                },
              },
              {
                id: generate(),
                answersMode: AnswersMode.ReadWrite,
                likesDisplayMode: LikesDisplayMode.Numeric,
                text: 'question-numeric-rw',
                likesCount: 0,

                answers: {
                  create: [
                    {
                      id: generate(),
                      text: 'question-numeric-rw-answer-a',
                      author: 'author-b',
                      likesCount: 3,
                      likes: {
                        create: [
                          {
                            author: 'author-a',
                          },
                          {
                            author: 'author-b',
                          },
                          {
                            author: 'author-c',
                          }
                        ],
                      },
                    },
                    {
                      id: generate(),
                      text: 'question-numeric-rw-answer-b',
                      author: 'author-c',
                      likesCount: 2,
                      likes: {
                        create: [
                          {
                            author: 'author-b',
                          },
                          {
                            author: 'author-c',
                          }
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
  });

  await prisma.$disconnect();
};

seed();
