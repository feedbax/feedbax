/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useRef, useEffect } from 'react';

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
import { selectors } from '~store/modules/questions';

const Event = React.memo(
  () => {
    const currentIndex = useSelector(selectors.currentIndex);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }, [currentIndex, scrollContainerRef]);

    return (
      <div css={stylesEvent}>
        <div className="scroll-container" ref={scrollContainerRef}>
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

          <Answers />
        </div>

        <div className="toolbar" />
      </div>
    );
  },
);

export default Event;
