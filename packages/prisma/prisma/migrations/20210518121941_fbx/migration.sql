/*
  Warnings:

  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `answerId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `allowAnswers` on the `QuestionSettings` table. All the data in the column will be lost.
  - You are about to drop the column `limitAnswers` on the `QuestionSettings` table. All the data in the column will be lost.
  - You are about to drop the column `answersLimit` on the `QuestionSettings` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reactionId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allowReactions` to the `QuestionSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limitReactions` to the `QuestionSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reactionsLimit` to the `QuestionSettings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_answerId_fkey";

-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
DROP COLUMN "answerId",
ADD COLUMN     "reactionId" TEXT NOT NULL,
ADD PRIMARY KEY ("author", "reactionId");

-- AlterTable
ALTER TABLE "QuestionSettings" DROP COLUMN "allowAnswers",
DROP COLUMN "limitAnswers",
DROP COLUMN "answersLimit",
ADD COLUMN     "allowReactions" BOOLEAN NOT NULL,
ADD COLUMN     "limitReactions" BOOLEAN NOT NULL,
ADD COLUMN     "reactionsLimit" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Answer";

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPredefined" BOOLEAN NOT NULL DEFAULT false,
    "questionId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reaction" ADD FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("reactionId") REFERENCES "Reaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
