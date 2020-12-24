import React, { useMemo } from 'react';

import useTranslation from '~hooks/components/I18n/use-translation';
import useLocation from '~hooks/components/I18n/use-location';

import LocaleLink from '~components/I18n/LocaleLink';

import type { MenuItem } from '~components/Menu';

type Props = {
  children: string;
  locale: string;
};

const Language = React.memo(
  (props: Props) => {
    const { locale, children } = props;
    const pathname = useLocation();

    return (
      <LocaleLink
        to={pathname}
        locale={locale}
        tabIndex={-1}
      >
        {children}
      </LocaleLink>
    );
  },
);

const useLanguageMenu = (): MenuItem[] => {
  const translation = useTranslation();

  const { t, locale, locales } = translation;
  const $locales = locales.filter(($locale) => $locale !== locale);

  const menuItems = useMemo(
    () => [
      {
        key: 'change-locale',
        content: t('menu', 'change_locale'),

        items: $locales.map((_locale) => ({
          key: `change-locale-${_locale}`,
          content: (
            <Language key={_locale} locale={_locale}>
              {t('generic', 'locales', _locale as 'de')}
            </Language>
          ),
        })),
      },
    ],

    [$locales, t],
  );

  return menuItems;
};

export default useLanguageMenu;
