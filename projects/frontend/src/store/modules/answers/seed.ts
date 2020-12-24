import { hyphenateSync } from 'hyphen/de';
import { LoremIpsum } from 'lorem-ipsum';

import emojis from '~assets/emoji-compact.json';
import words from '~assets/words.json';

import { AnswersFilter } from '~store/modules/answers';

import type { QuestionsState } from '~store/modules/questions';
import type { AnswersState, AnswerState } from '~store/modules/answers';

const loremAnswer = new LoremIpsum({
  wordsPerSentence: {
    max: 26,
    min: 4,
  },

  words: [
    ...new Array(1000).fill(words).flat(),
    ...emojis,
  ],
});

// eslint-disable-next-line max-len
const randomIntBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomBool = () => Math.random() > 0.5;
const randomInt = () => Math.round(Math.random() * 100);

const generateAnswer = (
  (initialState: QuestionsState, index: number): AnswerState => ({
    id: `answer-${index}`,
    questionId: `question-${randomIntBetween(0, initialState.questions.length - 1)}`,
    text: hyphenateSync(loremAnswer.generateSentences(1)),
    isMine: randomBool(),
    hasLiked: randomBool(),
    likesCount: randomInt(),
    created: Math.round(Date.now() * Math.random()),
  })
);

export default (
  function seed (state: QuestionsState): AnswersState {
    return {
      currentFilter: AnswersFilter.Recent,
      answers: (
        new Array(1000)
          .fill(0)
          .map((_, i) => generateAnswer(state, i))
      ),
    };
  }
);
