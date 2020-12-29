/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';
import isEqual from 'lodash.isequal';

import LocaleLink from '~components/I18n/LocaleLink';
import Icon from '~components/Icon';

import { jsx, css } from '@emotion/react';
import { getStyles } from './styles';

import type { IconButtonProps } from './types';

const IconButton = React.memo(
  (props: IconButtonProps) => {
    const { ariaLabel } = props;

    const { icon, variant } = props;
    const { styles = {} } = props;
    const { color = {} } = props;

    const { to, onClick } = props;
    const $styles = [getStyles(props), css(styles)];

    const { setFocus = false } = props;
    const $setFocus = (el: HTMLElement | null) => setFocus && el?.focus();

    const _Icon = (
      <Icon
        icon={icon}
        variant={variant}
        color={color}
      />
    );

    if (to) {
      return (
        <LocaleLink
          to={to}
          css={$styles}
          ref={$setFocus}
          aria-label={ariaLabel}
        >
          {_Icon}
        </LocaleLink>
      );
    }

    if (onClick) {
      return (
        <button
          type="button"
          css={$styles}
          ref={$setFocus}
          aria-label={ariaLabel}

          onClick={onClick}
          onMouseUp={(e) => e.currentTarget.blur()}
        >
          {_Icon}
        </button>
      );
    }

    return (
      <button
        type="button"
        css={$styles}
        ref={$setFocus}
        aria-label={ariaLabel}
      >
        {_Icon}
      </button>
    );
  }, isEqual,
);

export default IconButton;

export * from './types';
export { Icons, Variants } from '~components/Icon';
