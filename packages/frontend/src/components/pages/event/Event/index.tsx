/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useRef, useEffect, useState } from 'react';

import { jsx } from '@emotion/react';
import { stylesEvent, stylesEventHeader } from './styles';

import Logo from '~components/Logo';
import MenuButton from '~components/Menu';

import Questions from '~components/pages/event/Questions';
import Slider from '~components/pages/event/Questions/Slider';
import Navigation from '~components/pages/event/Navigation';
import Filters from '~components/pages/event/Filters';
import Answers from '~components/pages/event/Answers';

import { useSelector } from 'react-redux';
import { selectors as questionsSelectors } from '~store/modules/questions';
import { selectors as answersSelectors } from '~store/modules/answers';

const Event = React.memo(
  () => {
    const [answersCount, setAnswersCount] = useState(10);

    const currentQuestionIndex = useSelector(questionsSelectors.currentIndex);
    const answersCountMax = useSelector(answersSelectors.currentAnswersCount);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(
      () => { // onQuestionChange
        if (scrollContainerRef.current) {
          setAnswersCount(10);
          scrollContainerRef.current.scrollTop = 0;
        }
      }, [currentQuestionIndex],
    );

    const handleScroll = (
      (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const { scrollHeight, clientHeight, scrollTop } = event.currentTarget;
        const scrollTopMax = scrollHeight - clientHeight;
        const scrollTopDelta = scrollTopMax - scrollTop;

        const shouldLoadMore = scrollTopDelta <= 200;

        if (shouldLoadMore) {
          setAnswersCount(
            (answersCountCurrent) => (
              Math.min(answersCountCurrent + 10, answersCountMax)
            ),
          );
        }
      }
    );

    return (
      <div css={stylesEvent}>
        <div
          className="scroll-container"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          <div css={stylesEventHeader}>
            <MenuButton />

            <div className="content">
              <Logo
                variant="no-shadow-and-text"
                sizeFactor={0.5}
              />

              <Navigation />

              <Slider>
                <Questions />
              </Slider>

              <Filters />
            </div>
          </div>

          <Answers count={answersCount} />
        </div>

        <div className="toolbar" />
      </div>
    );
  },
);

export default Event;
