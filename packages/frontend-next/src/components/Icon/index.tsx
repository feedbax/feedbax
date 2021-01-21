import { memo } from 'react';

import { useFela } from 'react-fela';
import { cssVar } from '@/styles/helper';
import { rules } from '@/styles/components/Icon';

import getIcon from './get-icon';

import type { IconProps } from './types';

export default memo(
  function Icon (props: IconProps): JSX.Element {
    const { icon, variant } = props;
    const { color = {} } = props;
    const { customRule = {} } = props;

    const { css } = useFela();
    const SvgIcon = getIcon(icon, variant);

    return (
      <SvgIcon
        className={css(rules.icon, customRule)}
        fill={cssVar(color.icon ?? '--color-primary-text')}
      />
    );
  },
);

export * from './types';
