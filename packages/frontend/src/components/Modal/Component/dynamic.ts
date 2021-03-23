import dynamic from 'next/dynamic';

const ModalComponent = dynamic(
  () => import('@/components/Modal/Component'),
  { ssr: false },
);

export default ModalComponent;
