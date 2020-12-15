/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useEffect, useState } from 'react';
import isEqual from 'lodash.isequal';

import LocaleLink from '~components/I18n/LocaleLink';

import { jsx, css } from '@emotion/react';
import { colors } from '~theme';
import { getStyles } from './styles';

import { NoSvg, defaultColors, getIcon } from './const';

import type { IconButtonProps, IconState } from './types';

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

    const [IconLazy, setIconLazy] = useState<IconState>({ Component: NoSvg });
    const Icon = <IconLazy.Component fill={colors[color.icon ?? defaultColors.icon]} />;

    useEffect(() => {
      // TODO: handle unmount
      getIcon(icon, variant)
        .then(($icon) => setIconLazy({ Component: $icon.default }));
    }, [icon, variant]);

    if (to) {
      return (
        <LocaleLink
          to={to}
          css={$styles}
          ref={$setFocus}
          aria-label={ariaLabel}
        >
          {Icon}
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
          {Icon}
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
        {Icon}
      </button>
    );
  }, isEqual,
);

export default IconButton;

export { Icons, Variants } from './types';
export type { IconButtonProps } from './types';
