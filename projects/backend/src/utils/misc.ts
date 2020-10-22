// eslint-disable-next-line import/prefer-default-export
export const sleep = (
  async (ms: number): Promise<void> => (
    new Promise<void>((resolve) => setTimeout(resolve, ms))
  )
);
