import { install } from 'resize-observer';

import 'focus-visible';
import 'intersection-observer';

const fixViewportUnits = () => {
  const vh = window.innerHeight * 0.01;
  const vw = window.innerWidth * 0.01;

  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--vw', `${vw}px`);
};

window.addEventListener('resize', fixViewportUnits);

install();
fixViewportUnits();
