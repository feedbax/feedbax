/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";

import { jsx } from "@emotion/react";

import { useSelector } from "react-redux";
import { selectors } from "~store/modules/questions";

import Question from "./Question";

const Questions = React.memo(() => {
  const questions = useSelector(selectors.questions);

  return (
    <>
      {questions.map((q, i) => (
        <Question key={q.order} question={q} index={i} />
      ))}
    </>
  );
});

export default Questions;
