/** @jsx jsx */

import React from 'react';
import useTranslation from '~hooks/components/I18n/use-translation';

import { jsx } from '@emotion/react';
import { stylesFooter } from './styles';

import LocaleLink from '~components/I18n/LocaleLink';

const Footer = React.memo(
  () => {
    const { t } = useTranslation();

    return (
      <div css={stylesFooter}>
        <div className="title">feedb.ax</div>
        <div className="copy">&copy; 2019 - 2020 feedb.ax by 365STEPS</div>

        <LocaleLink to="/legal/privacy-policy" className="link">
          {t('generic', 'footer', 'privacy_policy')}
          {' & '}
          {t('generic', 'footer', 'imprint')}
        </LocaleLink>

        <LocaleLink to="/legal/disclaimer" className="link">
          {t('generic', 'footer', 'disclaimer')}
        </LocaleLink>
      </div>
    );
  },
);

export default Footer;
