import path from 'path';
import { execSync } from 'child_process';

const generateDisclaimer = (
  async (): Promise<void> => {
    const disclaimerPath = path.join(global.rootDir, 'src/locales/en/disclaimer.md');
    execSync(`yarn licenses --silent generate-disclaimer > ${disclaimerPath}`);
  }
);

export default generateDisclaimer;
