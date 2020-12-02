/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useCallback } from "react";

import { jsx, css } from "@emotion/react";
import { between } from "polished";
import { colors } from "~theme";

import { useSelector } from "react-redux";
import { selectors } from "~store/modules/answers";

import { useTwemoji } from "~hooks";

import IconButton from "~components/IconButton";

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
    <div css={[stylesAnswer, stylesFirst]}>
      <div className="text" ref={injectEmojis}>
        {answer.text}
      </div>

      <div className="like">
        <IconButton
          icon="heart"
          variant="outline"
          color={{ icon: "first", background: "third" }}
        />
      </div>
    </div>
  );
});

export default Answer;

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

  &:first-of-type {
    margin-top: 0;
  }

  .text {
    flex: 1 1 auto;
    color: ${colors.first};
    font-size: ${between("14px", "16px", "300px", "1400px")};
    padding-right: 15px;
  }

  .like {
    flex: 0 0 auto;
  }
`;

const stylesAnswerFirst = css`
  margin-top: 0;
`;
