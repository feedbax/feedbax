/** @jsx jsx */

import React from 'react';
import isEqual from 'lodash.isequal';

import { jsx } from '@emotion/react';
import { stylesImageWrapper } from './styles';

import loadable from '@loadable/component';

import LocaleLink from '~components/I18n/LocaleLink';

import type { Variant, LogoProps } from './types';

const Logo = React.memo((props: LogoProps) => {
  const { variant = 'text' } = props;
  const { link = '/' } = props;

  const LogoSVG = getSrc(variant);

  return (
    <div css={stylesImageWrapper(props)}>
      <LocaleLink to={link}>
        <LogoSVG />
      </LocaleLink>
    </div>
  );
}, isEqual);

export default Logo;
export type { Variant } from './types';

const getSrc = (variant: Variant) => {
  switch (variant) {
    case 'no-shadow-and-text': {
      return loadable(() => import('~assets/images/logo_no_shadow_no_text.inline.svg'));
    }

    case 'no-text': {
      return loadable(() => import('~assets/images/logo_no_text.inline.svg'));
    }

    default:
    case 'text': {
      return loadable(() => import('~assets/images/logo.inline.svg'));
    }
  }
};
