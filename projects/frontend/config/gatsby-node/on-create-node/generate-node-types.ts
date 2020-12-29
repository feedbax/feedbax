import fs from 'fs';
import path from 'path';
import jsonToTs from 'json-to-ts';

type Options = {
  fileName: string;
  rootName: string;
};

const generateNodeTypes = (
  async (node: unknown, options: Options): Promise<void> => {
    fs.writeFileSync(
      path.join(global.rootDir, 'src/types', options.fileName),

      jsonToTs(node, { rootName: options.rootName })
        .join('\n\n')
        .replace(/^interface/gm, 'export interface'),
    );
  }
);

export default generateNodeTypes;
