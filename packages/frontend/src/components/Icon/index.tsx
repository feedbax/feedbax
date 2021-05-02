import { memo } from 'react';

import { cssVar } from '@/utils/styles/helper';
import * as styles from './styles';

import getIcon from './get-icon';

import type { IconProps } from './types';

export default memo(
  function Icon(props: IconProps): JSX.Element {
    const { icon, variant } = props;
    const { color = {} } = props;
    const { ccss = {} } = props;

    const SvgIcon = getIcon(icon, variant);

    return (
      <SvgIcon
        css={[styles.icon, ccss]}
        fill={cssVar(color.icon ?? '--color-text-primary')}
      />
    );
  },
);

export * from './types';
