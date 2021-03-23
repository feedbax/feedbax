import dynamic from 'next/dynamic';

const ModalWrapper = dynamic(
  () => import('@/components/Modal/Wrapper'),
  { ssr: false },
);

export default ModalWrapper;
