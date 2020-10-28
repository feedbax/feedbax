import type { feedbax } from '@feedbax/protos';
import type { Payload, Include } from './payload';

export type Transform = (
  (event: Payload<Include>, uuid: string) => feedbax.Model.Event
);
