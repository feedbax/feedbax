import type { Like } from '@utils/prisma';
import type { TransformAnswer } from '@services/answer.types';

type Reducer = (
  (_acc: boolean, curr: Like, _i: number, arr: Like[]) => boolean
);

// eslint-disable-next-line import/prefer-default-export
export const createHasLikedReducer = (
  (uuid: string): Reducer => (
    (_acc, curr, _i, arr) => {
      const isAuthor = curr.author === uuid;

      if (isAuthor) {
        arr.splice(1);
        return true;
      }

      return false;
    }
  )
);

export type GetLikesReducer = (
  (prev: Like[], curr: TransformAnswer) => Like[]
);

export const getLikesReducer: GetLikesReducer = (
  (prev, curr) => prev.concat(curr.likes ?? [])
);
