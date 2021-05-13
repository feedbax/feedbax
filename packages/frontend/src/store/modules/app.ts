/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';
import type { FeedbaxStore, WithImmer } from '@/store/types';

interface AppStoreData {
  app: {
    currentQuestionId?: string;
    currentQuestionIndex: number;
  };
}

interface AppStoreActions {
  resetApp: (workingDraft?: FeedbaxStore) => void;

  nextQuestion: (workingDraft?: FeedbaxStore) => void;
  previousQuestion: (workingDraft?: FeedbaxStore) => void;
}

declare module '@/store/types' {
  interface FeedbaxStoreData extends AppStoreData {}
  interface FeedbaxStoreActions extends AppStoreActions {}
}

type AppStore = AppStoreData & AppStoreActions;

const _: any = null;
const initial: AppStoreData = {
  app: {
    currentQuestionId: undefined,
    currentQuestionIndex: 0,
  },
};

export const createAppStore = (withImmer: WithImmer): AppStore => ({
  app: initial.app,

  resetApp: (workingDraft) => {
    consola.trace('FeedbaxStore', 'resetApp', { workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      draft.app = initial.app;
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  nextQuestion: (workingDraft) => {
    consola.trace('FeedbaxStore', 'nextQuestion', { workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      const lastQuestionIndex = draft.event.questionIds.length - 1;

      if (draft.app.currentQuestionIndex < lastQuestionIndex) {
        draft.app.currentQuestionIndex += 1;
        draft.app.currentQuestionId = draft.event.questionIds[draft.app.currentQuestionIndex];
      }
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  previousQuestion: (workingDraft) => {
    consola.trace('FeedbaxStore', 'previousQuestion', { workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      if (draft.app.currentQuestionIndex > 0) {
        draft.app.currentQuestionIndex -= 1;
        draft.app.currentQuestionId = draft.event.questionIds[draft.app.currentQuestionIndex];
      }
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },
});
