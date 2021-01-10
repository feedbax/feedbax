import React from 'react';
import isEqual from 'lodash.isequal';

import LocaleLink from '~components/I18n/LocaleLink';
import Icon from '~components/Icon';

import { useFela } from 'react-fela';
import { rules } from './styles';

import type { IconButtonProps } from './types';

const IconButton = React.memo(
  (props: IconButtonProps) => {
    const { ariaLabel } = props;
    const { icon, variant } = props;
    const { color = {} } = props;
    const { to, onClick } = props;

    const { css } = useFela(props);
    const className = css(rules.button);

    const { setFocus = false } = props;
    const $setFocus = (el: HTMLElement | null) => setFocus && el?.focus();

    const _Icon = (
      <Icon
        customRule={rules.icon(props)}
        icon={icon}
        variant={variant}
        color={color}
      />
    );

    if (to) {
      return (
        <LocaleLink
          to={to}
          className={className}
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
          className={className}
          ref={$setFocus}
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
        className={className}
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
