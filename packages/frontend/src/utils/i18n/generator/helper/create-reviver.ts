import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

import getHyphen from './get-hypen';

type Reviver = (key: string, value: unknown) => unknown;

export default (
  async function createReviver(yamlPath: string, locale: string): Promise<Reviver> {
    const { hyphenateSync } = await getHyphen(locale);

    return function reviver(key: string, value: unknown): unknown {
      if (typeof value === 'object' && value !== null) {
        if ('ref' in value) {
          const refRelativePath = (value as Record<string, string>).ref as string;
          const refPath = path.join(yamlPath, locale, refRelativePath);
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
