import type { Reducer } from './types';

const addToCurrentIndex: Reducer<number> = (
  (state, action) => {
    const questionsCount = Object.keys(state.questions).length;

    const minIndex = 0;
    const maxIndex = questionsCount - 1;

    let newIndex = state.currentIndex + action.payload;

    newIndex = newIndex <= minIndex ? minIndex : newIndex;
    newIndex = newIndex > maxIndex ? maxIndex : newIndex;

    // eslint-disable-next-line no-param-reassign
    state.currentIndex = newIndex;

    return state;
  }
);

const setCurrentIndex: Reducer<number> = (
  (state, action) => {
    const questionsCount = Object.keys(state.questions).length;

    const minIndex = 0;
    const maxIndex = questionsCount - 1;

    let newIndex = action.payload;

    newIndex = newIndex <= minIndex ? minIndex : newIndex;
    newIndex = newIndex > maxIndex ? maxIndex : newIndex;

    // eslint-disable-next-line no-param-reassign
    state.currentIndex = newIndex;

    return state;
  }
);

export default {
  addToCurrentIndex,
  setCurrentIndex,
};
