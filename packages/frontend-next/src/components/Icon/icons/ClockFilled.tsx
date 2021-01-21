import { memo } from 'react';
import type { SvgIconProps } from './types';

export default memo(
  function SvgIcon (props: SvgIconProps) {
    const { className } = props;
    const { fill = 'white' } = props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        viewBox="0 0 24 24"
        width="18px"
        height="18px"

        className={className}
        fill={fill}
      >
        <rect fill="none" height="24" width="24" />
        <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M16.2,16.2L11,13V7h1.5v5.2l4.5,2.7L16.2,16.2z" />
      </svg>
    );
  },
);
