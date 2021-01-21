import { memo, forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';
import { useFela } from 'react-fela';

import type { IStyle } from 'fela';

const CLink = forwardRef<HTMLAnchorElement, CLinkProps>(
  (props: CLinkProps, ref) => (
    /* eslint-disable jsx-a11y/anchor-has-content */
    /* eslint-disable react/jsx-props-no-spreading */
    <a {...props} ref={ref} />
    /* eslint-enable jsx-a11y/anchor-has-content */
    /* eslint-enable react/jsx-props-no-spreading */
  ),
);

export default memo(
  function StyledLink (props: StyledLinkProps): JSX.Element {
    const { customRule, children, ...rest } = props;
    const { css } = useFela();

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Link {...rest} passHref>
        <CLink className={css(customRule)}>
          {children}
        </CLink>
      </Link>
    );
  },
);

type CLinkProps = {
  children: string | string[];
  className: string;
};

type StyledLinkProps = (
  LinkProps & {
    href: string;
    children: string | string[];
    customRule: IStyle;
  }
);
