import { memo } from 'react';

export default memo(
  function Svg(): JSX.Element {
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="var(--color-text-primary)"
          fillOpacity=".35"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M60 110.625c27.96 0 50.625-22.666 50.625-50.625 0-27.96-22.666-50.625-50.625-50.625C32.04 9.375 9.375 32.041 9.375 60c0 27.96 22.666 50.625 50.625 50.625zM29.62 34.687a5.062 5.062 0 100-10.124 5.062 5.062 0 000 10.125zm20.25 0a5.062 5.062 0 100-10.124 5.062 5.062 0 000 10.125zm20.25 0a5.062 5.062 0 100-10.124 5.062 5.062 0 000 10.125zM50.38 70.126a3.038 3.038 0 11-6.075 0 3.038 3.038 0 016.075 0zm12.15 0a3.037 3.037 0 11-6.075 0 3.037 3.037 0 016.075 0zm12.15 0a3.038 3.038 0 11-6.075 0 3.038 3.038 0 016.075 0z"
        />

        <g
          filter="url(#filter0_d)"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="var(--color-text-primary)"
        >
          <path d="M9.375 15.45v95.175l20.25-60.75H84.3a6.075 6.075 0 006.075-6.075V15.45A6.075 6.075 0 0084.3 9.375H15.45a6.075 6.075 0 00-6.075 6.075zM29.62 34.688a5.062 5.062 0 100-10.125 5.062 5.062 0 000 10.125zm20.25 0a5.062 5.062 0 100-10.125 5.062 5.062 0 000 10.125zm20.25 0a5.062 5.062 0 100-10.125 5.062 5.062 0 000 10.125z" />
          <path d="M38.599 63.467A5.063 5.063 0 0143.403 60h30.772a6.075 6.075 0 016.075 6.075v7.938a6.075 6.075 0 01-6.034 6.075l-24.341.162-26.933 30.375L38.6 63.467zm11.782 6.658a3.038 3.038 0 11-6.075 0 3.038 3.038 0 016.075 0zm12.15 0a3.037 3.037 0 11-6.075 0 3.037 3.037 0 016.075 0zm12.15 0a3.038 3.038 0 11-6.075 0 3.038 3.038 0 016.075 0z" />
        </g>

        <path
          d="M34.682 29.625a5.063 5.063 0 11-10.125 0 5.063 5.063 0 0110.125 0zM54.932 29.625a5.063 5.063 0 11-10.125 0 5.063 5.063 0 0110.125 0zM70.12 34.687a5.063 5.063 0 100-10.125 5.063 5.063 0 000 10.125zM50.381 70.126a3.038 3.038 0 11-6.075 0 3.038 3.038 0 016.075 0zM62.531 70.126a3.037 3.037 0 11-6.075 0 3.037 3.037 0 016.075 0zM71.644 73.163a3.037 3.037 0 100-6.075 3.037 3.037 0 000 6.075z"
          fill="var(--color-text-primary)"
          fillOpacity=".7"
        />

        <defs>
          <filter
            id="filter0_d"
            x="6.375"
            y="9.375"
            width="87"
            height="107.25"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="1.5" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>
    );
  },
);
