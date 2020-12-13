import { useMemo } from 'react';

import useLanguageMenu from '~hooks/i18n/use-language-menu';
import useHomeMenu from '~hooks/home/use-home-menu';
import useEventMenu from '~hooks/event/use-event-menu';

import type { MenuItem } from '~components/Menu';

const useMenuItems = (): MenuItem[] => {
  const menuLanguage = useLanguageMenu();
  const menuFrontPage = useHomeMenu();
  const menuEvent = useEventMenu();

  const items = useMemo(
    () => [...menuFrontPage, ...menuLanguage, ...menuEvent],
    [menuLanguage, menuFrontPage, menuEvent],
  );

  return items;
};

export default useMenuItems;
