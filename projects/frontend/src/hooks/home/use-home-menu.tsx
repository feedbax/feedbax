import React, { useMemo } from 'react';
import LocaleLink from '~components/I18n/LocaleLink';
import useTranslation from '~hooks/i18n/use-translation';

import type { MenuItem } from '~components/Menu';

const useHomeMenu = (): MenuItem[] => {
  const { location, t } = useTranslation();

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

  if (location.path === '/') {
    return menuItems;
  }

  return [];
};

export default useHomeMenu;
