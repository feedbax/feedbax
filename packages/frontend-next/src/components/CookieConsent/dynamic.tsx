import dynamic from 'next/dynamic';

const CookieConsent = dynamic(
  () => import('@/components/CookieConsent'),
);

export default CookieConsent;
