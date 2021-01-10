import React from 'react';
import isEqual from 'lodash.isequal';

import { useFela } from 'react-fela';
import { cssVar } from '~lib/css-helper';
import { rules } from './styles';

import { getIcon } from './const';

import type { IconProps } from './types';

const Icon = React.memo(
  (props: IconProps) => {
    const { icon, variant } = props;
    const { color = {} } = props;
    const { customRule } = props;

    const { css } = useFela({ customRule });
    const className = css(rules.icon);

    const IconComponent = getIcon(icon, variant);

    return (
      <IconComponent
        className={className}
        fill={cssVar(color.icon ?? '--color-primary-text')}
      />
    );
  }, isEqual,
);

export default Icon;
export * from './types';
