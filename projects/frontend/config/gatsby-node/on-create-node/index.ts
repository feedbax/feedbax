import createLocalesNode from './create-locales-node';
import createTranslationNode from './create-translation-node';
import createTranslationMarkdownNode from './create-translation-content-node';
import createTranslationFragmentNode from './create-translation-fragment-node';

import type { CreateNodeArgs } from 'gatsby';

const onCreateNode = (
  async (props: CreateNodeArgs): Promise<void> => {
    await createLocalesNode(props);
    await createTranslationNode(props);
    await createTranslationMarkdownNode(props);
    await createTranslationFragmentNode(props);
  }
);

export default onCreateNode;
