import createLocalesNode from './create-locales-node';
import createTranslationNode from './create-translation-node';
import createTranslationMarkdownNode from './create-translation-content-node';
import createTranslationFragmentNode from './create-translation-fragment-node';

import type { CreateNodeArgs } from 'gatsby';
import generateNodeTypes from './generate-node-types';

const onCreateNode = (
  async (props: CreateNodeArgs): Promise<void> => {
    await createLocalesNode(props);
    await createTranslationNode(props);
    await createTranslationMarkdownNode(props);
    await createTranslationFragmentNode(props);

    const { node } = props;

    if (node.internal.type !== 'File') return;
    if (node.sourceInstanceName !== 'pages') return;
    if (node.ext !== '.tsx') return;

    generateNodeTypes(node, {
      fileName: 'page.d.ts',
      rootName: 'Page',
    });
  }
);

export default onCreateNode;
