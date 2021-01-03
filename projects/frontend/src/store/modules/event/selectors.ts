import type { RootState } from '~store';

const questionIdsSelector = (
  (state: RootState): string[] => (
    state.eventsState.event.questions
  )
);

const selectors = {
  eventQuestionIds: questionIdsSelector,
};

export default selectors;
