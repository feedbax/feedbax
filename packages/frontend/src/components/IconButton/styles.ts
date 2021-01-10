import merge from 'lodash.merge';
import { cssVar, fluidRangeFela, createRule } from '~lib/css-helper';

import type { FelaRule } from '~lib/css-helper/fela';
import type { IconButtonProps } from './types';

const DEFAULTS = {
  size: 28,

  get sizeBounds () {
    return {
      min: DEFAULTS.size,
      max: (4 / 3) * DEFAULTS.size,
    };
  },
};

export const rules = {
  button: (
    (props: Partial<IconButtonProps>): FelaRule => {
      const { size = DEFAULTS.size } = props;
      const { sizeBounds = {} } = props;

      const { color = {} } = props;
      const { neumorphism = true } = props;

      const { customRule } = props;

      const sizeMin = (sizeBounds.min ?? size) / 16;
      const sizeMax = (sizeBounds.max ?? 2 * size) / 16;

      const bgColor = cssVar(color.background ?? '--color-feedbax-secondary');

      const shadowXY = Math.round(size * 0.1);
      const shadowBlur = Math.round(size * 0.2);

      const shadow = `${shadowXY}px  ${shadowXY}px ${shadowBlur}px rgba(0, 0, 0, 0.18),
                     -${shadowXY}px -${shadowXY}px ${shadowBlur}px rgba(255, 255, 255, 0.18)`;

      return merge(
        createRule({
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0,
          borderRadius: '50%',

          transitionProperty: 'transform',
          transitionDuration: '0.3s',
          transitionTimingFunction: 'ease',
          transitionDelay: '0s',

          cursor: 'pointer',

          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,

          backgroundColor: bgColor,
          boxShadow: neumorphism ? shadow : undefined,

          fluidRange: fluidRangeFela({
            screen: ['120rem', '240rem'] as const,
            sizes: [[`${sizeMin}rem`, `${sizeMax}rem`]] as const,

            css: ([unit]) => ({
              fontSize: unit,
              width: unit,
              height: unit,
            }),
          }),

          nested: {
            ':hover': {
              opacity: 0.6,
            },

            ':active': {
              opacity: 0.8,
            },
          },
        }),

        customRule,
      );
    }
  ),

  icon: (
    (props: Partial<IconButtonProps>): FelaRule => {
      const { neumorphism = true } = props;
      const sizeSVG = neumorphism ? '0.57em' : '1em';

      return createRule({
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',

        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,

        position: 'relative',
        cursor: 'pointer',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        transitionProperty: 'opacity, transform',
        transitionDuration: '0.3s, 0.3s',
        transitionTimingFunction: 'ease, ease',
        transitionDelay: '0s, 0s',

        width: sizeSVG,
        height: sizeSVG,
      });
    }
  ),
};
