import { memo, useContext, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';

import Modal from '@/components/Modal/Component/dynamic';
import { ConsumeModalContext } from '@/components/Modal/context';

export default memo(
  function ModalWrapper(): JSX.Element {
    const { modals } = useContext(ConsumeModalContext);
    const modalsArray = useMemo(
      () => Object
        .values(modals)
        .filter((modal) => modal.isOpen),

      [modals],
    );

    return (
      <div id="__modals">
        <AnimatePresence>
          { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
          {modalsArray.map((props) => <Modal key={props.id} {...props} />)}
        </AnimatePresence>
      </div>
    );
  },
);
