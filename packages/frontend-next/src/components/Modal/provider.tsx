import { memo, useRef, useState } from 'react';
import { CreateModalContext, ConsumeModalContext } from './context';

import type { CreateModal, IConsumeModalContext } from './context';

export default memo(
  function ModalProvider({ children }: Props): JSX.Element {
    const [modals, setModals] = useState<IConsumeModalContext['modals']>({});

    const createModal = useRef<CreateModal>(
      (props) => {
        setModals((oldModals) => ({
          ...oldModals,
          [props.id]: props,
        }));

        return {
          destroy: () => setModals(
            (oldModals) => {
              const { [props.id]: _delete, ..._modals } = oldModals;
              return _modals;
            },
          ),

          update: (newProps) => setModals(
            (oldModals) => ({
              ...oldModals,
              [props.id]: newProps,
            }),
          ),
        };
      },
    );

    return (
      <CreateModalContext.Provider value={{ createModal: createModal.current }}>
        <ConsumeModalContext.Provider value={{ modals }}>
          {children}
        </ConsumeModalContext.Provider>
      </CreateModalContext.Provider>
    );
  },
);

type Props = { children: React.ReactNode };
