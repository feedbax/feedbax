import React from 'react';

import { Icons, Variants } from './types';
import type { SVGIcon } from './types';

export const defaultColors = {
  icon: 'third',
  background: 'second',
} as const;

export const NoSvg: SVGIcon = () => <svg />;

type GetIcon = (icon: Icons, variant?: Variants) => Promise<typeof import('*.inline.svg')>;

export const getIcon: GetIcon = (
  (icon, variant = Variants.None) => {
    switch (`${icon}_${variant}`) {
      case `${Icons.Exit}_${Variants.None}`:
      case `${Icons.Exit}_${Variants.Filled}`:
      case `${Icons.Exit}_${Variants.Outline}`: {
        return import('~assets/images/icons/exit_app.inline.svg');
      }

      case `${Icons.ArrowBack}_${Variants.None}`:
      case `${Icons.ArrowBack}_${Variants.Filled}`:
      case `${Icons.ArrowBack}_${Variants.Outline}`: {
        return import('~assets/images/icons/arrow_back.inline.svg');
      }

      case `${Icons.Close}_${Variants.None}`:
      case `${Icons.Close}_${Variants.Filled}`:
      case `${Icons.Close}_${Variants.Outline}`: {
        return import('~assets/images/icons/close.inline.svg');
      }

      case `${Icons.Menu}_${Variants.None}`:
      case `${Icons.Menu}_${Variants.Filled}`:
      case `${Icons.Menu}_${Variants.Outline}`: {
        return import('~assets/images/icons/menu.inline.svg');
      }

      case `${Icons.Heart}_${Variants.None}`:
      case `${Icons.Heart}_${Variants.Filled}`: {
        return import('~assets/images/icons/favorite_filled.inline.svg');
      }

      case `${Icons.Heart}_${Variants.Outline}`: {
        return import('~assets/images/icons/favorite_outline.inline.svg');
      }

      case `${Icons.Clock}_${Variants.None}`:
      case `${Icons.Clock}_${Variants.Filled}`: {
        return import('~assets/images/icons/clock_filled.inline.svg');
      }

      case `${Icons.Clock}_${Variants.Outline}`: {
        return import('~assets/images/icons/clock_outline.inline.svg');
      }

      case `${Icons.Person}_${Variants.None}`:
      case `${Icons.Person}_${Variants.Filled}`: {
        return import('~assets/images/icons/person_filled.inline.svg');
      }

      case `${Icons.Person}_${Variants.Outline}`: {
        return import('~assets/images/icons/person_outline.inline.svg');
      }

      default: {
        return import('~assets/images/icons/close.inline.svg');
      }
    }
  }
);
