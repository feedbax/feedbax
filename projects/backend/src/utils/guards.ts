import Ajv from 'ajv';

const ajv = new Ajv();

export type Validator<T> = (data: unknown) => data is T;
export type Asserter<T> = (data: unknown) => asserts data is T;

export type Schema = {
  throw?: unknown;
  [key: string]: unknown;
};

export const createAsserter = (
  <T>(schema: Schema): Asserter<T> => {
    const validateFn = ajv.compile(schema);

    function validate(data: unknown): asserts data is T {
      if (!validateFn(data)) throw 'throw' in schema ? schema.throw : validateFn.errors;
    }

    return validate;
  }
);

export const createValidator = (
  <T>(schema: Record<string, unknown>): Validator<T> => {
    const validateFn = ajv.compile(schema);

    function validate(data: unknown): data is T {
      if (validateFn(data)) {
        return true;
      }

      return false;
    }

    return validate;
  }
);
