import createLocalesNode from './create-locales-node';
import createTranslationNode from './create-translation-node';
import createTranslationMarkdownNode from './create-translation-content-node';

import type { CreateNodeArgs } from 'gatsby';

const onCreateNode = (
  async (props: CreateNodeArgs): Promise<void> => {
    await createLocalesNode(props);
    await createTranslationNode(props);
    await createTranslationMarkdownNode(props);
  }
);

export default onCreateNode;
