import { useMemo } from 'react';

import useLanguageMenu from '~hooks/i18n/use-language-menu';
import useHomeMenu from '~hooks/home/use-home-menu';
import useEventMenu from '~hooks/event/use-event-menu';

import type { MenuItem } from '~components/Menu';

const useMenuItems = (): MenuItem[] => {
  const menuLanguage = useLanguageMenu();
  const menuHome = useHomeMenu();
  const menuEvent = useEventMenu();

  const items = useMemo(
    () => [...menuHome, ...menuLanguage, ...menuEvent],
    [menuLanguage, menuHome, menuEvent],
  );

  return items;
};

export default useMenuItems;
