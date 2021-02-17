import { memo } from 'react';
import type { SvgIconProps } from './types';

export default memo(
  function SvgIcon(props: SvgIconProps) {
    const { className } = props;
    const { fill = 'white' } = props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18px"
        height="18px"

        className={className}
        fill={fill}
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
      </svg>
    );
  },
);
