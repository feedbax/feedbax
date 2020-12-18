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
          {(t) => <>{t('home', 'benefit_1')}</>}
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
          {(t) => <>{t('home', 'benefit_2')}</>}
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
          {(t) => <>{t('home', 'benefit_3')}</>}
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
              {t('home', 'benefit_4', 'title')}

              <small>
                <ul>
                  <li>{t('home', 'benefit_4', 'content_1')}</li>
                  <li>{t('home', 'benefit_4', 'content_2')}</li>
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
              {t('home', 'benefit_5', 'title')}
              <small>{t('home', 'benefit_5', 'content_1')}</small>
              <code>{t('home', 'benefit_5', 'content_2')}</code>
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
              {t('home', 'benefit_6', 'title')}
              <small>{t('home', 'benefit_6', 'content_1')}</small>
            </>
          )}
        </Translation>
      ),
    },
  },
] as const;
