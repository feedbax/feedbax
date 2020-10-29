import { createAsserter } from '@utils/guards';
import type { ValidRequestPacket } from './types';

const validRequestPacketAsserter = (
  createAsserter<ValidRequestPacket>({
    throw: new Error('invalid packet request data'),

    type: 'object',

    properties: {
      user: {
        type: 'object',

        properties: {
          uuid: {
            type: 'string',
            minLength: 1,
          },
        },

        required: [
          'uuid',
        ],
      },

      event: {
        type: 'object',

        properties: {
          slug: {
            type: 'string',
            minLength: 1,
          },
        },

        required: [
          'slug',
        ],
      },
    },

    required: [
      'user',
      'event',
    ],
  })
);

// eslint-disable-next-line import/prefer-default-export
export const validatePacket: typeof validRequestPacketAsserter = validRequestPacketAsserter;
