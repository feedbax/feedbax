/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';
import { jsx, css } from '@emotion/react';

import { answerFilters } from '~store/modules/answers';

import Filter from './Filter';

const Filters = React.memo(() => (
  <div css={stylesFilters}>
    {answerFilters.map((filter) => <Filter key={filter} filter={filter} />)}
  </div>
));

export default Filters;

const stylesFilters = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 25px;
`;
