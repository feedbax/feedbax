/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx, SerializedStyles } from '@emotion/react';
import { stylesDots, getShift, stylesNull } from './styles';

import { useSelector } from 'react-redux';
import { selectors } from '~store/modules/questions';

import Dot from './Dot';

import { DOTS_CENTER, MAX_DOTS, DOT_SIZE_FULL } from './const';

const Pagination = React.memo(() => {
  const currentIndex = useSelector(selectors.currentIndex);
  const questionsIds = useSelector(selectors.questionsIds);

  let style: SerializedStyles = stylesNull;

  if (currentIndex > DOTS_CENTER && questionsIds.length > MAX_DOTS) {
    const $shiftX = (currentIndex - DOTS_CENTER) * DOT_SIZE_FULL;
    const shiftX = Math.min($shiftX, (questionsIds.length - MAX_DOTS) * DOT_SIZE_FULL);

    style = getShift(shiftX);
  }

  return (
    <div css={stylesDots}>
      <div className="wrapper" css={style}>
        {questionsIds.map((questionId, i) => (
          <Dot key={questionId} index={i} />
        ))}
      </div>
    </div>
  );
});

export default Pagination;
