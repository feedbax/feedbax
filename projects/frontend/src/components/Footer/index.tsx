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

        <LocaleLink to="/legal/privacy-policy" className="links">
          {t('generic', 'footer')}
        </LocaleLink>
      </div>
    );
  },
);

export default Footer;
