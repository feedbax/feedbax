import React from 'react';
import Translation from '~components/I18n/Translation';

// eslint-disable-next-line import/prefer-default-export
export const benefits = [
  {
    image: 'benefit_1',
    text: {
      align: 'center',
      content: (
        <Translation>
          {(t) => <>{t('home', 'benefit-1')}</>}
        </Translation>
      ),
    },
  },

  {
    image: 'benefit_2',
    text: {
      align: 'center',
      content: (
        <Translation>
          {(t) => <>{t('home', 'benefit-2')}</>}
        </Translation>
      ),
    },
  },

  {
    image: 'benefit_3',
    text: {
      align: 'center',
      content: (
        <Translation>
          {(t) => <>{t('home', 'benefit-3')}</>}
        </Translation>
      ),
    },
  },

  {
    image: 'benefit_4',
    text: {
      align: 'left',
      content: (
        <Translation>
          {(t) => (
            <>
              {t('home', 'benefit-4', 'title')}

              <small>
                <ul>
                  <li>{t('home', 'benefit-4', 'content-1')}</li>
                  <li>{t('home', 'benefit-4', 'content-2')}</li>
                </ul>
              </small>
            </>
          )}
        </Translation>
      ),
    },
  },

  {
    image: 'benefit_5',
    text: {
      align: 'left',
      content: (
        <Translation>
          {(t) => (
            <>
              {t('home', 'benefit-5', 'title')}
              <small>{t('home', 'benefit-5', 'content-1')}</small>
              <code>{t('home', 'benefit-5', 'content-2')}</code>
            </>
          )}
        </Translation>
      ),
    },
  },

  {
    image: 'benefit_6',
    text: {
      align: 'left',
      content: (
        <Translation>
          {(t) => (
            <>
              {t('home', 'benefit-6', 'title')}
              <small>{t('home', 'benefit-6', 'content-1')}</small>
            </>
          )}
        </Translation>
      ),
    },
  },
] as const;
