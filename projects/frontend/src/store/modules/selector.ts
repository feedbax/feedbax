import { createSelectorCreator, defaultMemoize } from "reselect";
import { shallowEqual } from "react-redux";

export const createSelector = createSelectorCreator(
  defaultMemoize,
  shallowEqual
);
