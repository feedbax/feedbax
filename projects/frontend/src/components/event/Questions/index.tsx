/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx } from '@emotion/react';

import { useSelector } from 'react-redux';
import { selectors } from '~store/modules/questions';

import Question from './Question';

const Questions = React.memo(() => {
  const questionsIds = useSelector(selectors.questionsIds);

  return (
    <>
      {questionsIds.map((questionId, i) => (
        <Question key={questionId} questionId={questionId} index={i} />
      ))}
    </>
  );
});

export default Questions;
