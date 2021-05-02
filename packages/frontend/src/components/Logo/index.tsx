import { memo } from 'react';
import dynamic from 'next/dynamic';

import StyledLink from '@/components/StyledLink';

import clsx from 'clsx';
import styles from './styles.module.scss';

const getSrc = (variant: Variant) => {
  switch (variant) {
    case 'no-shadow-and-text': {
      return dynamic(() => import('./assets/logo_no_shadow_no_text'));
    }

    case 'no-text': {
      return dynamic(() => import('./assets/logo_no_text'));
    }

    default:
    case 'normal': {
      return dynamic(() => import('./assets/logo'));
    }
  }
};

export default memo(
  function Logo(props: LogoProps) {
    const { variant = 'normal' } = props;
    const { href = '/' } = props;
    const { className } = props;

    const LogoSVG = getSrc(variant);
    const classNames = clsx(styles.logo, className);

    return (
      <StyledLink
        href={href}
        className={classNames}
      >
        <LogoSVG />
      </StyledLink>
    );
  },
);

export type Variant = 'normal' | 'no-text' | 'no-shadow-and-text';
export type LogoProps = {
  href?: string;

  className: string;
  variant?: Variant;
};
