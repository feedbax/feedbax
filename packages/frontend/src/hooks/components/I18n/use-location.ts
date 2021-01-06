import { useLocation as _useLocation } from '@reach/router';
import useTranslation from './use-translation';

const useLocation = (
  (): string => {
    const location = _useLocation();
    const { locales } = useTranslation();

    const localeGroups = locales.map((l) => `(^/${l})`);
    const localesRegExp = new RegExp(localeGroups.join('|'), 'g');

    return location.pathname.replace(localesRegExp, '');
  }
);

export default useLocation;
