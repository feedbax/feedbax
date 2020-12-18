import createLocalesNode from './create-locales-node';
import createTranslationNode from './create-translation-node';
import createTranslationMarkdownNode from './create-translation-content-node';

import type { CreateNodeArgs } from 'gatsby';

const onCreateNode = (
  async (props: CreateNodeArgs): Promise<void> => {
    await createLocalesNode(props);
    await createTranslationNode(props);
    await createTranslationMarkdownNode(props);

    // if ((node.base as string).match(/.*\.md$/)) {
    //   createNode({
    //     id: 'translations',

    //     internal: {
    //       contentDigest: hash({ [node.relativePath as string]: node.relativePath as string }),
    //       type: 'Translations',
    //     },

    //     [node.relativePath as string]: node.relativePath as string,
    //   });

    //   return;
    // }

    // if (node.relativePath === 'translations.json') {
    //   const data = await dereference(node.absolutePath as string);

    //   console.log(JSON.stringify(data, null, 2));

    //   createNode({
    //     id: 'translations',

    //     internal: {
    //       contentDigest: md5(data),
    //       type: 'Translations',
    //     },

    //     data,
    //     locales: Object.keys(data),
    //   });
    // }
  }
);

export default onCreateNode;
