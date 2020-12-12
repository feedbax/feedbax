/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";
import { useCallback, useState, useEffect } from "react";

import { jsx, css } from "@emotion/react";

import { useSelector } from "react-redux";
import { selectors as answersSelectors } from "~store/modules/answers";
import { selectors as questionsSelectors } from "~store/modules/questions";

import Answer from "./Answer";
import { colors } from "~theme";

const useAnswersLazyLoad = () => {
  const [count, setCount] = useState(10);

  const currentIndex = useSelector(questionsSelectors.currentIndex);
  const getAnswersIds = useSelector(answersSelectors.getCurrentAnswersIds);
  const answersIds = getAnswersIds(count);

  useEffect(() => {
    setCount(10);
  }, [currentIndex]);

  const loadMoreRef = useCallback((element: HTMLElement | null) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount((count) => count + 10);
        }
      },
      { threshold: [0] },
    );

    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return { answersIds, loadMoreRef };
};

const Answers = React.memo(() => {
  const { answersIds, loadMoreRef } = useAnswersLazyLoad();

  return (
    <div css={stylesAnswers}>
      <i className="background" />

      {answersIds.map((answerId, i) => (
        <Answer key={answerId} answerId={answerId} first={i === 0} />
      ))}

      <div ref={loadMoreRef} css={stylesLoadMore} />
    </div>
  );
});

export default Answers;

const stylesLoadMore = css`
  position: absolute;
  bottom: 100vh;
  height: 1px;
  width: 1px;
`;

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
