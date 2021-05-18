declare module '@/lib/store/types' {
  interface FeedbaxStoreData {}

  interface FeedbaxStoreActions {
    reset: () => void;
  }

  type DraftFn = (draft: FeedbaxStore) => void;
  export type WithImmer = (fn: DraftFn) => void;

  export type FeedbaxStore =
    & FeedbaxStoreData
    & FeedbaxStoreActions;
}

export default undefined;
