/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useCallback } from "react";

import { jsx, css } from "@emotion/react";
import { between } from "polished";
import { colors } from "~theme";

import { useSelector } from "react-redux";
import { selectors } from "~store/modules/questions";

import { useTwemoji } from "~hooks";

type QuestionProps = {
  questionId: string;
  index: number;
};

const Question = React.memo(({ questionId, index }: QuestionProps) => {
  // prettier-ignore
  const selector = useCallback(selectors.questionById(questionId), [questionId,]);
  const [question] = useSelector(selector);

  const { injectEmojis } = useTwemoji();

  const currentIndex = useSelector(selectors.currentIndex);
  const deltaIndex = index - currentIndex;
  const isCurrent = currentIndex === index;
  const stylesCurrent = isCurrent ? stylesQuestionCurrent : {};

  return (
    <div
      css={[stylesQuestion, stylesCurrent]}
      style={{ transform: `translate(${deltaIndex * 100}%, 0)` }}
      key={question.order}
    >
      <div className="number">{`${index + 1}`.padStart(2, "0")}</div>
      <div ref={injectEmojis} className="text">
        {question.text}
      </div>
    </div>
  );
});

export default Question;

const stylesQuestion = css`
  position: absolute;
  width: 100%;
  top: 0;
  color: ${colors.first};

  padding: 0 25px;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  user-select: none;

  font-size: ${between("20px", "24px", "300px", "1400px")};
  line-height: ${between("20px", "24px", "300px", "1400px")};

  .number {
    display: block;
    font-family: "Klinic Slab";
    font-weight: bold;
  }

  .text {
    display: block;
    font-family: "Klinic Slab";
    font-weight: bold;
    padding-left: 10px;
    margin-left: 10px;
    border-left: 1px solid ${colors.first};
  }
`;

const stylesQuestionCurrent = css`
  position: relative;

  top: 0;
  left: 0;

  z-index: 2;
`;
