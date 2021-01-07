import { createRule } from '~lib/css-helper';
import renderer from './renderer';

renderer.renderStatic(
  createRule({
    position: 'relative',
    margin: 0,

    width: '100%',
    height: '100vh;calc(var(--vh, 1vh) * 100);',

    touchAction: 'pan-y',
    fontSize: '100%',
    hyphens: 'none',
  }),

  'html, body, #___gatsby',
);

renderer.renderStatic(
  createRule({
    height: '1em',
    width: '1em',
    margin: '0 0.05em 0 0.1em',
    verticalAlign: '-0.1em',
  }),

  'img.emoji',
);

renderer.renderStatic(
  createRule({
    WebkitTapHighlightColor: 'rgba(255, 255, 255, 0)',
    WebkitOverflowScrolling: 'touch',
  }),

  '*',
);

renderer.renderStatic(
  createRule({
    outline: '#ffda73 auto 2px',
    outlineOffset: '8px',
  }),

  '*:focus',
);

renderer.renderStatic(
  createRule({
    outline: 'none',
  }),

  '*:focus:not(.focus-visible)',
);
