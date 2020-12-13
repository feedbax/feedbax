import { useEffect, useState } from 'react';

const useHorizontalSwipe = (): TouchEvent | undefined => {
  const [pointerEvent, setPointerEvent] = useState<TouchEvent>();

  useEffect(() => {
    const onTouchStart = (eventA: TouchEvent) => {
      if (eventA.touches.length > 1) return;

      const firstTouchA = eventA.touches[0];
      const { pageX: pageXA, pageY: pageYA } = firstTouchA;

      const onTouchMove = (eventB: TouchEvent) => {
        const firstTouchB = eventB.touches[0];
        const { pageX: pageXB, pageY: pageYB } = firstTouchB;

        const deltaX = pageXB - pageXA;
        const deltaY = pageYB - pageYA;

        const deltaXSquared = deltaX * deltaX;
        const deltaYSquared = deltaY * deltaY;

        const distance = Math.sqrt(deltaXSquared + deltaYSquared);

        if (deltaXSquared > deltaYSquared && distance >= 20) {
          setPointerEvent(eventB);
          window.removeEventListener('touchmove', onTouchMove);
        }
      };

      const onTouchEnd = () => {
        setPointerEvent(undefined);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
      };

      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchstart', onTouchStart);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return pointerEvent;
};

export default useHorizontalSwipe;
