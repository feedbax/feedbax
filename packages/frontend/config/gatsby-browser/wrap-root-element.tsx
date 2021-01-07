import React from 'react';

import { RendererProvider } from 'react-fela';
import { renderer } from '~themes';

import type { WrapRootElementBrowserArgs } from 'gatsby';

export default (
  function wrapRootElement (props: WrapRootElementBrowserArgs): JSX.Element {
    const { element } = props;

    return (
      <RendererProvider renderer={renderer}>
        {element}
      </RendererProvider>
    );
  }
);
