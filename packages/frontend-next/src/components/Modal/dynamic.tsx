import dynamic from 'next/dynamic';

const Modal = dynamic(
  () => import('@/components/Modal'),
);

export default Modal;
