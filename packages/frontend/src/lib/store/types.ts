declare module '@/lib/store/types' {
  interface FeedbaxStoreData {}
  interface FeedbaxStoreActions {
    reset: () => void;
  }

  type DraftFn = (draft: FeedbaxStore) => void;
  export type SetWithImmer = (fn: DraftFn) => void;
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

  export type FeedbaxStore =
    & FeedbaxStoreData
    & FeedbaxStoreActions;
}

export default undefined;
