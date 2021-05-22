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
              d="M12,19.987l-1.097,-0.999c-3.896,-3.533 -6.468,-5.863 -6.468,-8.722c-0,-2.33 1.831,-4.161 4.161,-4.161c1.316,-0 2.579,0.613 3.404,1.581c0.825,-0.968 2.088,-1.581 3.404,-1.581c2.33,-0 4.161,1.831 4.161,4.161c0,2.859 -2.572,5.189 -6.468,8.73l-1.097,0.991Z"
            />
          </svg>
        );
      }

      case 'outline': {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" width="24" height="24" fillRule="evenodd">
            <circle fill={`var(--${backgroundColor})`} cx="12" cy="12" r="12" />
            <path fill={`var(--${iconColor})`} d="M11.924,17.862l0.08,0.073l0.071,-0.064l0.001,-0.002c1.978,-1.797 3.497,-3.18 4.539,-4.456c1.025,-1.254 1.43,-2.217 1.43,-3.147c0,-1.491 -1.15,-2.641 -2.641,-2.641c-0.856,-0 -1.701,0.406 -2.247,1.047l-1.157,1.358l-1.157,-1.358c-0.546,-0.641 -1.391,-1.047 -2.247,-1.047c-1.491,-0 -2.641,1.15 -2.641,2.641c-0,0.93 0.405,1.893 1.43,3.146c1.042,1.274 2.561,2.656 4.539,4.45Zm-0.998,-11.091c0.405,0.248 0.769,0.557 1.074,0.915c0.305,-0.358 0.669,-0.667 1.074,-0.915c0.691,-0.422 1.5,-0.666 2.33,-0.666c2.33,-0 4.161,1.831 4.161,4.161c0,2.852 -2.559,5.177 -6.438,8.703l-0.03,0.027l-1.097,0.991l-1.097,-0.999l-0.01,-0.009c-3.89,-3.528 -6.458,-5.856 -6.458,-8.713c-0,-2.33 1.831,-4.161 4.161,-4.161c0.83,-0 1.639,0.244 2.33,0.666Z" />
          </svg>
        );
      }

      default: {
        return null;
      }
    }
  },
);
