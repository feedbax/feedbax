import { memo } from 'react';
import { useFela } from 'react-fela';
import { rules } from '@/styles/components/CookieConsent';

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
  ({ onAction, label }: ButtonProps) => {
    const { css } = useFela();

    return (
      <span
        className={css(rules.button)}

        onClick={onAction}
        onKeyPress={onAction}

        role="button"
        tabIndex={0}
      >
        {label}
      </span>
    );
  },
);
