import { css } from '@emotion/react';
import { between } from 'polished';

import type { CSSInterpolation, SerializedStyles } from '@emotion/serialize';

type Type = 'single' | 'multiple';
type Unit = [string, string];

type CssProp<T extends Type> = (
  T extends 'single'
    ? (unit: string) => CSSInterpolation
    : (units: Array<string>) => CSSInterpolation
)

type Size<T extends Type> = (
  T extends 'single'
    ? Unit
    : Array<Unit>
);

type Screen = [string, string];

type FluidRangeProps<T extends Type> = (
  T extends 'single'
    ? {
      css: CssProp<T>;
      size: Size<T>;
      screen: Screen;
    }
    : {
      css: CssProp<T>;
      sizes: Size<T>;
      screen: Screen;
    }
);

type MediaProps = {
  propMin: CSSInterpolation;
  propFluid: CSSInterpolation;
  propMax: CSSInterpolation;
};

function calcProps (props: FluidRangeProps<'single'> | FluidRangeProps<'multiple'>): MediaProps {
  const { screen } = props;
  const [min, max] = screen;

  let mediaProps: MediaProps;

  if ('sizes' in props) {
    const { css: _css, sizes } = props;

    mediaProps = {
      propMin: _css(sizes.map(([from, _to]) => from)),
      propFluid: _css(sizes.map(([from, to]) => between(from, to, min, max))),
      propMax: _css(sizes.map(([_from, to]) => to)),
    };
  } else {
    const { css: _css, size } = props;
    const [from, to] = size;

    mediaProps = {
      propMin: _css(from),
      propFluid: _css(between(from, to, min, max)),
      propMax: _css(to),
    };
  }

  return mediaProps;
}

function fluidRange (props: FluidRangeProps<'single'>): SerializedStyles;
function fluidRange (props: FluidRangeProps<'multiple'>): SerializedStyles;
function fluidRange (props: FluidRangeProps<'single'> | FluidRangeProps<'multiple'>): SerializedStyles {
  const { screen } = props;
  const [min, max] = screen;

  const { propMin, propMax, propFluid } = calcProps(props);

  return css`
    ${propMin}

    @media (min-width: ${min}) {
      ${propFluid}
    }

    @media (min-width: ${max}) {
      ${propMax}
    }
  `;
}

export default fluidRange;
