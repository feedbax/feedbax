/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'fela' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IStyleExtension extends CSSPropertiesFallback {}

  interface IStylePrimitiveExtension {
    // eslint-disable-next-line camelcase
    _string_array: string[];
    // eslint-disable-next-line camelcase
    _number_array: number[];
  }

  interface IStyleExtension {
    fluidRange?: import('@/styles/helper/fluid-range').FluidRangeObject;
  }
}

declare module 'react-fela' {
  type IRenderer = import('fela').IRenderer;
  type ReactNodes = import('react').ReactNode[];

  type RenderToNodeList = (
    (renderer: IRenderer) => ReactNodes
  );

  declare const _renderToNodeList: RenderToNodeList;
  export const renderToNodeList = _renderToNodeList;
}

declare module 'css-shorthand-properties' {
  type CSSShorthand = { isShorthand: (prop: string) => boolean };
  declare const css: CSSShorthand;

  export default css;
}
