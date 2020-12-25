import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import type { ConsentComponent } from './types';

const Nothing: ConsentComponent = React.memo(() => <></>);

const CookieConsent = React.memo(
  () => {
    const [showConsent, setShowConsent] = useState(false);
    const [render, setRender] = useState({ Component: Nothing });

    useEffect(() => {
      const consentAccepted = Cookies.get('consent-accepted');

      if (typeof consentAccepted === 'undefined') {
        import('./Consent')
          .then(({ default: Consent }) => {
            setRender({ Component: Consent });
          });
      }
    }, []);

    return (
      <render.Component
        show={showConsent}
        mounted={() => setShowConsent(true)}

        onAgree={() => {
          Cookies.set('consent-accepted', '1', { expires: 365 });
          setShowConsent(false);
        }}
      />
    );
  },
);

export default CookieConsent;
