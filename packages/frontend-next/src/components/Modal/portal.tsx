import { memo, useEffect } from 'react';
import { useContext, useRef } from 'react';
import { CreateModalContext } from './context';

import type { ModalRef } from './context';
import type { ModalProps } from './Component';

export default memo(
  function Modal (props: ModalProps) {
    const { createModal } = useContext(CreateModalContext);
    const modal = useRef<ModalRef>();

    useEffect(
      function propsChanged () {
        if (typeof createModal === 'undefined') return;

        if (typeof modal.current === 'undefined') {
          modal.current = createModal(props);
        }

        modal.current.update(props);
      },

      [createModal, props],
    );

    useEffect(
      () => (
        function onUnmount () {
          modal.current?.destroy();
        }
      ),

      [],
    );

    return <></>;
  },
);
