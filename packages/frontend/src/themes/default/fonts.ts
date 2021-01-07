import renderer from '~themes/renderer';
import type { Fonts } from '~themes/types';

renderer.renderFont(
  'Klinic Slab',
  ['/fonts/KlinicSlab-Bold.woff2', '/fonts/KlinicSlab-Bold.woff'],
  { fontWeight: 'bold', fontStyle: 'normal', fontDisplay: 'swap' },
);

renderer.renderFont(
  'Klinic Slab Book',
  ['/fonts/KlinicSlab-Book.woff2', '/fonts/KlinicSlab-Book.woff'],
  { fontWeight: 'normal', fontStyle: 'normal', fontDisplay: 'swap' },
);

renderer.renderFont(
  'Klinic Slab Book',
  ['/fonts/KlinicSlab-BookItalic.woff2', '/fonts/KlinicSlab-BookItalic.woff'],
  { fontWeight: 'normal', fontStyle: 'italic', fontDisplay: 'swap' },
);

renderer.renderFont(
  'Roboto Slab',
  ['/fonts/RobotoSlab-Bold.woff2', '/fonts/RobotoSlab-Bold.woff'],
  { fontWeight: 'bold', fontStyle: 'normal', fontDisplay: 'swap' },
);

renderer.renderFont(
  'Roboto Slab',
  ['/fonts/RobotoSlab-Regular.woff2', '/fonts/RobotoSlab-Regular.woff'],
  { fontWeight: 'normal', fontStyle: 'normal', fontDisplay: 'swap' },
);

const fonts: Fonts = {
  '--font-feedbax-primary': 'Klinic Slab',
  '--font-feedbax-secondary': 'Roboto Slab',
  '--font-feedbax-tertiary': 'Klinic Slab Book',
};

export default fonts;
