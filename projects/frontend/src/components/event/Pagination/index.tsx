/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";

import { jsx, css } from "@emotion/react";

import { useSelector } from "react-redux";
import { selectors } from "~store/modules/questions";

import Dot from "./Dot";
import { DOTS_CENTER, MAX_DOTS, DOT_SIZE } from "./const";

const Pagination = React.memo(() => {
  const currentIndex = useSelector(selectors.currentIndex);
  const questionsLength = useSelector(selectors.questionsLength);
  const dots = new Array(questionsLength).fill(0);

  let style: React.CSSProperties = {};

  if (currentIndex > DOTS_CENTER && questionsLength > MAX_DOTS) {
    const $shiftX = (currentIndex - DOTS_CENTER) * DOT_SIZE;
    const shiftX = Math.min($shiftX, (questionsLength - MAX_DOTS) * DOT_SIZE);

    style = {
      transform: `translateX(-${shiftX}px)`,
    };
  }

  return (
    <div css={stylesDots}>
      <div className="wrapper" style={style}>
        {dots.map((_, i) => (
          <Dot key={i} index={i} />
        ))}
      </div>
    </div>
  );
});

export default Pagination;

const stylesDots = css`
  position: relative;

  width: ${MAX_DOTS * DOT_SIZE}px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 25px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  .wrapper {
    flex: 0 0 auto;
    transition: transform 0.3s ease 0s, opacity 0.3s ease 0s;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
