import dynamic from 'next/dynamic';

const CookieConsent = dynamic(
  () => import('@/components/CookieConsent'),
  { ssr: false },
);

export default CookieConsent;
