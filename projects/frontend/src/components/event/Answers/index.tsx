/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";
import { jsx, css } from "@emotion/react";

import { useSelector } from "react-redux";
import { selectors } from "~store/modules/answers";

import Answer from "./Answer";
import { colors } from "~theme";

const Answers = React.memo(() => {
  const answersIds = useSelector(selectors.currentAnswersIds);

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

const stylesAnswers = css`
  position: relative;
  padding: 0 15px;
  box-sizing: border-box;
  z-index: 1;

  .background {
    position: absolute;
    display: block;
    z-index: 0;

    top: -1px;
    left: 0;
    width: 100%;
    height: 26px;

    background-color: ${colors.second};
  }
`;
