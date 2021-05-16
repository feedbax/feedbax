/*
  Warnings:

  - You are about to drop the column `answersMode` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `likesDisplayMode` on the `Question` table. All the data in the column will be lost.
  - Added the required column `name` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answersMode",
DROP COLUMN "likesDisplayMode";

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AnswersMode";

-- CreateTable
CREATE TABLE "EventSettings" (
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT NOT NULL,

    PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "QuestionSettings" (
    "isPredefined" BOOLEAN NOT NULL,
    "allowAnswers" BOOLEAN NOT NULL,
    "limitAnswers" BOOLEAN NOT NULL,
    "answersLimit" INTEGER NOT NULL,
    "allowLikes" BOOLEAN NOT NULL,
    "limitLikes" BOOLEAN NOT NULL,
    "likesLimit" INTEGER NOT NULL,
    "likesDisplayMode" "LikesDisplayMode" NOT NULL,
    "questionId" TEXT NOT NULL,

    PRIMARY KEY ("questionId")
);

-- AddForeignKey
ALTER TABLE "EventSettings" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionSettings" ADD FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
