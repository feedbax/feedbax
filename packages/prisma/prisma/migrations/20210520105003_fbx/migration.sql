/*
  Warnings:

  - You are about to drop the column `isPredefined` on the `Reaction` table. All the data in the column will be lost.
  - Added the required column `questionSettingsQuestionId` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "isPredefined",
ADD COLUMN     "questionSettingsQuestionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reaction" ADD FOREIGN KEY ("questionSettingsQuestionId") REFERENCES "QuestionSettings"("questionId") ON DELETE CASCADE ON UPDATE CASCADE;
