import { LikesDisplayMode, PrismaClient } from '@feedbax/prisma';
import { generate } from '@/utils/flake';

import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

import data from './data.json';

const deleteOldSeededData = async (prisma: PrismaClient) => {
  await prisma.like.deleteMany({});
  await prisma.reaction.deleteMany({});

  await prisma.questionSettings.deleteMany({});
  await prisma.question.deleteMany({});

  await prisma.eventSettings.deleteMany({});
  await prisma.eventMeta.deleteMany({});
  await prisma.event.deleteMany({});

  await prisma.workspacesOnUsers.deleteMany({});
  await prisma.workspace.deleteMany({});
  await prisma.user.deleteMany({});
};

const getLikesDisplayModeFromString = (likesDisplayMode: string) => {
  switch (likesDisplayMode) {
    case 'Percentage': {
      return LikesDisplayMode.Percentage;
    }

    case 'Numeric': {
      return LikesDisplayMode.Numeric;
    }
  
    default: {
      throw new Error(`invalid LikesDisplayMode "${likesDisplayMode}"`);
    }
  }
}

(async () => {
  const prisma = new PrismaClient();

  await deleteOldSeededData(prisma);

  const user = await prisma.user.create({
    data: {
      id: generate(),
      email: data.email,
      name: data.name,
      password: bcrypt.hashSync(data.password, 10),
    },
  });

  for (const workspaceData of data.workspaces) {
    const workspace = await prisma.workspace.create({
      data: {
        id: generate(),
        name: workspaceData.name,
      },
    });

    await prisma.workspacesOnUsers.create({
      data: {
        userRole: 'Administrator',        
        user: { connect: { id: user.id } },
        workspace: { connect: { id: workspace.id } },
      },
    });

    for (const eventData of workspaceData.events) {
      const event = await prisma.event.create({
        data: {
          id: generate(),
          slug: eventData.slug,

          settings: {
            create: {
              startDate: new Date(),
              endDate: new Date(),
            },
          },

          meta: {
            create: {
              title: eventData.meta.title,
              description: eventData.meta.description,
              image: fs.readFileSync(path.join(process.cwd(), 'og_image.jpg')),
            },
          },

          workspace: {
            connect: { id: workspace.id },
          },
        },
      });

      let order = 0;
      for (const questionData of eventData.questions) {
        const question = await prisma.question.create({
          data: {
            id: generate(),
            order: order++,
            text: questionData.text,

            settings: {
              create: {
                allowLikes: questionData.settings.allowLikes,
                limitLikes: questionData.settings.limitLikes,
                likesLimit: questionData.settings.likesLimit,

                allowReactions: questionData.settings.allowReactions,
                limitReactions: questionData.settings.limitReactions,
                reactionsLimit: questionData.settings.reactionsLimit,

                likesDisplayMode: getLikesDisplayModeFromString(questionData.settings.likesDisplayMode),
              },
            },

            event: {
              connect: { id: event.id },
            },
          },
        });

        for (const reactionData of questionData.reactions) {
          const reaction = await prisma.reaction.create({
            data: {
              id: generate(),
              author: generate(),
              text: reactionData.text,
              question: { connect: { id: question.id } },
            },
          });

          await prisma.questionSettings.update({
            where: { questionId: question.id },
            data: {
              predefinedReactions: {
                connect: { id: reaction.id },
              },
            },
          });

          for (let i = 0; i < reactionData.likes; i += 1) {
            await prisma.like.create({
              data: {
                author: generate(),
                reaction: { connect: { id: reaction.id } },
              },
            });
          }
        }
      }
    }
  }

  await prisma.$disconnect();
})();
