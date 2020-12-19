import { dereference } from 'json-schema-ref-parser';

import type { CreateNodeArgs } from 'gatsby';
import type { JSONSchema } from 'json-schema-ref-parser';

const hyphenateJSONSchema = (
  async (schema: JSONSchema, locale: string) => {
    type Hyphen = typeof import('hyphen/en');
    const { hyphenateSync }: Hyphen = await import(`hyphen/${locale}`);

    return (
      JSON.parse(
        JSON.stringify(schema),
        (_key, value) => {
          if (typeof value === 'string') {
            return hyphenateSync(value);
          }

          return value;
        },
      )
    );
  }
);

const createTranslationNode = (
  async (props: CreateNodeArgs): Promise<void> => {
    const { node, actions, createContentDigest } = props;
    const { createNode } = actions;

    if (node.internal.type !== 'File') return;
    if (node.sourceInstanceName !== 'locales') return;
    if (node.base !== 'translations.json') return;
    if (node.relativeDirectory === 'generic') return;

    const locale = node.relativeDirectory as string;

    const _data = await dereference(node.absolutePath as string);
    const data = await hyphenateJSONSchema(_data, locale);

    createNode({
      id: `translation_${locale}`,
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
