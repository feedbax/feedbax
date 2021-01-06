import type { FluidObject } from 'gatsby-image';

export type QueryData = {
  backgroundLandscape: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };

  backgroundPortrait: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};
