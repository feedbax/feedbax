/** @jsx jsx */

import React from 'react';

import { jsx } from '@emotion/react';
import { stylesTitle } from './styles';

const Title = React.memo(
  () => (
    <div css={stylesTitle}>
      feedb.ax
    </div>
  ),
);

export default Title;
