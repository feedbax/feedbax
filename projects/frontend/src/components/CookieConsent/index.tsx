import React, { useEffect, useState } from 'react';

import loadable from '@loadable/component';
import cookies from 'js-cookie';

const Consent = loadable(() => import('./Consent'));

const CookieConsent = React.memo(
  () => {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
      const consentAccepted = cookies.get('consent-accepted');

      if (typeof consentAccepted === 'undefined') {
        setShowConsent(true);
      }
    }, []);

    return (
      <Consent
        show={showConsent}
        onAgree={() => {
          cookies.set('consent-accepted', '1', { expires: 365 });
          setShowConsent(false);
        }}
      />
    );
  },
);

export default CookieConsent;
