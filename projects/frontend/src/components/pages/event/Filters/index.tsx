/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx } from '@emotion/react';
import { stylesFilters } from './styles';

import { answerFilters } from '~store/modules/answers';

import Filter from './Filter';

const Filters = React.memo(() => (
  <div css={stylesFilters}>
    {answerFilters.map((filter) => <Filter key={filter} filter={filter} />)}
  </div>
));

export default Filters;
