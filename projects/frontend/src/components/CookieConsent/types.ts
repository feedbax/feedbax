import type { NamedExoticComponent } from 'react';

export type ConsentProps = {
  show: boolean;
  mounted: () => void;
  onAgree: () => void;
};

export type ConsentComponent = NamedExoticComponent<ConsentProps>;
