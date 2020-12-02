/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useCallback } from "react";

import { jsx, css } from "@emotion/react";
import { between } from "polished";
import { colors } from "~theme";

import { useSelector } from "react-redux";
import { selectors } from "~store/modules/answers";

import { useTwemoji } from "~hooks";

type Props = {
  answerId: string;
  first: boolean;
};

const Answer = React.memo(({ answerId, first }: Props) => {
  const { injectEmojis } = useTwemoji();

  const stylesFirst = first ? stylesAnswerFirst : null;
  const selector = useCallback(selectors.answerById(answerId), [answerId]);
  const [answer] = useSelector(selector);

  return (
    <div ref={injectEmojis} css={[stylesAnswer, stylesFirst]}>
      {answer.text}
    </div>
  );
});

export default Answer;

const stylesAnswer = css`
  max-width: 540px;
  margin: 15px auto;
  padding: 15px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px;
  position: relative;
  color: ${colors.first};
  font-size: ${between("14px", "16px", "300px", "1400px")};
  background: ${colors.third};
  z-index: 1;

  &:nth-of-type(2) {
    margin-top: 0;
  }
`;

const stylesAnswerFirst = css`
  margin-top: 0;
`;
