import { memo } from 'react';
import { useEffect } from 'react';

export default memo(
  function LazyFontLoader(): null {
    useEffect(
      function mounted() {
        const fixViewportUnits = () => {
          const vh = (window.innerHeight - 1) * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        window.addEventListener('resize', fixViewportUnits);
        fixViewportUnits();

        return () => window.removeEventListener('resize', fixViewportUnits);
      },

      [],
    );

    return null;
  },
);
