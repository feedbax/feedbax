import type { CreateNodeArgs } from 'gatsby';

const createTranslationFragmentNode = (
  async (props: CreateNodeArgs): Promise<void> => {
    const { node } = props;

    if (node.internal.type !== 'File') return;
    if (node.sourceInstanceName !== 'locales') return;
    if (node.base !== 'translation-fragment.gql') return;
    if (node.relativeDirectory === 'generic') return;

    const { actions, loadNodeContent } = props;
    const { createNode } = actions;

    createNode({
      id: 'translation-fragment.gql',
      parent: node.id,

      internal: {
        contentDigest: node.internal.contentDigest,
        type: 'TranslationFragment',
      },

      fragment: await loadNodeContent(node),
    });
  }
);

export default createTranslationFragmentNode;
