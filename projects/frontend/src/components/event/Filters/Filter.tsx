/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";
import { useSelector } from "react-redux";

import { jsx, css } from "@emotion/react";

import IconButton, { Icons, Variants } from "~components/IconButton";

import { AnswersFilter, selectors, actions } from "~store/modules/answers";
import { store } from "~store";

type FilterProps = {
  filter: AnswersFilter;
};

const Filter = React.memo(({ filter }: FilterProps) => {
  const currentFilter = useSelector(selectors.currentFilter);

  const isCurrent = filter === currentFilter;
  const stylesCurrent = isCurrent ? stylesFilterCurrent : null;
  const variant = isCurrent ? Variants.Filled : Variants.Outline;
  const icon = getIcon(filter);

  const action = actions.setCurrentFilter(filter);
  const setFilter = () => store.dispatch(action);

  return (
    <div css={[stylesFilter, stylesCurrent]} onClick={setFilter}>
      <IconButton icon={icon} variant={variant} />
    </div>
  );
});

export default Filter;

const getIcon = (filter: AnswersFilter): Icons => {
  switch (filter) {
    case AnswersFilter.Liked: {
      return Icons.Heart;
    }

    case AnswersFilter.Mine: {
      return Icons.Person;
    }

    case AnswersFilter.Recent: {
      return Icons.Clock;
    }
  }
};

const stylesFilter = css`
  position: relative;
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease 0s, opacity 0.3s ease 0s;
  transform: scale(0.8);
  opacity: 1;

  &.current {
    transform: scale(1);
  }
`;

const stylesFilterCurrent = css`
  transform: scale(1);
`;
