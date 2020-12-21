/** @jsx jsx */

import React from 'react';
import isEqual from 'lodash.isequal';

import { jsx } from '@emotion/react';
import { stylesImageWrapper, stylesImage } from './styles';

import logo from '~assets/images/logo.svg';
import logoNoText from '~assets/images/logo_no_text.svg';
import logoNoShadowAndText from '~assets/images/logo_no_shadow_no_text.svg';

import LocaleLink from '~components/I18n/LocaleLink';

import type { Variant, LogoProps } from './types';

const Logo = React.memo((props: LogoProps) => {
  const { variant = 'text' } = props;
  const { link = '/' } = props;

  return (
    <div css={stylesImageWrapper(variant)}>
      <LocaleLink to={link}>
        <img
          css={stylesImage}
          src={getSrc(variant)}
          alt="This is the feedb.ax logo"
        />
      </LocaleLink>
    </div>
  );
}, isEqual);

export default Logo;
export type { Variant } from './types';

const getSrc = (variant: Variant) => {
  switch (variant) {
    case 'no-shadow-and-text': {
      return logoNoShadowAndText;
    }

    case 'no-text': {
      return logoNoText;
    }

    default:
    case 'text': {
      return logo;
    }
  }
};
