import { memo } from 'react';
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default memo(
  function Portal({ children }) {
    const modalRootRef = useRef<HTMLDivElement>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      const modalRoot = document.querySelector<HTMLDivElement>('#__modal');

      if (modalRoot) {
        modalRootRef.current = modalRoot;
        setMounted(true);
      }
    }, []);

    return mounted && modalRootRef.current
      ? createPortal(children, modalRootRef.current)
      : null;
  },
);
