import React from 'react';
import useTranslation from '~hooks/components/I18n/use-translation';

import { useFela } from 'react-fela';
import { rules } from './styles';

const SeeMore = React.memo(
  () => {
    const { t } = useTranslation();
    const { css } = useFela();

    return (
      <div className={css(rules.container)}>
        <span className={css(rules.text)}>
          {t('home', 'see_more')}
        </span>

        <div className={css(rules.arrow)} />
      </div>
    );
  },
);

export default SeeMore;
