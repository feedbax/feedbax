import type { CreateNodeArgs, NodeInput } from 'gatsby';

let localesNode: NodeInput;

const getData = (
  (locale: string): string[] => {
    if (localesNode) {
      return [...localesNode.data as string[], locale];
    }

    return [locale];
  }
);

const createLocalesNode = (
  async (props: CreateNodeArgs): Promise<void> => {
    const { node, actions, createContentDigest } = props;
    const { createNode } = actions;

    if (node.internal.type !== 'File') return;
    if (node.sourceInstanceName !== 'locales') return;
    if (node.base !== 'translations.json') return;
    if (node.relativeDirectory === 'generic') return;

    const locale = node.relativeDirectory as string;
    const data = getData(locale);

    localesNode = {
      id: 'locales',
      parent: node.id,

      internal: {
        contentDigest: createContentDigest(data),
        type: 'Locales',
      },

      data,
    };

    createNode(localesNode);
  }
);

export default createLocalesNode;