import merge from 'lodash.merge';
import { createRule } from '~lib/css-helper';
import { FelaRule } from '~lib/css-helper/fela';
import { IconProps } from './types';

export const rules = {
  icon: (
    ({ customRule }: Partial<IconProps>): FelaRule => (
      merge(
        createRule({
          width: '1em',
          height: '1em',
        }),

        customRule,
      )
    )
  ),
};
