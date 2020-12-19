/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';

type Hyphen = {
  [key in keyof React.ReactHTML]: React.ReactHTML[key];
}

const target = {} as Hyphen;

// eslint-disable-next-line import/prefer-default-export
const allowHyphens = new Proxy(target, {
  get (_, Element: keyof React.ReactHTML) {
    return (props: React.HTMLProps<unknown>) => (
      <Element
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}

        css={css`
          hyphens: manual !important;
        `}
      />
    );
  },
});

export default allowHyphens;
