import React from 'react';
import useTranslation from '~hooks/i18n/use-translation';

import type { Translate } from './types';

type Props = { children: (t: Translate) => JSX.Element };

const Translation = React.memo(
  ({ children }: Props) => {
    const { t } = useTranslation();
    return children(t);
  },
);

export default Translation;
export * from './types';
