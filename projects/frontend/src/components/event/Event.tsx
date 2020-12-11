/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useRef, useEffect } from "react";

import { jsx, css } from "@emotion/react";
import { colors } from "~theme";

import Logo from "~components/Logo";
import IconButton, { Icons } from "~components/IconButton";

import Questions from "~components/event/Questions";
import Slider from "~components/event/Questions/Slider";
import Navigation from "~components/event/Navigation";
import Filters from "~components/event/Filters";
import Answers from "~components/event/Answers";
import MenuButton from "~components/Menu";

import { selectors } from "~store/modules/questions";
import { useSelector } from "react-redux";

const Event = React.memo(() => {
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
          <div className="content">
            <MenuButton />

            <Logo
              variant="no-shadow-and-text"
              styles={{
                height: 60,
                width: 60,
              }}
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
});

export default Event;

const stylesEventHeader = css`
  position: relative;
  background-color: ${colors.second};

  .content {
    position: relative;
    width: 100%;
    max-width: 540px;
    margin: 0 auto;
    padding-top: 25px;
  }
`;

const stylesEvent = css`
  position: relative;
  display: block;
  max-height: 100vh;
  max-height: calc(var(--vh, 1vh) * 100);
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .scroll-container {
    flex: 1 1 auto;
    overflow-y: scroll;
    overflow-x: hidden;
    touch-action: pan-y;
  }

  .toolbar {
    flex: 0 0 auto;
    width: 100%;
    height: 60px;
    background: ${colors.first};
  }
`;
