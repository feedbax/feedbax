import createTranslatedPages from './create-translated-pages';
import type { CreatePagesArgs } from 'gatsby';

const createPages = (
  async (props: CreatePagesArgs): Promise<void> => {
    await createTranslatedPages(props);
  }
);

export default createPages;
