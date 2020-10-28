import { feedbax } from '@feedbax/protos';
import { RequireDeep } from '@utils/types';
import { ValidateFunction } from 'ajv';

import Ajv from 'ajv';

const ajv = new Ajv();

const createValidator = <T>(validateFn: ValidateFunction) => {
  function validate(data: unknown): asserts data is T {
    if (!validateFn(data)) throw validateFn.errors;
  }

  return validate;
};

export type CreateProps = feedbax.Model.IUser;
export type CreatePropsRequired = (
  RequireDeep<
    CreateProps, {
      email: true;
      password: true;
    }
  >
);

const $schema = ajv.compile({
  properties: {
    email: {
      minLength: 1,
      type: 'string',
    },

    password: {
      minLength: 1,
      type: 'string',
    },
  },

  required: [
    'email',
    'password',
  ],
});

const $validator = createValidator<CreatePropsRequired>($schema);
const validateCreateProps: typeof $validator = $validator;

const test: unknown = {
  email: '',
  password: 's',
  events: [],
};

validateCreateProps(test);
console.log(test);
