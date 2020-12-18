/** @jsx jsx */

import React from 'react';
import useTranslation from '~hooks/components/I18n/use-translation';

import { jsx } from '@emotion/react';
import { stylesSeeMore } from './styles';

const SeeMore = React.memo(
  () => {
    const { t } = useTranslation();

    return (
      <div css={stylesSeeMore}>
        <span>
          {t('home', 'see_more')}
        </span>

        <div />
      </div>
    );
  },
);

export default SeeMore;
