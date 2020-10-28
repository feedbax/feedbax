import type { feedbax } from '@feedbax/protos';
import type { GetByProps } from './get-by';
import type { Include } from './payload';

export type GetProtoBy = {
  /* eslint-disable max-len */
  (props: GetByProps, uuid: string, include?: Include): Promise<feedbax.Model.IEvent>;
  /* eslint-enable max-len */
};
