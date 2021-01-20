import React from 'react';
import { TranslationProvider } from './context';

import type { ComponentClass, ComponentType } from 'react';

type Props = {
  locale: string;
  locales: string[];
  translation: Translation;
};

export const provideTranslation = (
  (WrappedComponent: ComponentType): ComponentClass<Props> => (
    // eslint-disable-next-line react/prefer-stateless-function
    class extends React.Component<Props> {
      render () {
        const { translation } = this.props;

        return (
          <TranslationProvider value={translation}>
            { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
            <WrappedComponent {...this.props} />
          </TranslationProvider>
        );
      }
    }
  )
);
