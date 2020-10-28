import Ajv from 'ajv';
import type { ValidateFunction } from 'ajv';

const ajv = new Ajv();

export type Validator<T> = (data: unknown) => data is T;
export type Asserter<T> = (data: unknown) => asserts data is T;

export const createAsserter = (
  <T>(validateFn: ValidateFunction): Asserter<T> => {
    function validate(data: unknown): asserts data is T {
      if (!validateFn(data)) throw validateFn.errors;
    }

    return validate;
  }
);

export const createValidator = (
  <T>(validateFn: ValidateFunction): Validator<T> => {
    function validate(data: unknown): data is T {
      if (validateFn(data)) {
        return true;
      }

      return false;
    }

    return validate;
  }
);

export const createValidateFn = (
  (schema: Record<string, unknown>): ValidateFunction => ajv.compile(schema)
);
