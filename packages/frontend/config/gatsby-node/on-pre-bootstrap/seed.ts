import { hyphenateSync } from 'hyphen/de';
import { LoremIpsum } from 'lorem-ipsum';

import emojis from '~assets/emoji-compact.json';
import words from '~assets/words.json';

import { AnswersFilter } from '~store/modules/answers/types';
import { QuestionType } from '~store/modules/questions/types';

import type { feedbax } from '@feedbax/api';
import type { RootState } from '~store';

import type { AnswersState } from '~store/modules/answers/types';
import type { QuestionsState } from '~store/modules/questions/types';
import type { EventsState } from '~store/modules/event/types';

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

type DeepRequired<T> = import('ts-essentials').DeepRequired<T>;
type Merge<S, T> = import('ts-essentials').Merge<S, T>;

/* eslint-disable @typescript-eslint/indent */
type Event = (
  Merge<
    DeepRequired<feedbax.Model.IEvent>,
    Pick<feedbax.Model.IEvent, 'settings'>
  >
);
/* eslint-enable @typescript-eslint/indent */

type Question = DeepRequired<feedbax.Model.IQuestion>;
type Answer = DeepRequired<feedbax.Model.IAnswer>;

function seedAPIData (): Event {
  const questionsCount = randomIntBetween(5, 10);

  const event: Event = {
    slug: 'test',
    startDate: Date.now(),
    durationInDays: 3,
    settings: {},
    questions: [],
  };

  for (let i = 0; i < questionsCount; i += 1) {
    const answersCount = randomIntBetween(25, 100);

    const question: Question = {
      id: `question-${event.slug}-${i}`,
      order: i,
      hasLiked: randomBool(),
      likesCount: 0,
      text: hyphenateSync(loremQuestion.generateSentences(1)),
      type: randomBool() ? QuestionType.POLL : QuestionType.VOTE,
      answers: [],
    };

    for (let j = 0; j < answersCount; j += 1) {
      const answer: Answer = {
        id: `answer-${event.slug}-${i}-${j}`,
        text: hyphenateSync(loremAnswer.generateSentences(1)),
        isMine: randomBool(),
        hasLiked: question.hasLiked ? randomBool() : false,
        likesCount: randomInt(),
        createdDate: Math.round(Date.now() * Math.random()),
      };

      question.likesCount += answer.likesCount;
      question.answers.push(answer);
    }

    event.questions.push(question);
  }

  return event;
}

export default (
  function seed (): RootState {
    const apiData = seedAPIData();

    const eventsState: EventsState = {
      event: {
        slug: apiData.slug,
        startDate: apiData.startDate,
        durationInDays: apiData.durationInDays,
        settings: apiData.settings,
        questions: apiData.questions.map(
          (question) => question.id,
        ),
      },
    };

    const questionsState: QuestionsState = {
      currentIndex: 0,
      questions: {},
    };

    const answersState: AnswersState = {
      currentFilter: AnswersFilter.Recent,
      answers: {},
    };

    for (let i = 0; i < apiData.questions.length; i += 1) {
      const question = apiData.questions[i];

      questionsState.questions = {
        ...questionsState.questions,

        [question.id]: {
          ...question,

          answers: question.answers.map(
            (answer) => answer.id,
          ),
        },
      };

      for (let j = 0; j < question.answers.length; j += 1) {
        const answer = question.answers[j];

        answersState.answers = {
          ...answersState.answers,

          [answer.id]: {
            ...answer,
          },
        };
      }
    }

    return {
      eventsState,
      questionsState,
      answersState,
    };
  }
);
