import path from 'path';
import fs from 'fs';

import { rootDir } from '~config/gatsby-config';

const generateStoreSeed = (
  async (): Promise<void> => {
    const seedPath = path.join(rootDir, 'src/store/seed.json');
    if (fs.existsSync(seedPath)) return;

    const { default: generateStateSeed } = await import('./seed');

    const seedContent = generateStateSeed();
    const seedContentJSON = JSON.stringify(seedContent);

    fs.writeFileSync(seedPath, seedContentJSON);
  }
);

export default generateStoreSeed;