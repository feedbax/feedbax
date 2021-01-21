import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

import type { HyphenationFunctionSync } from 'hyphen';

const getHypen = (
  async (locale?: string): Promise<Hyphenate> => {
    switch (locale) {
      case 'de': {
        return import('hyphen/de');
      }

      case 'en': {
        return import('hyphen/en');
      }

      default: {
        return {
          hyphenateSync: (text) => text,
          hyphenateHTMLSync: (text) => text,
        };
      }
    }
  }
);

export const createReviver = (
  async (yamlPath: string, locale?: string): Promise<Reviver> => {
    const { hyphenateSync } = await getHypen(locale);

    return function reviver (key: string, value: unknown): unknown {
      if (typeof value === 'object' && value !== null) {
        if ('ref' in value) {
          const refRelativePath = (value as Record<string, string>).ref as string;
          const refPath = path.join(yamlPath, refRelativePath);
          const refContent = fs.readFileSync(refPath, { encoding: 'utf-8' });
          const refParsed = YAML.parse(refContent, reviver, {});

          const { ref: _, ...rest } = value as Record<string, string>;

          return {
            ...rest,
            ...refParsed,
          };
        }
      }

      if (typeof value === 'string' && key !== 'ref') {
        return hyphenateSync(value);
      }

      return value;
    };
  }
);

type Hyphenate = {
  hyphenateSync: HyphenationFunctionSync;
  hyphenateHTMLSync: HyphenationFunctionSync;
}

type Reviver = (key: string, value: unknown) => unknown;
