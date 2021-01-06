import generateDisclaimer from './generate-disclaimer';
import generateStoreSeed from './generate-store-seed';

const onPreBootstrap = (
  async (): Promise<void> => {
    await generateStoreSeed();
    await generateDisclaimer();
  }
);

export default onPreBootstrap;
