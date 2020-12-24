import React, { useMemo } from 'react';

import useTranslation from '~hooks/components/I18n/use-translation';
import useLocation from '~hooks/components/I18n/use-location';

import LocaleLink from '~components/I18n/LocaleLink';

import type { MenuItem } from '~components/Menu';

const useEventMenu = (): MenuItem[] => {
  const pathname = useLocation();
  const { t } = useTranslation();

  const menuItems = useMemo(
    () => ([
      {
        key: 'logout',
        content: (
          <LocaleLink to="/" tabIndex={-1}>
            {t('menu', 'logout')}
          </LocaleLink>
        ),
      },
    ]),
    [t],
  );

  if (pathname.startsWith('/@/')) {
    return menuItems;
  }

  return [];
};

export default useEventMenu;
