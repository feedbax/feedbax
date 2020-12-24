import { install } from 'resize-observer';

import 'focus-visible';
import 'intersection-observer';

const fixVhUnit = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', fixVhUnit);

install();
fixVhUnit();
