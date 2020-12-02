import { LoremIpsum } from "lorem-ipsum";

import { WORDS } from "lorem-ipsum/src/constants/words";
import emojis from "~assets/emoji-compact.json";

import { initialState } from "./questions";

import type { AnswerState } from "./answers";
import type { QuestionState } from "./questions";

const loremAnswer = new LoremIpsum({
  wordsPerSentence: {
    max: 26,
    min: 4,
  },

  // prettier-ignore
  words: [
    ...new Array(1000).fill(WORDS).flat(),
    ...emojis
  ],
});

const loremQuestion = new LoremIpsum({
  wordsPerSentence: {
    max: 18,
    min: 4,
  },

  // prettier-ignore
  words: [
    ...new Array(400).fill(WORDS).flat(),
    ...emojis
  ],
});

// prettier-ignore
const randomIntBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomBool = () => Math.random() > 0.5;
const randomInt = () => Math.round(Math.random() * 100);

export const generateQuestion = (order: number): QuestionState => ({
  order,
  id: `question-${order}`,
  text: loremQuestion.generateSentences(1),
});

export const generateAnswer = (index: number): AnswerState => ({
  id: `answer-${index}`,
  // prettier-ignore
  questionId: `question-${randomIntBetween(0, initialState.questions.length - 1)}`,
  text: loremAnswer.generateSentences(1),
  isMine: randomBool(),
  hasLiked: randomBool(),
  likesCount: randomInt(),
  created: Math.round(Date.now() * Math.random()),
});
