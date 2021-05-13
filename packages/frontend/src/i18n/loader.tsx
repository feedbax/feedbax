import { memo } from 'react';

import { TranslationProvider } from './context';
import { useTranslationData } from './hooks';

type TranslationLoaderProps = {
  locale?: string;
  children: React.ReactNode;
};

export default memo(
  function TranslationLoader(props: TranslationLoaderProps): JSX.Element {
    const { locale, children } = props;
    const translation = useTranslationData(locale);

    return (
      <TranslationProvider value={translation}>
        {children}
      </TranslationProvider>
    );
  },
);
