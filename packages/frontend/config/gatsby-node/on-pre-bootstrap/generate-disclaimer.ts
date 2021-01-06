// import fs from 'fs';
// import path from 'path';

// import YAML from 'yaml';
// // import { execSync } from 'child_process';

// import { rootDir } from '~config/gatsby-config';

const generateDisclaimer = (
  async (): Promise<void> => {
    // const disclaimerPath = path.join(rootDir, 'src/locales/en/disclaimer.md');
    // const pnpmLockPath = path.join(rootDir, 'pnpm-lock.yaml');
    // const pnpmLockContent = fs.readFileSync(pnpmLockPath, 'utf-8');

    // const pnpmLockData = YAML.parse(pnpmLockContent);

    // console.log(pnpmLockData.packages);

    // execSync(`yarn licenses --silent generate-disclaimer > ${disclaimerPath}`);
  }
);

export default generateDisclaimer;
