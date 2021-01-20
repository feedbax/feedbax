import React, { memo, useEffect, useState } from 'react';

import cookies from 'js-cookie';
import Modal from '@/components/Modal/dynamic';

export default memo(
  function CookieConsent () {
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
      const cookieConsentAccepted = cookies.get('consent-accepted');
      const hasConsetAccepted = typeof cookieConsentAccepted !== 'undefined';

      setShowModal(!hasConsetAccepted);
    }, []);

    return (
      <Modal isOpen={showModal}>
        COOKIE-CONSENT
      </Modal>
    );
  },
);
