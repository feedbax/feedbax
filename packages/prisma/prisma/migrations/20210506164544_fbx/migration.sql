/*
  Warnings:

  - You are about to drop the column `likes` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "likes",
ADD COLUMN     "likesCount" INTEGER NOT NULL DEFAULT 0;
