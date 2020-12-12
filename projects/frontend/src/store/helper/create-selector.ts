import { createSelectorCreator, defaultMemoize } from 'reselect';
import { shallowEqual } from 'react-redux';

const createSelector = (
  createSelectorCreator(
    defaultMemoize,
    shallowEqual,
  )
);

export default createSelector;
