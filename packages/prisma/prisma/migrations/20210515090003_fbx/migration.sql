/*
  Warnings:

  - You are about to drop the column `likesCount` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `likesCount` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `isPredefined` on the `QuestionSettings` table. All the data in the column will be lost.
  - Added the required column `isPredefined` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "likesCount",
ADD COLUMN     "isPredefined" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "likesCount";

-- AlterTable
ALTER TABLE "QuestionSettings" DROP COLUMN "isPredefined";
