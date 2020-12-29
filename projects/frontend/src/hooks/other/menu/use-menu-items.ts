import { useMemo } from 'react';

import useLanguageMenu from '~hooks/components/I18n/use-language-menu';
import useHomeMenu from '~hooks/pages/home/use-home-menu';
import useEventMenu from '~hooks/pages/event/use-event-menu';

import type { MenuItem } from '~components/Menu';

const useMenuItems = (): MenuItem[] => {
  const menuLanguage = useLanguageMenu();
  const menuHome = useHomeMenu();
  const menuEvent = useEventMenu();

  const items = useMemo(
    () => [...menuHome, ...menuEvent, ...menuLanguage],
    [menuLanguage, menuHome, menuEvent],
  );

  return items;
};

export default useMenuItems;
