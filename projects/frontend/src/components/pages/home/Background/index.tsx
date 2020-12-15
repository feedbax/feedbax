/** @jsx jsx */

import React from 'react';

import { jsx } from '@emotion/react';
import { stylesBackround } from './styles';

const Background = React.memo(
  () => (
    <div css={stylesBackround}>
      <div className="img top" />
      <div className="img bot" />
    </div>
  ),
);

export default Background;
