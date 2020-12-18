import { dereference } from 'json-schema-ref-parser';
import type { CreateNodeArgs } from 'gatsby';

const createTranslationNode = (
  async (props: CreateNodeArgs): Promise<void> => {
    const { node, actions, createContentDigest } = props;
    const { createNode } = actions;

    if (node.internal.type !== 'File') return;
    if (node.sourceInstanceName !== 'locales') return;
    if (node.base !== 'translations.json') return;
    if (node.relativeDirectory === 'generic') return;

    const locale = node.relativeDirectory;
    const data = await dereference(node.absolutePath as string);

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
