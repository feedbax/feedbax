import React from "react";
import { Link, GatsbyLinkProps } from "gatsby";
import { useTranslation } from "~i18n";
import { defaultLocale } from "~i18n/locales";

type Props<T> = GatsbyLinkProps<T> & { locale?: string };

export default function LocaleLink<T>(props: Props<T>) {
  const { ref, to, ..._rest } = props;
  const { locale: localeProp, ...rest } = _rest;
  const { locale: currentLocale } = useTranslation();
  const locale = localeProp ?? currentLocale ?? defaultLocale;

  const linkLocale = locale === defaultLocale ? '' : `/${locale}`;
  const newTo = `${linkLocale}/${to.replace(/^\//g, '')}`;

  return <Link to={newTo} {...rest} />;
}
