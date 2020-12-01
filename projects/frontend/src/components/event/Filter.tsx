/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";

import { jsx, css } from "@emotion/react";
import { between } from "polished";
import { colors } from "~theme";

import { useSelector } from "react-redux";
import { selectors } from "~store/modules/questions";

import iconLikedFilled from "~assets/images/icons/favorite_filled.svg";
import iconLikedOutline from "~assets/images/icons/favorite_outline.svg";

import iconRecentFilled from "~assets/images/icons/clock_filled.svg";
import iconRecentOutline from "~assets/images/icons/clock_outline.svg";

import iconMineFilled from "~assets/images/icons/person_filled.svg";
import iconMineOutline from "~assets/images/icons/person_outline.svg";

import type { QuestionState } from "~store/modules/questions";

type RenderDot = (_: unknown, index: number) => JSX.Element;

const renderDot: RenderDot = (_, index) => {
  const currentIndex = useSelector(selectors.currentIndex);
  const isCurrent = currentIndex === index;
  const className = isCurrent ? "dot current" : "dot";

  return <div key={index} className={className} />;
};

export default function Filter() {
  return (
    <div css={stylesFilter}>
      <div className="filter">
        <button>
          <img src={iconLikedOutline} />
        </button>
      </div>

      <div className="filter current">
        <button>
          <img src={iconRecentFilled} />
        </button>
      </div>

      <div className="filter">
        <button>
          <img src={iconMineOutline} />
        </button>
      </div>
    </div>
  );
}

const stylesFilter = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;

  .filter {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease 0s, opacity 0.3s ease 0s;
    transform: scale(0.8);
    opacity: 1;

    &.current {
      transform: scale(1);
    }

    button {
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      border: 0;
      outline: 0;

      border-radius: 50%;
      transition: transform 0.3s ease 0s;
      cursor: pointer;
      padding: 0;

      width: 28px;
      height: 28px;

      background-color: rgb(255, 125, 101);
      box-shadow: rgba(0, 0, 0, 0.18) 3px 3px 6px,
        rgba(255, 255, 255, 0.18) -3px -3px 6px;

      img {
        padding: 0px;
        position: relative;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        transition: opacity 0.3s ease 0s;

        width: 14px;
        height: 14px;
      }
    }
  }
`;
