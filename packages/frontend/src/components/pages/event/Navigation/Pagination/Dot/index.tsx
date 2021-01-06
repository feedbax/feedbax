/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx } from '@emotion/react';
import { stylesDotCurrent, stylesDot } from './styles';

import { useSelector } from 'react-redux';
import { selectors } from '~store/modules/questions';

type Props = { index: number };

const Dot = React.memo(({ index }: Props) => {
  const currentIndex = useSelector(selectors.currentIndex);

  const isCurrent = currentIndex === index;
  const stylesCurrent = isCurrent ? stylesDotCurrent : {};

  return <div css={[stylesDot, stylesCurrent]} />;
});

export default Dot;
