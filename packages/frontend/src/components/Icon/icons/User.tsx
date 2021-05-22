import { memo } from 'react';
import type { ClassNames as ThemeColorKeys } from '@/styles/theme/colors/_export.scss';

type Props = {
  className?: string;
  variant: 'filled' | 'outline',
  iconColor?: ThemeColorKeys;
  backgroundColor?: ThemeColorKeys;
};

export default memo(
  function SvgIcon(props: Props) {
    const { className } = props;
    const { iconColor = 'color-text-primary' } = props;
    const { backgroundColor = 'color-transparent' } = props;
    const { variant = 'outline' } = props;

    switch (variant) {
      case 'filled': {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" width="24" height="24" fillRule="evenodd">
            <circle fill={`var(--${backgroundColor})`} cx="12" cy="12" r="12" />

            <path
              fill={`var(--${iconColor})`}
              fillRule="nonzero"
              d="M15.2,7.2c-0,1.769 -1.432,3.201 -3.2,3.201c-1.768,-0 -3.2,-1.432 -3.2,-3.201c0,-1.768 1.432,-3.2 3.2,-3.2c1.768,0 3.2,1.432 3.2,3.2Z"
            />

            <path
              fill={`var(--${iconColor})`}
              fillRule="nonzero"
              d="M5.6,15.201c0,-2.128 4.264,-3.2 6.4,-3.2c2.136,-0 6.4,1.072 6.4,3.2l0,1.6c-1.46,1.943 -3.783,3.199 -6.4,3.199c-2.617,-0 -4.94,-1.256 -6.399,-3.199l-0.001,-1.6Z"
            />
          </svg>
        );
      }

      case 'outline': {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" width="24" height="24" fillRule="evenodd">
            <circle fill={`var(--${backgroundColor})`} cx="12" cy="12" r="12" />
            <path fill={`var(--${iconColor})`} d="M11.999,8.881c0.929,-0 1.68,-0.752 1.68,-1.681c0,-0.928 -0.751,-1.68 -1.68,-1.68c-0.929,0 -1.68,0.752 -1.68,1.68c0,0.929 0.751,1.681 1.68,1.681Zm-4.88,6.32c-0,-0.003 -0,-0.015 0.017,-0.049c0.022,-0.043 0.076,-0.123 0.194,-0.232c0.246,-0.227 0.66,-0.476 1.233,-0.706c1.15,-0.461 2.558,-0.693 3.436,-0.693c0.878,0 2.286,0.232 3.436,0.693c0.574,0.23 0.987,0.479 1.234,0.706c0.117,0.109 0.171,0.189 0.193,0.232c0.018,0.034 0.017,0.046 0.017,0.049c0,-0 0,0 0,-0l0,1.063c-1.19,1.36 -2.935,2.216 -4.88,2.216c-1.945,-0 -3.69,-0.856 -4.88,-2.216l0,-1.063Zm11.28,1.6l0,-1.6c0,-2.128 -4.264,-3.2 -6.4,-3.2c-2.136,0 -6.4,1.072 -6.4,3.2l0.001,1.601c1.459,1.942 3.782,3.198 6.399,3.198c2.617,0 4.94,-1.256 6.4,-3.198Zm-6.4,-6.401c1.768,-0 3.2,-1.432 3.2,-3.201c-0,-1.768 -1.432,-3.2 -3.2,-3.2c-1.768,0 -3.2,1.432 -3.2,3.2c0,1.769 1.432,3.201 3.2,3.201Z" />
          </svg>
        );
      }

      default: {
        return null;
      }
    }
  },
);
