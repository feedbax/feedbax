import React, { useMemo } from 'react';

import useTranslation from '~hooks/components/I18n/use-translation';
import useLocation from '~hooks/components/I18n/use-location';

import LocaleLink from '~components/I18n/LocaleLink';

import type { MenuItem } from '~components/Menu';

const useHomeMenu = (): MenuItem[] => {
  const pathname = useLocation();
  const { t } = useTranslation();

  const menuItems = useMemo(
    () => [
      {
        key: 'login',
        content: (
          <LocaleLink to="/login" tabIndex={-1}>
            {t('menu', 'login')}
          </LocaleLink>
        ),
      },
      {
        key: 'register',
        content: (
          <LocaleLink to="/register" tabIndex={-1}>
            {t('menu', 'register')}
          </LocaleLink>
        ),
      },
    ],
    [t],
  );

  if (pathname === '/') {
    return menuItems;
  }

  return [];
};

export default useHomeMenu;
