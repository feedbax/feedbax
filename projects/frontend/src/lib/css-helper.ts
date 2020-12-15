import { css } from '@emotion/react';
import { between } from 'polished';

import type { CSSInterpolation, SerializedStyles } from '@emotion/serialize';

type Type = 'single' | 'multiple';

type CssProp<T extends Type> = (
  T extends 'single'
    ? (px: string) => CSSInterpolation
    : (pxs: Array<string>) => CSSInterpolation
)

type Size<T extends Type> = (
  T extends 'single'
    ? { from: string; to: string }
    : Array<{ from: string; to: string }>
);

type Screen = { min: string; max: string };

type Props<T extends Type> = (
  T extends 'single'
    ? {
      prop: CssProp<T>;
      size: Size<T>;
      screen: Screen;
    }
    : {
      prop: CssProp<T>;
      sizes: Size<T>;
      screen: Screen;
    }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function fluidRange (_props: Props<'single'>): SerializedStyles;
export function fluidRange (_props: Props<'multiple'>): SerializedStyles;
export function fluidRange (_props: Props<'single'> | Props<'multiple'>): SerializedStyles {
  const { screen } = _props;

  let propMin: CSSInterpolation;
  let propFluid: CSSInterpolation;
  let propMax: CSSInterpolation;

  if ('sizes' in _props) {
    const { prop, sizes } = _props;

    propMin = prop(sizes.map((s) => s.from));
    propFluid = prop(sizes.map((s) => between(s.from, s.to, screen.min, screen.max)));
    propMax = prop(sizes.map((s) => s.to));
  } else {
    const { prop, size } = _props;

    propMin = prop(size.from);
    propFluid = prop(between(size.from, size.to, screen.min, screen.max));
    propMax = prop(size.to);
  }

  return css`
    ${propMin}

    @media (min-width: ${screen.min}) {
      ${propFluid}
    }

    @media (min-width: ${screen.max}) {
      ${propMax}
    }
  `;
}
