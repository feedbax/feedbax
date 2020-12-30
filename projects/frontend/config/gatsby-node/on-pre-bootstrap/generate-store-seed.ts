import path from 'path';
import fs from 'fs';

const generateStoreSeed = (
  async (): Promise<void> => {
    const seedPath = path.join(global.rootDir, 'src/store/seed.json');
    if (fs.existsSync(seedPath)) return;

    const { default: generateStateSeed } = await import('~store/helper/seed');

    const seedContent = generateStateSeed();
    const seedContentJSON = JSON.stringify(seedContent);

    fs.writeFileSync(seedPath, seedContentJSON);
  }
);

export default generateStoreSeed;
