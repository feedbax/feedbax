/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx } from '@emotion/react';
import { stylesAnswerFirst, stylesAnswer } from './styles';

import { useSelector } from 'react-redux';
import { selectors } from '~store/modules/answers';

import IconButton, { Icons, Variants } from '~components/IconButton';

import hyphens from '~components/Hyphens';
import twemoji from '~components/Twemoji';

type Props = {
  answerId: string;
  first: boolean;
};

const AnswerText = hyphens.custom(twemoji.div);

const Answer = React.memo(({ answerId, first }: Props) => {
  const stylesFirst = first ? stylesAnswerFirst : null;

  const getAnswer = useSelector(selectors.answerById);
  const answer = getAnswer(answerId);

  return (
    <div css={[stylesAnswer, stylesFirst]}>
      <AnswerText className="text" renderWhenVisible>
        {answer?.text}
      </AnswerText>

      <div className="like">
        <span className="count">{answer?.likesCount}</span>

        <IconButton
          icon={Icons.Heart}
          variant={answer?.hasLiked ? Variants.Filled : Variants.Outline}
          color={{ icon: '--color-feedbax-primary', background: '--color-primary-text' }}
          ariaLabel="Like answer"
        />
      </div>
    </div>
  );
});

export default Answer;
