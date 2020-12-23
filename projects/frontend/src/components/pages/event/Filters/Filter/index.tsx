/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';
import { useSelector } from 'react-redux';

import { jsx } from '@emotion/react';
import { stylesFilterCurrent, stylesFilter } from './styles';

import IconButton, { Variants } from '~components/IconButton';

import { store } from '~store';
import { AnswersFilter, selectors, actions } from '~store/modules/answers';

import { getAriaLabel, getIcon } from './const';

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
    <div css={[stylesFilter, stylesCurrent]}>
      <IconButton
        icon={icon}
        variant={variant}
        onClick={setFilter}
        ariaLabel={`set filter to ${getAriaLabel(filter)}`}
      />
    </div>
  );
});

export default Filter;
