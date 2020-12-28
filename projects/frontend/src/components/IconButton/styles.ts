import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

import type { SerializedStyles } from '@emotion/react';
import type { IconButtonProps } from './types';

const DEFAULTS = {
  size: 28,

  get sizeBounds () {
    return {
      min: DEFAULTS.size,
      max: (4 / 3) * DEFAULTS.size,
    };
  },
};

export const getStyles = (
  (props: IconButtonProps): SerializedStyles => {
    const { size = DEFAULTS.size } = props;
    const { sizeBounds = {} } = props;

    const { color = {} } = props;
    const { neumorphism = true } = props;

    const sizeMin = (sizeBounds.min ?? size) / 16;
    const sizeMax = (sizeBounds.max ?? 2 * size) / 16;

    const bgColor = cssVar(color.background ?? '--color-feedbax-secondary');

    const shadowXY = Math.round(size * 0.1);
    const shadowBlur = Math.round(size * 0.2);

    const shadow = css({
      boxShadow: ` ${shadowXY}px  ${shadowXY}px ${shadowBlur}px rgba(0, 0, 0, 0.18),
                  -${shadowXY}px -${shadowXY}px ${shadowBlur}px rgba(255, 255, 255, 0.18)`,
    });

    return css`
      position: relative;
  
      display: flex;
      justify-content: center;
      align-items: center;
  
      border: 0;
  
      border-radius: 50%;
      transition: transform 0.3s ease 0s;
      cursor: pointer;
      padding: 0;
  
      ${fluidRange({
        screen: ['120rem', '240rem'] as const,
        sizes: [[`${sizeMin}rem`, `${sizeMax}rem`]] as const,

        css: ([unit]) => ({
          fontSize: unit,
          width: unit,
          height: unit,
        }),
      })}
  
      background-color: ${bgColor};
      ${neumorphism ? shadow : null}

      &:hover {
        opacity: 0.6;
      }

      &:active {
        opacity: 0.8;
      }

      svg {
        padding: 0px;
        position: relative;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        transition: opacity .3s ease 0s, transform .3s ease;

        width: 0.571428em;
        height: 0.571428em;
      }
    `;
  }
);
