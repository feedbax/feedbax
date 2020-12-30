import { hyphenateSync } from 'hyphen/de';
import { LoremIpsum } from 'lorem-ipsum';

import emojis from '~assets/emoji-compact.json';
import words from '~assets/words.json';

import { AnswersFilter, AnswerState } from '~store/modules/answers/types';
import { QuestionType } from '~store/modules/questions/types';

import type { RootState } from '~store';
import type { AnswersState } from '~store/modules/answers/types';
import type { QuestionsState, QuestionState } from '~store/modules/questions/types';

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

const randomIntBetween = (
  (min: number, max: number) => (
    Math.floor(
      Math.random() * (max - min + 1),
    ) + min
  )
);

const randomBool = () => Math.random() > 0.5;
const randomInt = () => Math.round(Math.random() * 100);

export default (
  function seed (): RootState {
    const answersState: AnswersState = {
      currentFilter: AnswersFilter.Recent,
      answers: [],
    };

    const questionsState: QuestionsState = {
      currentIndex: 0,
      questions: [],
    };

    const questionsCount = randomIntBetween(5, 10);

    for (let i = 0; i < questionsCount; i += 1) {
      const answersCount = randomIntBetween(25, 100);

      const question: QuestionState = {
        id: `question-${i}`,
        order: i,
        hasLiked: randomBool(),
        likesCount: 0,
        text: hyphenateSync(loremQuestion.generateSentences(1)),
        type: randomBool() ? QuestionType.POLL : QuestionType.VOTE,
      };

      for (let j = 0; j < answersCount; j += 1) {
        const answer: AnswerState = {
          id: `answer-${i}-${j}`,
          questionId: question.id,
          text: hyphenateSync(loremAnswer.generateSentences(1)),
          isMine: randomBool(),
          hasLiked: question.hasLiked ? randomBool() : false,
          likesCount: randomInt(),
          createdDate: Math.round(Date.now() * Math.random()),
        };

        question.likesCount += answer.likesCount;
        answersState.answers.push(answer);
      }

      questionsState.questions.push(question);
    }

    return {
      answersState,
      questionsState,
    };
  }
);
