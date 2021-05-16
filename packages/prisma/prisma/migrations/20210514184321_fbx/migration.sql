/*
  Warnings:

  - Added the required column `userRole` to the `WorkspacesOnUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkspacesOnUsers" ADD COLUMN     "userRole" "WorkspaceUserRoles" NOT NULL;
