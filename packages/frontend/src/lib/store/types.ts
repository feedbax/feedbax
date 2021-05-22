declare module '@/lib/store/types' {
  interface FeedbaxStore {
    reset: () => void;
  }

  export type CreateStore<
    Name extends string,
    State extends Record<string, unknown>,
    Actions extends Record<string, unknown>,
  > = {
    [key in Name]: {
      state: State;
      actions: Actions;
    }
  };

  export type Selector<T> = (store: FeedbaxStore) => T;
  export type CreateSelectors<
    Name extends string,
    Selectors extends Record<string, unknown>,
  > = {
    [key in Name]: Selectors;
  };

  export type SetWithImmer = (fn: (draft: FeedbaxStore) => void) => void;
  export type WithoutDraft<T extends unknown[]> = (...props: T) => void;
  export type WithDraft<T extends unknown[]> = (draft: FeedbaxStore) => (...props: T) => void;

  export type WithImmer =
    <T extends unknown[]>(implementation: ImmerImplementation<T>)
      => ImmerAction<(...props: T) => void>;

  export type ImmerAction<T extends ((...props: any[]) => void) | (() => void)> = {
    (...props: Parameters<T>): void;
    withDraft: (draft: FeedbaxStore) => ((...props: Parameters<T>) => void);
  };

  export type ImmerImplementation<T extends unknown[]> =
    (draft: FeedbaxStore, ...props: T) => void;
}

export default undefined;
