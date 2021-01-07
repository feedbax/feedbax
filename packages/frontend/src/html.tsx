import React from 'react';

const polyfillFeatures = [
  'Array.from',
  'Array.isArray',
  'Array.of',
  'Array.prototype.copyWithin',
  'Array.prototype.entries',
  'Array.prototype.every',
  'Array.prototype.filter',
  'Array.prototype.find',
  'Array.prototype.findIndex',
  'Array.prototype.forEach',
  'Array.prototype.includes',
  'Array.prototype.indexOf',
  'Array.prototype.keys',
  'Array.prototype.lastIndexOf',
  'Array.prototype.map',
  'Array.prototype.reduce',
  'Array.prototype.some',
  'Array.prototype.sort',
  'Array.prototype.values',
  'ArrayBuffer',
  'Blob',
  'console',
  'DataView',
  'Date.now',
  'document',
  'Float32Array',
  'Float64Array',
  'Function.prototype.bind',
  'globalThis',
  'JSON',
  'Map',
  'Math.cosh',
  'Math.sinh',
  'modernizr:es5object',
  'modernizr:es6string',
  'Number.isFinite',
  'Number.isInteger',
  'Object.assign',
  'Object.entries',
  'Object.freeze',
  'Object.getOwnPropertyDescriptors',
  'Object.getOwnPropertySymbols',
  'Object.is',
  'Object.isExtensible',
  'Object.isFrozen',
  'Object.preventExtensions',
  'Object.setPrototypeOf',
  'Promise',
  'Promise.prototype.finally',
  'Reflect',
  'Reflect.construct',
  'Reflect.defineProperty',
  'Reflect.getOwnPropertyDescriptor',
  'Reflect.ownKeys',
  'Reflect.set',
  'RegExp.prototype.flags',
  'requestAnimationFrame',
  'ResizeObserver',
  'Set',
  'String.fromCodePoint',
  'String.prototype.padStart',
  'String.prototype.trim',
  'String.prototype.trimEnd',
  'String.prototype.trimStart',
  'Symbol',
  'Symbol.asyncIterator',
  'Symbol.for',
  'Symbol.iterator',
  'Symbol.prototype.description',
  'Symbol.toStringTag',
  'Uint8Array',
  'URL',
  'URLSearchParams',
  'WeakMap',
  'WeakSet',
  'XMLHttpRequest',
];

export default function HTML (props: Props): JSX.Element {
  const { htmlAttributes, bodyAttributes } = props;
  const { headComponents, preBodyComponents, postBodyComponents } = props;
  const { body } = props;

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    /* eslint-disable react/no-danger */
    /* eslint-disable jsx-a11y/html-has-lang */
    <html {...htmlAttributes} current-theme="default">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, shrink-to-fit=no" />

        <script src={`https://polyfill.io/v3/polyfill.min.js?version=3.53.1&features=${polyfillFeatures.join(',')}`} />

        {headComponents}
      </head>

      <body {...bodyAttributes}>
        {preBodyComponents}

        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        {postBodyComponents}
      </body>
    </html>
    /* eslint-enable jsx-a11y/html-has-lang */
    /* eslint-enable react/jsx-props-no-spreading */
    /* eslint-enable react/no-danger */
  );
}

type Props = {
  htmlAttributes: Record<string, unknown>;
  headComponents: Array<unknown>;
  bodyAttributes: Record<string, unknown>;
  preBodyComponents: Array<unknown>;
  body: string;
  postBodyComponents: Array<unknown>;
};
