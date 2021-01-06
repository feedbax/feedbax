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
        key: 'create-event',
        content: (
          <LocaleLink to="/@/create" tabIndex={-1}>
            {t('menu', 'create_event')}
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
