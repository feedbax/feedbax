/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx } from '@emotion/react';
import { stylesAnswers } from './styles';

import { useSelector } from 'react-redux';
import { selectors as answersSelectors } from '~store/modules/answers';

import Answer from './Answer';

type AnswersProps = {
  count: number;
}

const Answers = React.memo(({ count }: AnswersProps) => {
  const getAnswersIds = useSelector(answersSelectors.currentFilteredAnswerIdsByAmount);
  const answersIds = getAnswersIds(count);

  return (
    <div css={stylesAnswers}>
      <i className="background" />

      {answersIds.map((answerId, i) => (
        <Answer key={answerId} answerId={answerId} first={i === 0} />
      ))}
    </div>
  );
});

export default Answers;
