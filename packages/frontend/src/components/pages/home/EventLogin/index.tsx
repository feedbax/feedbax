import React, { useState } from 'react';
import useTranslation from '~hooks/components/I18n/use-translation';

import { useFela } from 'react-fela';
import { rules } from './styles';

import LocaleLink from '~components/I18n/LocaleLink';

const EventLogin = React.memo(
  () => {
    const [eventCode, setEventCode] = useState('');

    const { css } = useFela();
    const { t } = useTranslation();

    return (
      <div className={css(rules.eventLogin.container)}>
        <input
          onChange={(e) => setEventCode(e.target.value)}
          className={css(rules.eventLogin.input)}
          placeholder="Event-Code"
          value={eventCode}
          type="text"
        />

        <LocaleLink
          className={css(rules.eventLogin.button)}
          to={`/@/${eventCode}`}
        >
          {t('home', 'lets_go')}
        </LocaleLink>
      </div>
    );
  },
);

export default EventLogin;
