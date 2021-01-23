import { createContext } from 'react';
import type { ModalProps } from './Component';

export const CreateModalContext = (
  createContext<ICreateModalContext>({
    createModal: () => ({
      update: () => { /**/ },
      destroy: () => { /**/ },
    }),
  })
);

export const ConsumeModalContext = (
  createContext<IConsumeModalContext>({
    modals: {},
  })
);

export type ModalRef = {
  update: (newProps: ModalProps) => void;
  destroy: () => void;
}

export type CreateModal = (props: ModalProps) => ModalRef;

export type ICreateModalContext = {
  createModal: CreateModal;
};

export type IConsumeModalContext = {
  modals: Record<string, ModalProps>;
};
