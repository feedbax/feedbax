import React from 'react';

import { useFela } from 'react-fela';
import { ruleTitle } from './styles';

const Title = React.memo(
  () => {
    const { css } = useFela();

    return (
      <div className={css(ruleTitle)}>
        feedb.ax
      </div>
    );
  },
);

export default Title;
