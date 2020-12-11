/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useMemo } from "react";

import { useLanguageMenu } from "~components/I18n/hooks";
import { useFrontPageMenu } from "~pages/index";
import { useEventMenu } from "~pages/join";

export const useMenuItems = () => {
  const menuLanguage = useLanguageMenu();
  const menuFrontPage = useFrontPageMenu();
  const menuEvent = useEventMenu();

  const items = useMemo(
    () => [...menuFrontPage, ...menuLanguage, ...menuEvent],
    [menuLanguage, menuFrontPage, menuEvent]
  );

  return items;
};
