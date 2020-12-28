/** @jsx jsx */

import React from 'react';
import loadable from '@loadable/component';

import { jsx } from '@emotion/react';
import { stylesBackround } from './styles';

const ImageTop = loadable(() => import('~assets/images/top.inline.svg'));
const ImageBottom = loadable(() => import('~assets/images/bot.inline.svg'));

const Background = React.memo(
  () => (
    <div css={stylesBackround}>
      <div className="img top">
        <ImageTop />
      </div>

      <div className="img bot">
        <ImageBottom />
      </div>
    </div>
  ),
);

export default Background;
