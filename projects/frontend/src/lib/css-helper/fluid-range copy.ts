import { css } from '@emotion/react';
import { between } from 'polished';

import type { CSSInterpolation, SerializedStyles } from '@emotion/serialize';

type Type = 'single' | 'multiple';
type Unit = string | number;

type CssProp<T extends Type> = (
  T extends 'single'
    ? (unit: Unit) => CSSInterpolation
    : (units: Array<Unit>) => CSSInterpolation
)

type Size<T extends Type> = (
  T extends 'single'
    ? { from: Unit; to: Unit }
    : Array<{ from: Unit; to: Unit }>
);

type Screen = { min: string; max: string };

type FluidRangeProps<T extends Type> = (
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

type MediaProps = {
  propMin: CSSInterpolation;
  propFluid: CSSInterpolation;
  propMax: CSSInterpolation;
};

function calcProps (props: FluidRangeProps<'single'> | FluidRangeProps<'multiple'>): MediaProps {
  const { screen } = props;
  let mediaProps: MediaProps;

  if ('sizes' in props) {
    const { prop, sizes } = props;

    mediaProps = {
      propMin: prop(sizes.map((s) => s.from)),
      propFluid: prop(sizes.map((s) => between(s.from, s.to, screen.min, screen.max))),
      propMax: prop(sizes.map((s) => s.to)),
    };
  } else {
    const { prop, size } = props;

    mediaProps = {
      propMin: prop(size.from),
      propFluid: prop(between(size.from, size.to, screen.min, screen.max)),
      propMax: prop(size.to),
    };
  }

  return mediaProps;
}

function fluidRange (props: FluidRangeProps<'single'>): SerializedStyles;
function fluidRange (props: FluidRangeProps<'multiple'>): SerializedStyles;
function fluidRange (props: FluidRangeProps<'single'> | FluidRangeProps<'multiple'>): SerializedStyles {
  const { screen } = props;
  const { propMin, propMax, propFluid } = calcProps(props);

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

export default fluidRange;
