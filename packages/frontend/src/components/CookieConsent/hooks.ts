import { useEffect, useState } from 'react';
import cookies from 'js-cookie';

function useUnmount(onUnmount: () => void) {
  useEffect(() => onUnmount, []);
}

export function useScrollLock(lock: boolean) {
  useUnmount(() => {
    const html = document.querySelector<HTMLElement>('html');
    html?.classList.remove('disable-scroll');
  });

  useEffect(
    function showModalToggled() {
      const html = document.querySelector<HTMLElement>('html');

      if (lock) {
        html?.classList.add('disable-scroll');
      } else {
        html?.classList.remove('disable-scroll');
      }
    },

    [lock],
  );
}

export function useModalVisibility(): [boolean, (show: boolean) => void] {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const cookieConsentAccepted = cookies.get('consent-accepted');
    const hasConsetAccepted = typeof cookieConsentAccepted !== 'undefined';

    setShowModal(!hasConsetAccepted);
  }, []);

  return [showModal, setShowModal];
}
