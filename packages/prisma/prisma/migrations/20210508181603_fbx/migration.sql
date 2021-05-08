-- CreateTable
CREATE TABLE "EventMeta" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "image" BYTEA NOT NULL,
    "eventId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventMeta_eventId_unique" ON "EventMeta"("eventId");

-- AddForeignKey
ALTER TABLE "EventMeta" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
