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
      <div className={css(rules.container)}>
        <input
          className={css([rules.shared, rules.input])}
          type="text"

          value={eventCode}
          placeholder="Event-Code"
          onChange={(e) => setEventCode(e.target.value)}
        />

        <LocaleLink
          className={css([rules.shared, rules.button])}
          to={`/@/${eventCode}`}
        >
          {t('home', 'lets_go')}
        </LocaleLink>
      </div>
    );
  },
);

export default EventLogin;
