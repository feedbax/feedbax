import type { IStyle } from 'fela';

let check: (style: IStyle, type: string) => Promise<void>;

if (process.env.NODE_ENV === 'development') {
  const cssPromise = import('css-shorthand-properties');
  const isStylePromise = import('./shared');

  check = (
    async (style: IStyle, type: string): Promise<void> => {
      if (process.env.NODE_ENV !== 'production') {
        if (type !== 'RULE') return;

        const { default: css } = await cssPromise;
        const { isStyle } = await isStylePromise;

        const $styleEntries = Object.entries(style);

        for (let i = 0; i < $styleEntries.length; i += 1) {
          const [prop, value] = $styleEntries[i];

          if (css.isShorthand(prop) && process.browser) {
            /* eslint-disable no-console */
            console.groupCollapsed(`css shorthand found '${prop}': '${value}'`);
            console.trace();
            console.groupEnd();
            /* eslint-enable no-console */
          }

          if (isStyle(value)) {
            check(value, type);
          }
        }
      }
    }
  );
}

export default (
  function checkCSSShorthand (style: IStyle, type: string): IStyle {
    if (check) check(style, type);
    return style;
  }
);
