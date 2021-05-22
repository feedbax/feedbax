/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { Question, QuestionWith } from '@feedbax/api/models/question';
import type { CreateStore, CreateSelectors, Selector } from '@/lib/store/types';
import type { WithImmer, ImmerAction } from '@/lib/store/types';

type QuestionsStoreData = {
  [questionId: string]: Question & {
    reactionIds: string[];
  };
};

type QuestionsStoreActions = {
  reset: ImmerAction<() => void>;

  addOne: ImmerAction<(question: QuestionWith<'reactions?'>) => void>;
  addMultiple: ImmerAction<(questions: QuestionWith<'reactions?'>[]) => void>;

  removeOne: ImmerAction<(targetQuestion: Question) => void>;
  removeOneById: ImmerAction<(targetQuestionId: string) => void>;

  removeMultiple: ImmerAction<(targetQuestions: Question[]) => void>;
  removeMultipleByIds: ImmerAction<(targetQuestionIds: string[]) => void>;
};

type QuestionsStoreSelectors = {
  get: Selector<QuestionsStoreData>,
  currentQuestionReactionIds: Selector<QuestionsStoreData[string]['reactionIds']>
  currentQuestionSettings: Selector<QuestionsStoreData[string]['settings']>
  removeQuestions: Selector<QuestionsStoreActions['removeMultiple']>
};

type ModuleName = 'questions';

type QuestionsStore =
  CreateStore<ModuleName, QuestionsStoreData, QuestionsStoreActions>;

type QuestionsSelectors =
  CreateSelectors<ModuleName, QuestionsStoreSelectors>;

declare module '@/lib/store/types' {
  interface FeedbaxStore extends QuestionsStore {}
}

const initial: QuestionsStoreData = {};

export const createQuestionsStore = (
  (withImmer: WithImmer): QuestionsStore => ({
    questions: {
      state: initial,
      actions: {
        reset: withImmer((draft) => {
          consola.trace('store.questions.actions.reset');
          draft.questions.state = initial;
        }),

        addOne: withImmer((draft, question) => {
          consola.trace('store.questions.actions.addOne', { question });
          const { reactions, ...questionRest } = question;

          draft.questions.state[question.id] = {
            ...draft.questions.state[question.id],
            ...questionRest,
          };

          draft.event.state.questionIds.push(question.id);
          draft.event.state.questionIds.sort((qIdA, qIdB) => {
            const questionA = draft.questions.state[qIdA];
            const questionB = draft.questions.state[qIdB];

            return questionA.order - questionB.order;
          });

          draft.reactions.actions.addMultiple.withDraft(draft)(reactions ?? []);
        }),

        addMultiple: withImmer((draft, questions) => {
          consola.trace('store.questions.actions.addMultiple', { questions });

          for (let i = 0; i < questions.length; i += 1) {
            const question = questions[i];

            if (typeof question !== 'undefined') {
              draft.questions.actions.addOne.withDraft(draft)(question);
            }
          }
        }),

        removeOne: withImmer((draft, targetQuestion) => {
          consola.trace('store.questions.actions.removeOne', { targetQuestion });
          draft.questions.actions.removeOneById.withDraft(draft)(targetQuestion.id);
        }),

        removeOneById: withImmer((draft, targetQuestionId) => {
          consola.trace('store.questions.actions.removeOneById', { targetQuestionId });

          const questionIdIndex = draft.event.state.questionIds
            .findIndex((questionId) => questionId === targetQuestionId);

          if (questionIdIndex !== -1) {
            draft.event.state.questionIds.splice(questionIdIndex, 1);
          }

          const question = draft.questions.state[targetQuestionId];

          if (typeof question !== 'undefined') {
            for (let i = 0; i < question.reactionIds.length; i += 1) {
              const reactionId = question.reactionIds[i];
              const reaction = draft.reactions.state[reactionId];

              if (typeof reaction !== 'undefined') {
                draft.reactions.actions.removeOne.withDraft(draft)(reaction);
              }
            }

            delete draft.questions.state[targetQuestionId];
          }
        }),

        removeMultiple: withImmer((draft, targetQuestions) => {
          consola.trace('store.questions.actions.removeMultiple', { targetQuestions });

          const questionIds = targetQuestions.map((question) => question.id);
          draft.questions.actions.removeMultipleByIds.withDraft(draft)(questionIds);
        }),

        removeMultipleByIds: withImmer((draft, targetQuestionIds) => {
          consola.trace('store.questions.actions.removeMultipleByIds', { targetQuestionIds });

          for (let i = 0; i < targetQuestionIds.length; i += 1) {
            const targetQuestionId = targetQuestionIds[i];
            draft.questions.actions.removeOneById.withDraft(draft)(targetQuestionId);
          }
        }),
      },
    },
  })
);

export const selectors: QuestionsSelectors = {
  questions: {
    get: (store) => store.questions.state,

    currentQuestionReactionIds: (store) => {
      const { questionId } = store.navigation.state;
      if (typeof questionId === 'undefined') return [];

      const { [questionId]: currentQuestion } = store.questions.state;
      return currentQuestion.reactionIds;
    },

    currentQuestionSettings: (store) => {
      const { questionId } = store.navigation.state;
      if (typeof questionId === 'undefined') return null;

      const { [questionId]: currentQuestion } = store.questions.state;
      return currentQuestion.settings;
    },

    removeQuestions: (store) => store.questions.actions.removeMultiple,
  },
};
