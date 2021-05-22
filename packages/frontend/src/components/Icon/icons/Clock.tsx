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
              d="M12,4c-4.4,0 -8,3.6 -8,8c0,4.4 3.6,8 8,8c4.4,0 8,-3.6 8,-8c0,-4.4 -3.6,-8 -8,-8Zm3.36,11.36l-4.16,-2.56l0,-4.8l1.2,0l0,4.16l3.6,2.16l-0.64,1.04Z"
            />
          </svg>
        );
      }

      case 'outline': {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" width="24" height="24" fillRule="evenodd">
            <circle fill={`var(--${backgroundColor})`} cx="12" cy="12" r="12" />

            <path
              fill={`var(--${iconColor})`}
              fillRule="nonzero"
              d="M12,4c-4.4,0 -8,3.6 -8,8c0,4.4 3.6,8 8,8c4.4,0 8,-3.6 8,-8c0,-4.4 -3.6,-8 -8,-8Zm0,14.4c-3.528,0 -6.4,-2.872 -6.4,-6.4c0,-3.528 2.872,-6.4 6.4,-6.4c3.528,0 6.4,2.872 6.4,6.4c0,3.528 -2.872,6.4 -6.4,6.4Zm0.4,-10.4l-1.2,0l0,4.8l4.16,2.56l0.64,-1.04l-3.6,-2.16l0,-4.16Z"
            />
          </svg>
        );
      }

      default: {
        return null;
      }
    }
  },
);
