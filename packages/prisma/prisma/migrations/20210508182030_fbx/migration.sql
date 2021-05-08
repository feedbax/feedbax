/*
  Warnings:

  - The primary key for the `EventMeta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EventMeta` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "EventMeta_eventId_unique";

-- AlterTable
ALTER TABLE "EventMeta" DROP CONSTRAINT "EventMeta_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("eventId");
