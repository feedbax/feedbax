import type { _PacketCallback } from '@/client/packets/_utils';
import type { Prisma } from '@feedbax/prisma';

type _Event = Prisma.EventGetPayload<{
  select: {
    id: true;
    slug: true;
  };
}>;

type _Question = Prisma.QuestionGetPayload<{
  select: {
    id: true;
    answersMode: true;
    likesDisplayMode: true;
    text: true;
    likes: true;
  };
}>;

type _Answer = Prisma.AnswerGetPayload<{
  select: {
    id: true;
    text: true;
    createdAt: true;
    likes: true;
  };
}>;

type Answer = _Answer & { hasLiked: boolean; isMine: boolean };
type Question = _Question & { hasLiked: boolean, answers: Answer[] };
type Event = _Event & { questions: Question[] };

type ServerPacketId = import('@/server/packets/login').PacketId;
type ServerPacketData = import('@/server/packets/login').PacketData;

export type PacketData = {
  err?: string;
  event?: Event;
};

export type PacketProps = {
  id: ServerPacketId;
  data: ServerPacketData;
  cb: _PacketCallback<PacketData>;
};