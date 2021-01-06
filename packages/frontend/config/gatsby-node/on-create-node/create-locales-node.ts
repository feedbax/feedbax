import generateNodeTypes from './generate-node-types';

import type { CreateNodeArgs, NodeInput } from 'gatsby';

const localesSet = new Set<string>();
let localesNode: NodeInput;

const getData = (
  (locale: string): string[] => {
    localesSet.add(locale);
    return Array.from(localesSet);
  }
);

const createLocalesNode = (
  async (props: CreateNodeArgs): Promise<void> => {
    const { node, actions } = props;

    const { createNodeId, createContentDigest } = props;
    const { createNode } = actions;

    if (node.internal.type !== 'File') return;
    if (node.sourceInstanceName !== 'locales') return;
    if (node.base !== 'translations.yaml') return;
    if (node.relativeDirectory === 'generic') return;

    const locale = node.relativeDirectory as string;
    const data = getData(locale);

    localesNode = {
      id: createNodeId('locales'),
      parent: node.id,

      internal: {
        contentDigest: createContentDigest(data),
        type: 'Locales',
      },

      data,
    };

    createNode(localesNode);
    generateNodeTypes(localesNode, {
      fileName: 'locales.d.ts',
      rootName: 'Locales',
    });
  }
);

export default createLocalesNode;
