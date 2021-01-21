import React from 'react';
import { TranslationProvider } from './context';

type Props = {
  locale: string;
  locales: string[];
  translation: Translation;
};

export const provideTranslation = (
  (WrappedComponent: React.ComponentType): React.ComponentClass<Props> => (
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
