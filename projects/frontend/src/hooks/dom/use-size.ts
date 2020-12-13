import { useLayoutEffect } from 'react';
import { useState, useCallback } from 'react';

import ResizeObserver from 'resize-observer-polyfill';

type Ref = (node: Element | null) => void;
type Dimensions = { width: number; height: number };

const useSize = (
  (type: 'w' | 'h' | 'wh' = 'wh'): readonly [Ref, Dimensions] => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [element, setElement] = useState<Element | null>(null);

    const ref = useCallback((node: Element | null) => setElement(node), []);

    useLayoutEffect(() => {
      const observer = new ResizeObserver(([sizes]) => {
        const { width, height } = sizes.contentRect;

        const xChanged = dimensions.width !== width;
        const yChanged = dimensions.height !== height;
        const bothChanged = xChanged && yChanged;

        if (type === 'w' && xChanged) {
          setDimensions({ width, height: 0 });
        }

        if (type === 'h' && yChanged) {
          setDimensions({ height, width: 0 });
        }

        if (type === 'wh' && bothChanged) {
          setDimensions({ width, height });
        }
      });

      if (element) observer.observe(element);
      return () => observer.disconnect();
    }, [dimensions.height, dimensions.width, element, type]);

    return [ref, dimensions] as const;
  }
);

export default useSize;
