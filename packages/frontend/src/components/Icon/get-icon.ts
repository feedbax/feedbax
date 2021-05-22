import dynamic from 'next/dynamic';
import { Icons, Variants } from './types';

import type { SvgIconProps } from './icons/types';

export default (
  function getIcon(icon: Icons, variant?: Variants): React.ComponentType<SvgIconProps> {
    const $variant = variant ?? Variants.None;

    switch (`${icon}_${$variant}`) {
      case `${Icons.Exit}_${Variants.None}`:
      case `${Icons.Exit}_${Variants.Filled}`:
      case `${Icons.Exit}_${Variants.Outline}`: {
        throw new Error('icon not implemented yet');
      }

      case `${Icons.Language}_${Variants.None}`:
      case `${Icons.Language}_${Variants.Filled}`:
      case `${Icons.Language}_${Variants.Outline}`: {
        return dynamic(() => import('./icons/Language'));
      }

      case `${Icons.ArrowBack}_${Variants.None}`:
      case `${Icons.ArrowBack}_${Variants.Filled}`:
      case `${Icons.ArrowBack}_${Variants.Outline}`: {
        return dynamic(() => import('./icons/ArrowBack'));
      }

      case `${Icons.Close}_${Variants.None}`:
      case `${Icons.Close}_${Variants.Filled}`:
      case `${Icons.Close}_${Variants.Outline}`: {
        throw new Error('icon not implemented yet');
      }

      case `${Icons.Menu}_${Variants.None}`:
      case `${Icons.Menu}_${Variants.Filled}`:
      case `${Icons.Menu}_${Variants.Outline}`: {
        throw new Error('icon not implemented yet');
      }

      case `${Icons.Heart}_${Variants.None}`:
      case `${Icons.Heart}_${Variants.Filled}`: {
        throw new Error('icon not implemented yet');
      }

      case `${Icons.Heart}_${Variants.Outline}`: {
        throw new Error('icon not implemented yet');
      }

      case `${Icons.Clock}_${Variants.None}`:
      case `${Icons.Clock}_${Variants.Filled}`: {
        throw new Error('icon not implemented yet');
      }

      case `${Icons.Clock}_${Variants.Outline}`: {
        throw new Error('icon not implemented yet');
      }

      case `${Icons.Person}_${Variants.None}`:
      case `${Icons.Person}_${Variants.Filled}`: {
        throw new Error('icon not implemented yet');
      }

      case `${Icons.Person}_${Variants.Outline}`: {
        throw new Error('icon not implemented yet');
      }

      default: {
        throw new Error(`icon '${icon}-${variant}' doesn't exist`);
      }
    }
  }
);
