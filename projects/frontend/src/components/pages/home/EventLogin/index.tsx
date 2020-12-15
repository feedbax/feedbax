/** @jsx jsx */

import React, { useState } from 'react';
import useTranslation from '~hooks/i18n/use-translation';

import { jsx } from '@emotion/react';
import { stylesEventLogin } from './styles';

import LocaleLink from '~components/I18n/LocaleLink';

const EventLogin = React.memo(
  () => {
    const [eventCode, setEventCode] = useState('');
    const { t } = useTranslation();

    return (
      <div css={stylesEventLogin}>
        <input
          className="text"
          type="text"
          placeholder="Event-Code"
          value={eventCode}
          onChange={(e) => setEventCode(e.target.value)}
        />

        <LocaleLink className="button" to={`/@/${eventCode}`}>
          {t('home', 'lets-go')}
        </LocaleLink>
      </div>
    );
  },
);

export default EventLogin;
