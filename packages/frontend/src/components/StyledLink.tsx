import { memo, forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';

import type { Interpolation, Theme } from '@emotion/react';

const CLink = forwardRef<HTMLAnchorElement, CLinkProps>(
  ({ ccss, ...props }: CLinkProps, ref) => (
    /* eslint-disable jsx-a11y/anchor-has-content */
    /* eslint-disable react/jsx-props-no-spreading */
    <a {...props} css={ccss} ref={ref} />
    /* eslint-enable jsx-a11y/anchor-has-content */
    /* eslint-enable react/jsx-props-no-spreading */
  ),
);

export default memo(
  function StyledLink(props: StyledLinkProps): JSX.Element {
    const { ccss: css = {}, children, ...rest } = props;

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Link {...rest} passHref>
        <CLink ccss={css}>
          {children}
        </CLink>
      </Link>
    );
  },
);

type CLinkProps = {
  children: React.ReactNode;
  ccss?: Interpolation<Theme>;
};

type StyledLinkProps = (
  LinkProps & {
    href: string;
    children: React.ReactNode;
    ccss?: Interpolation<Theme>;
  }
);
