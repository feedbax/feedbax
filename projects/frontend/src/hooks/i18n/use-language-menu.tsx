/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useMemo } from 'react';
import { jsx, css } from '@emotion/react';

import useTwemoji from '~hooks/dom/use-twemoji';
import useTranslation from '~hooks/i18n/use-translation';

import { locales } from '~locales';
import LocaleLink from '~components/I18n/LocaleLink';

import type { Location } from '~components/I18n/types';
import type { Locales } from '~locales';

import type { MenuItem } from '~components/Menu';

const parameterizedPath = (location: Location) => {
  const params = Object.entries(location.params);
  const path = location.matchPath ?? location.path;

  let $path = path;

  for (let i = 0; i < params.length; i += 1) {
    const [key, value] = params[i];

    if (typeof value === 'string') {
      $path = $path.replaceAll(new RegExp(`:${key}`, 'gm'), value);
    }
  }

  return $path;
};

type Props = {
  children: string;
  location: Location;
  locale: Locales;
};

const Language = React.memo((props: Props) => {
  const { locale, children } = props;
  const { location } = props;

  const path = parameterizedPath(location);
  const { injectEmojis } = useTwemoji();

  return (
    <LocaleLink to={path} locale={locale} css={stylesEmojis}>
      <div className="text" ref={injectEmojis}>
        {children}
      </div>
      <i className="seperator" />
    </LocaleLink>
  );
});

const useLanguageMenu = (): MenuItem[] => {
  const { locale, location, t } = useTranslation();
  const $locales = locales.filter(($locale) => $locale !== locale);

  const menuItems = useMemo(
    () => [
      {
        key: 'change-locale',
        content: t('menu', 'change-locale'),

        items: $locales.map((_locale) => ({
          key: `change-locale-${_locale}`,
          content: (
            <Language key={_locale} locale={_locale} location={location}>
              {t('locales', _locale)}
            </Language>
          ),
        })),
      },
    ],
    [$locales, location, t],
  );

  return menuItems;
};

export default useLanguageMenu;

const stylesEmojis = css`
  img.emoji {
    vertical-align: middle;
  }
`;
