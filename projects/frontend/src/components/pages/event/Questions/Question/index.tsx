/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx } from '@emotion/react';
import { stylesQuestionCurrent, stylesQuestion } from './styles';

import { useSelector } from 'react-redux';
import { selectors } from '~store/modules/questions';

import hyphens from '~components/Hyphens';
import twemoji from '~components/Twemoji';

type QuestionProps = {
  questionId: string;
  index: number;
};

const QuestionText = hyphens.custom(twemoji.div);

const Question = React.memo(({ questionId, index }: QuestionProps) => {
  const getQuestion = useSelector(selectors.questionById);
  const question = getQuestion(questionId);

  const currentIndex = useSelector(selectors.currentIndex);
  const deltaIndex = index - currentIndex;
  const isCurrent = currentIndex === index;
  const stylesCurrent = isCurrent ? stylesQuestionCurrent : {};

  return (
    <div
      css={[stylesQuestion, stylesCurrent]}
      style={{
        transform: `translate(${deltaIndex * 100}%, 0)`,
      }}
      key={question?.order}
    >
      <div className="number">{`${index + 1}`.padStart(2, '0')}</div>
      <QuestionText className="text" renderWhenVisible>
        {question?.text}
      </QuestionText>
    </div>
  );
});

export default Question;
