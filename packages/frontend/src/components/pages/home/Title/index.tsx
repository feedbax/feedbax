import React from 'react';

import { useFela } from 'react-fela';
import { rules } from './styles';

const Title = React.memo(
  () => {
    const { css } = useFela();

    return (
      <div className={css(rules.title)}>
        feedb.ax
      </div>
    );
  },
);

export default Title;
