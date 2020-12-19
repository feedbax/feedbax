import { css } from '@emotion/react';
import { between } from 'polished';
import { colors } from '~theme';
import { defaultColors } from './const';

import type { SerializedStyles } from '@emotion/react';
import type { IconButtonProps } from './types';

export const getStyles = (
  (props: IconButtonProps): SerializedStyles => {
    const { size = 28 } = props;
    const { color = {} } = props;
    const { neumorphism = true } = props;

    const sizeMin = size;
    const sizeMax = (4 / 3) * size;

    const bgColor = colors[color.background ?? defaultColors.background];

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
      outline: 0;
  
      border-radius: 50%;
      transition: transform 0.3s ease 0s;
      cursor: pointer;
      padding: 0;
  
      width: ${between(`${sizeMin}px`, `${sizeMax}px`, '320px', '2560px')};
      height: ${between(`${sizeMin}px`, `${sizeMax}px`, '320px', '2560px')};
  
      background-color: ${bgColor};
      ${neumorphism ? shadow : null}

      &:hover {
        opacity: 0.6;
      }

      &:active {
        opacity: 1;
      }

      &:focus {
        outline: #ffda73 auto 2px;
        outline-offset: 8px;
      }

      &:focus:not(.focus-visible) {
        outline: 0;
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

        width: ${between(`${sizeMin - 12}px`, `${sizeMax - 12}px`, '320px', '2560px')};
        height: ${between(`${sizeMin}px`, `${sizeMax}px`, '320px', '2560px')};
      }
    `;
  }
);
