import type { benefits } from './const';
import type { FluidObject } from 'gatsby-image';

export type Benefit = typeof benefits[number];
export type QueryData = {
  [P in Benefit['image']]: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};
