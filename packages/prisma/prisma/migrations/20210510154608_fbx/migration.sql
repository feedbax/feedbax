/*
  Warnings:

  - Added the required column `imageMimeType` to the `EventMeta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventMeta" ADD COLUMN     "imageMimeType" TEXT NOT NULL;
