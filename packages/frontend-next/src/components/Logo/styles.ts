import { css } from '@emotion/react';
import { fluid } from '@/utils/styles/helper';

import type { LogoProps } from '@/components/Logo';

export const logoStatic = css({
  position: 'relative',
  display: 'inline-block',

  '& a': {
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  '& svg': {
    display: 'block',
    height: 'auto',
    width: 'auto',
  },
});

export const stylesWithText = (
  (sizeFactor: number) => css(
    fluid(['20rem', '120rem', '240rem'], {
      width: [
        `${4.6875 * sizeFactor}rem`,
        `${7.5 * sizeFactor}rem`,
        `${15 * sizeFactor}rem`,
      ],

      height: [
        `${6.0469 * sizeFactor}rem`,
        `${9.675 * sizeFactor}rem`,
        `${19.35 * sizeFactor}rem`,
      ],
    }),
  )
);

export const stylesSquare = (
  (sizeFactor: number) => {
    type Size = [string, string, string];

    const sizeLogo: Size = [
      `${7.5 * sizeFactor}rem`,
      `${7.5 * sizeFactor}rem`,
      `${15 * sizeFactor}rem`,
    ];

    return css(
      fluid(['20rem', '120rem', '240rem'], {
        width: sizeLogo,
        maxWidth: sizeLogo,
        height: sizeLogo,
        maxHeight: sizeLogo,
      }),
    );
  }
);

export const logoSize = (props: LogoProps) => {
  const { variant = 'normal' } = props;
  const { sizeFactor = 1 } = props;

  return variant === 'normal'
    ? stylesWithText(sizeFactor)
    : stylesSquare(sizeFactor);
};
