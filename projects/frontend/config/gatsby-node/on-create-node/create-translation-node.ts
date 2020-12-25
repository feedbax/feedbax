import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

import type { CreateNodeArgs } from 'gatsby';

const createReviver = (
  async (yamlPath: string, locale: string) => {
    type Hyphen = typeof import('hyphen/en');
    const { hyphenateSync }: Hyphen = await import(`hyphen/${locale}`);

    const reviver = (
      (key: string, value: unknown): unknown => {
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
      }
    );

    return reviver;
  }
);

const createTranslationNode = (
  async (props: CreateNodeArgs): Promise<void> => {
    const { node } = props;

    if (node.internal.type !== 'File') return;
    if (node.sourceInstanceName !== 'locales') return;
    if (node.base !== 'translations.yaml') return;
    if (node.relativeDirectory === 'generic') return;

    const { actions } = props;
    const { createNodeId, createContentDigest } = props;
    const { createNode } = actions;

    const yamlPath = node.absolutePath as string;
    const yamlContent = fs.readFileSync(yamlPath, { encoding: 'utf-8' });

    const yamlDir = node.dir as string;
    const locale = node.relativeDirectory as string;
    const reviver = await createReviver(yamlDir, locale);

    const data = YAML.parse(yamlContent, reviver, {});

    createNode({
      id: createNodeId(`translation_${locale}`),
      parent: node.id,

      internal: {
        contentDigest: createContentDigest(data),
        type: 'Translation',
      },

      locale,
      data,
    });
  }
);

export default createTranslationNode;
