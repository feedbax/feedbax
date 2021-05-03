import { memo } from 'react';
import styles from './styles.module.scss';

import type React from 'react';

type ActionEvent = (
  React.KeyboardEvent<HTMLSpanElement>
  | React.MouseEvent<HTMLSpanElement, MouseEvent>
);

type ButtonProps = {
  onAction: (event: ActionEvent) => void;
  label: string;
};

export default memo(
  ({ onAction, label }: ButtonProps) => (
    <span
      className={styles.button}

      onClick={onAction}
      onKeyPress={onAction}

      role="button"
      tabIndex={0}
    >
      {label}
    </span>
  ),
);
