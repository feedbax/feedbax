import React, { useMemo } from 'react';
import LocaleLink from '~components/I18n/LocaleLink';
import useTranslation from '~hooks/components/I18n/use-translation';

import type { MenuItem } from '~components/Menu';

const useEventMenu = (): MenuItem[] => {
  const { location, t } = useTranslation();

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

  if (location.path === '/@') {
    return menuItems;
  }

  return [];
};

export default useEventMenu;
