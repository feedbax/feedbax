import type { FeedbaxStore } from '@/lib/store/types';

import { selectors as appSelectors } from '@/lib/store/modules/app';
import { selectors as navigationSelectors } from '@/lib/store/modules/navigation';
import { selectors as eventSelectors } from '@/lib/store/modules/event';
import { selectors as questionsSelectors } from '@/lib/store/modules/questions';
import { selectors as reactionsSelectors } from '@/lib/store/modules/reactions';

export default {
  ...appSelectors,
  ...navigationSelectors,
  ...eventSelectors,
  ...questionsSelectors,
  ...reactionsSelectors,

  reset: (state: FeedbaxStore) => state.reset,
};
