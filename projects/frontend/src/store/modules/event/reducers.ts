import type { EventModel, Reducer } from './types';

const addEvent: Reducer<EventModel> = (
  (state, action) => {
    const event = action.payload;

    // eslint-disable-next-line no-param-reassign
    state.event = {
      ...state.event,
      ...event,

      questions: (
        event.questions.map(
          (question) => question.id,
        )
      ),
    };

    return state;
  }
);

export default { addEvent };
