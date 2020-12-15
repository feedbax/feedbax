import React from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';

import useTranslation from '~hooks/i18n/use-translation';
import { defaultLocale } from '~locales';

type Props<T> = GatsbyLinkProps<T> & { locale?: string };

function $LocaleLink<T> (props: Props<T>) {
  const { ref: _ref, to, ..._rest } = props;

  const { locale: localeProp, ...rest } = _rest;
  const { locale: currentLocale } = useTranslation();

  const locale = localeProp ?? currentLocale ?? defaultLocale;

  const linkLocale = locale === defaultLocale ? '' : `/${locale}`;
  const newTo = `${linkLocale}/${to.replace(/^\//g, '')}`;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Link to={newTo} {...rest} />;
}

const LocaleLink = React.memo($LocaleLink);

export default LocaleLink;
