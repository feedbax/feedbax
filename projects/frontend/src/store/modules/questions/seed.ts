import { hyphenateSync } from 'hyphen/de';
import { LoremIpsum } from 'lorem-ipsum';

import emojis from '~assets/emoji-compact.json';
import words from '~assets/words.json';

import type { QuestionsState, QuestionState } from '~store/modules/questions';

const loremQuestion = new LoremIpsum({
  wordsPerSentence: {
    max: 18,
    min: 4,
  },

  words: [
    ...new Array(400).fill(words).flat(),
    ...emojis,
  ],
});

export const generateQuestion = (
  (order: number): QuestionState => ({
    order,
    id: `question-${order}`,
    text: hyphenateSync(loremQuestion.generateSentences(1)),
  })
);

export default (
  function seed (): QuestionsState {
    return {
      currentIndex: 0,
      questions: (
        new Array(10)
          .fill(0)
          .map((_, i) => generateQuestion(i))
      ),
    };
  }
);
