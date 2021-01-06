import React from 'react';

import { RendererProvider } from 'react-fela';
import { createRenderer } from 'fela';

import configRenderer from '~config/fela-renderer';

import type { WrapRootElementBrowserArgs } from 'gatsby';

export default (
  function wrapRootElement (props: WrapRootElementBrowserArgs): JSX.Element {
    const { element } = props;
    const renderer = createRenderer(configRenderer);

    return (
      <RendererProvider renderer={renderer}>
        {element}
      </RendererProvider>
    );
  }
);
