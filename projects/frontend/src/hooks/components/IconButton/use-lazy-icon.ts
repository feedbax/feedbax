import { useEffect, useRef, useState } from 'react';

import { Icons, Variants } from '~components/IconButton/types';
import { NoSvg, getIcon } from '~components/IconButton/const';

import type { IconState } from '~components/IconButton/types';

type UseLazyIconProps = { icon: Icons, variant?: Variants };
type UseLazyIcon = (props: UseLazyIconProps) => IconState;

const useLazyIcon: UseLazyIcon = (
  ({ icon, variant = Variants.None }) => {
    const [IconLazy, setIconLazy] = useState<IconState>({ Component: NoSvg });
    const $setIconLazy = useRef(setIconLazy);

    // eslint-disable-next-line arrow-body-style
    useEffect(() => {
      return function unmount () {
        $setIconLazy.current = () => ({});
      };
    }, []);

    useEffect(() => {
      getIcon(icon, variant)
        .then(
          ($icon) => $setIconLazy.current({
            Component: $icon.default,
          }),
        );
    }, [icon, variant]);

    return IconLazy;
  }
);

export default useLazyIcon;
