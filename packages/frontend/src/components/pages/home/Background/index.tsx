import React from 'react';
import loadable from '@loadable/component';

import { useFela } from 'react-fela';
import { rules } from './styles';

const ImageTop = loadable(() => import('~assets/images/top.inline.svg'));
const ImageBottom = loadable(() => import('~assets/images/bot.inline.svg'));

const Background = React.memo(
  () => {
    const { css } = useFela();

    return (
      <div className={css(rules.background)}>
        <div className={css(rules.image, rules.top)}>
          <ImageTop />
        </div>

        <div className={css(rules.image, rules.bottom)}>
          <ImageBottom />
        </div>
      </div>
    );
  },
);

export default Background;
