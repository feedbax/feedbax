import React, { useMemo } from 'react';

import useTranslation from '~hooks/components/I18n/use-translation';
import LocaleLink from '~components/I18n/LocaleLink';

import type { Location } from '~components/I18n/types';
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
  locale: string;
};

const Language = React.memo((props: Props) => {
  const { locale, children } = props;
  const { location } = props;

  const path = parameterizedPath(location);

  return (
    <LocaleLink
      to={path}
      locale={locale}
      tabIndex={-1}
    >
      {children}
    </LocaleLink>
  );
});

const useLanguageMenu = (): MenuItem[] => {
  const translation = useTranslation();

  const { locale, locales } = translation;
  const { location, t } = translation;

  const $locales = locales.filter(($locale) => $locale !== locale);

  const menuItems = useMemo(
    () => [
      {
        key: 'change-locale',
        content: t('menu', 'change_locale'),

        items: $locales.map((_locale) => ({
          key: `change-locale-${_locale}`,
          content: (
            <Language key={_locale} locale={_locale} location={location}>
              {t('generic', 'locales', _locale as 'de')}
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
