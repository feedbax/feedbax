/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';
import isEqual from 'lodash.isequal';

import { jsx } from '@emotion/react';
import { stylesIcon } from './styles';
import { cssVar } from '~lib/css-helper';
import { getIcon } from './const';

import type { IconProps } from './types';

const Icon = React.memo(
  (props: IconProps) => {
    const { icon, variant } = props;
    const { color = {} } = props;

    const IconComponent = getIcon(icon, variant);

    return (
      <IconComponent
        css={stylesIcon}
        fill={cssVar(color.icon ?? '--color-primary-text')}
      />
    );
  }, isEqual,
);

export default Icon;
export * from './types';
