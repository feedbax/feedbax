import { memo } from 'react';

type SvgStyles = { className: string };

export default memo(
  function Svg({ className }: SvgStyles): JSX.Element {
    return (
      <svg
        className={className}
        viewBox="0 0 414 212"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 13.71C10.82 8.24 39.83-2.09 69.24.37 106 3.45 133.78 13.51 164.62 52.3c5.76 7.24 10.9 14.33 15.79 21.08 21.28 29.38 37.8 52.18 80 52.18h3.24c49.63 0 72.88-.01 108.07 18.47 28.76 15.1 42.28 48 42.28 62.59V212H0V13.71z"
          fill="var(--color-feedbax-primary)"
        />
      </svg>

    );
  },
);
