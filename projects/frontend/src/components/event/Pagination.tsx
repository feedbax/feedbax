/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";

import { jsx, css } from "@emotion/react";

import { useSelector } from "react-redux";
import { selectors } from "~store/modules/questions";

function Dot({ index }: { index: number }) {
  const currentIndex = useSelector(selectors.currentIndex);

  const isCurrent = currentIndex === index;
  const className = isCurrent ? "dot current" : "dot";

  return <div className={className} />;
}

export default function Pagination() {
  const currentIndex = useSelector(selectors.currentIndex);
  const questionsLength = useSelector(selectors.questionsLength);
  const dots = new Array(questionsLength).fill(0);

  let style: React.CSSProperties = {};

  if (currentIndex > 3 && questionsLength > 7) {
    const $shiftX = (currentIndex - 3) * 9;
    const shiftX = Math.min($shiftX, (questionsLength - 7) * 9);

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
}

const stylesDots = css`
  position: relative;

  width: 63px;
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

    .dot {
      flex: 0 0 auto;

      position: relative;
      width: 5px;
      height: 5px;
      background-color: #fff;
      border-radius: 50%;
      margin: 0px 2px;
      transition: transform 0.3s ease 0s, opacity 0.3s ease 0s;
      transform: scale(0.6);
      opacity: 0.6;

      &.current {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
`;
