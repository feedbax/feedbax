import { memo } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';
import getIcon from './get-icon';

import type { IconProps } from './types';

export default memo(
  function Icon(props: IconProps): JSX.Element {
    const { icon, variant } = props;
    const { color = {} } = props;
    const { className } = props;

    const classNames = clsx(styles.icon, className);
    const SvgIcon = getIcon(icon, variant);

    return (
      <SvgIcon
        className={classNames}
        fill={`var(--${color.icon ?? 'color-text-primary'})`}
      />
    );
  },
);

export * from './types';
