import { LoremIpsum } from 'lorem-ipsum';

import { WORDS } from 'lorem-ipsum/src/constants/words';
import emojis from '~assets/emoji-compact.json';

import type { AnswerState } from '~store/modules/answers/types';
import type { QuestionsState, QuestionState } from '~store/modules/questions/types';

const loremAnswer = new LoremIpsum({
  wordsPerSentence: {
    max: 26,
    min: 4,
  },

  words: [
    ...new Array(1000).fill(WORDS).flat(),
    ...emojis,
  ],
});

const loremQuestion = new LoremIpsum({
  wordsPerSentence: {
    max: 18,
    min: 4,
  },

  words: [
    ...new Array(400).fill(WORDS).flat(),
    ...emojis,
  ],
});

// eslint-disable-next-line max-len
const randomIntBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomBool = () => Math.random() > 0.5;
const randomInt = () => Math.round(Math.random() * 100);

export const generateQuestion = (order: number): QuestionState => ({
  order,
  id: `question-${order}`,
  text: loremQuestion.generateSentences(1),
});

export const generateAnswer = (
  (initialState: QuestionsState, index: number): AnswerState => ({
    id: `answer-${index}`,
    questionId: `question-${randomIntBetween(0, initialState.questions.length - 1)}`,
    text: loremAnswer.generateSentences(1),
    isMine: randomBool(),
    hasLiked: randomBool(),
    likesCount: randomInt(),
    created: Math.round(Date.now() * Math.random()),
  })
);
