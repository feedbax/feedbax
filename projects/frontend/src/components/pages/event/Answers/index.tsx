/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';
import { useCallback, useState, useEffect } from 'react';

import { jsx } from '@emotion/react';
import { stylesAnswers, stylesLoadMore } from './styles';

import { useSelector } from 'react-redux';
import { selectors as answersSelectors } from '~store/modules/answers';
import { selectors as questionsSelectors } from '~store/modules/questions';

import Answer from './Answer';

const useAnswersLazyLoad = () => {
  const [count, setCount] = useState(10);

  const questionChange = useSelector(questionsSelectors.currentIndex);
  const getAnswersIds = useSelector(answersSelectors.getCurrentAnswersIds);
  const answersIds = getAnswersIds(count);

  useEffect(() => {
    setCount(10);
  }, [questionChange]);

  const loadMoreRef = useCallback(
    (element: HTMLElement | null) => {
      const observer = (
        new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setCount(($count) => $count + 10);
            }
          },

          { threshold: 0 },
        )
      );

      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }, [],
  );

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
