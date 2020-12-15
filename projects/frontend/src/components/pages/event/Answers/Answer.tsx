/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx, css } from '@emotion/react';
import { between } from 'polished';
import { colors } from '~theme';

import { useSelector } from 'react-redux';
import { selectors } from '~store/modules/answers';

import useTwemoji from '~hooks/dom/use-twemoji';

import IconButton, { Icons, Variants } from '~components/IconButton';
import { fluidRange } from '~lib/css-helper';

type Props = {
  answerId: string;
  first: boolean;
};

const Answer = React.memo(({ answerId, first }: Props) => {
  const { injectEmojis } = useTwemoji();

  const stylesFirst = first ? stylesAnswerFirst : null;

  const getAnswer = useSelector(selectors.answerById);
  const answer = getAnswer(answerId);

  return (
    <div css={[stylesAnswer, stylesFirst]}>
      <div className="text" ref={injectEmojis}>
        {answer?.text}
      </div>

      <div className="like">
        <span className="count">{answer?.likesCount}</span>

        <IconButton
          icon={Icons.Heart}
          variant={answer?.hasLiked ? Variants.Filled : Variants.Outline}
          color={{ icon: 'first', background: 'third' }}
          ariaLabel="Like answer"
        />
      </div>
    </div>
  );
});

export default Answer;

/* eslint-disable @typescript-eslint/indent */
const stylesAnswer = css`
  position: relative;
  z-index: 1;

  max-width: 540px;
  margin: 15px auto;
  padding: 15px;

  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px;

  background: ${colors.third};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-family: "Klinic Slab Book";

  &:first-of-type {
    margin-top: 0;
  }

  .text {
    flex: 1 1 auto;
    color: ${colors.first};
    padding-right: 15px;

    ${fluidRange({
      prop: (px) => ({ fontSize: px }),
      size: { from: '14px', to: '16px' },
      screen: { min: '320px', max: '1170px' },
    })}
  }

  .like {
    flex: 0 0 auto;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .count {
      min-width: 30px;
      padding-right: 8px;
      color: ${colors.first};
      text-align: right;
      font-size: ${between('12px', '14px', '320px', '1170px')};
    }
  }
`;

const stylesAnswerFirst = css`
  margin-top: 0;
`;
