import marked from 'marked';
import xss from 'xss';

import type { CreateNodeArgs } from 'gatsby';

const createTranslationMarkdownNode = (
  async (props: CreateNodeArgs): Promise<void> => {
    const { node, actions } = props;

    const { loadNodeContent } = props;
    const { createNodeId, createContentDigest } = props;
    const { createNode } = actions;

    if (node.internal.type !== 'File') return;
    if (node.sourceInstanceName !== 'locales') return;
    if (!(node.base as string).match(/.*\.md$/)) return;

    const locale = node.relativeDirectory;
    const markdown = await loadNodeContent(node);

    const html = marked(markdown);
    const sanitizedHTML = xss(html);

    type Hyphen = typeof import('hyphen/en');
    const { hyphenateHTMLSync }: Hyphen = await import(`hyphen/${locale}`);

    const hyphenatedHTML = hyphenateHTMLSync(sanitizedHTML);

    createNode({
      id: createNodeId(`translation_markdown_${node.base}_${locale}`),
      parent: node.id,

      internal: {
        contentDigest: createContentDigest(hyphenatedHTML),
        type: 'TranslationMarkdown',
      },

      locale,

      file: `~${node.base as string}`,
      data: hyphenatedHTML,
    });
  }
);

export default createTranslationMarkdownNode;
