/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";
import { jsx, css } from "@emotion/react";

import { useSelector } from "react-redux";
import { selectors } from "~store/modules/answers";

import Answer from "./Answer";

const Answers = React.memo(() => {
  const answersIds = useSelector(selectors.currentAnswersIds);

  return (
    <div css={stylesAnswers}>
      {answersIds.map(answerId => (
        <Answer key={answerId} answerId={answerId} />
      ))}
    </div>
  );
});

export default Answers;

const stylesAnswers = css`
  padding: 15px;
  box-sizing: border-box;
`;
