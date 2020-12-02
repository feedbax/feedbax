/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";

import { jsx, css } from "@emotion/react";
import { colors } from "~theme";

import { useSelector } from "react-redux";
import { selectors } from "~store/modules/questions";

type Props = { index: number };

const Dot = React.memo(({ index }: Props) => {
  const currentIndex = useSelector(selectors.currentIndex);

  const isCurrent = currentIndex === index;
  const stylesCurrent = isCurrent ? stylesDotCurrent : {};

  return <div css={[stylesDot, stylesCurrent]} />;
});

export default Dot;

const stylesDot = css`
  flex: 0 0 auto;

  position: relative;
  width: 5px;
  height: 5px;
  background-color: ${colors.third};
  border-radius: 50%;
  margin: 0px 2px;
  transition: transform 0.3s ease 0s, opacity 0.3s ease 0s;
  transform: scale(0.6);
  opacity: 0.6;
`;

const stylesDotCurrent = css`
  transform: scale(1);
  opacity: 1;
`;
