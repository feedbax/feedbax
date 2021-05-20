-- CreateEnum
CREATE TYPE "WorkspaceUserRoles" AS ENUM ('Administrator', 'Moderator', 'Reader');

-- CreateEnum
CREATE TYPE "LikesDisplayMode" AS ENUM ('Percentage', 'Numeric');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkspacesOnUsers" (
    "userId" TEXT NOT NULL,
    "userRole" "WorkspaceUserRoles" NOT NULL,
    "workspaceId" TEXT NOT NULL,

    PRIMARY KEY ("userId","workspaceId")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSettings" (
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT NOT NULL,

    PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "EventMeta" (
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "image" BYTEA NOT NULL,
    "eventId" TEXT NOT NULL,

    PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "eventId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionSettings" (
    "allowReactions" BOOLEAN NOT NULL,
    "limitReactions" BOOLEAN NOT NULL,
    "reactionsLimit" INTEGER NOT NULL,
    "allowLikes" BOOLEAN NOT NULL,
    "limitLikes" BOOLEAN NOT NULL,
    "likesLimit" INTEGER NOT NULL,
    "likesDisplayMode" "LikesDisplayMode" NOT NULL,
    "questionId" TEXT NOT NULL,

    PRIMARY KEY ("questionId")
);

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

-- CreateTable
CREATE TABLE "Like" (
    "author" TEXT NOT NULL,
    "reactionId" TEXT NOT NULL,

    PRIMARY KEY ("author","reactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Event.slug_unique" ON "Event"("slug");

-- AddForeignKey
ALTER TABLE "QuestionSettings" ADD FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("reactionId") REFERENCES "Reaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventMeta" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspacesOnUsers" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspacesOnUsers" ADD FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSettings" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
