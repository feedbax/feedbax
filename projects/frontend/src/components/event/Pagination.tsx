/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react"

import { jsx, css } from "@emotion/react"

import { useSelector } from "react-redux"
import { RootState } from "~store"

type RenderDot = (_: unknown, index: number) => JSX.Element

const currentIndexSelector = (state: RootState) => state.questionsState.currentIndex
const questionsLengthSelector = (state: RootState) => state.questionsState.questions.length

const renderDot: RenderDot = (_, index) => {
  const currentIndex = useSelector(currentIndexSelector)
  const isCurrent = currentIndex === index
  const className = isCurrent ? "dot current" : "dot"

  return (
    <div key={index} className={className} />
  )
}

export default function Pagination() {
  const questionsLength = useSelector(questionsLengthSelector)
  const dots = new Array(questionsLength).fill(0);

  return (
    <div css={stylesDots}>
      {dots.map(renderDot)}
    </div>
  )
}

const stylesDots = css`
  position: relative;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  .dot {
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
`
