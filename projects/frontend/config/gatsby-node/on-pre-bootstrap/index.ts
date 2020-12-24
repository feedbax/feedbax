import path from 'path';
import fs from 'fs';

const onPreBootstrap = (
  async (): Promise<void> => {
    const { default: generateQuestionsState } = await import('~store/modules/questions/seed');
    const { default: generateAnswersState } = await import('~store/modules/answers/seed');

    const questionsState = generateQuestionsState();
    const answersState = generateAnswersState(questionsState);

    const seedPath = path.join(global.rootDir, 'src/store/seed.json');
    const seedContent = JSON.stringify({ questionsState, answersState });

    if (fs.existsSync(seedPath)) return;
    fs.writeFileSync(seedPath, seedContent);
  }
);

export default onPreBootstrap;
