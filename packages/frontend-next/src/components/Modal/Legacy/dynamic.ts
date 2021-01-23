import dynamic from 'next/dynamic';

const ModalComponent = dynamic(
  () => import('./index'),
  { ssr: false },
);

export default ModalComponent;
