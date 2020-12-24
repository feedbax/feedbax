import path from 'path';
import fs from 'fs';

const generateStoreSeed = (
  async (): Promise<void> => {
    const seedPath = path.join(global.rootDir, 'src/store/seed.json');
    if (fs.existsSync(seedPath)) return;

    const { default: generateQuestionsState } = await import('~store/modules/questions/seed');
    const { default: generateAnswersState } = await import('~store/modules/answers/seed');

    const questionsState = generateQuestionsState();
    const answersState = generateAnswersState(questionsState);

    const seedContent = JSON.stringify({ questionsState, answersState });

    fs.writeFileSync(seedPath, seedContent);
  }
);

export default generateStoreSeed;
