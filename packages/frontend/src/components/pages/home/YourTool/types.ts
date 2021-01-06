import type { FluidObject } from 'gatsby-image';

export type QueryData = {
  file: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};
