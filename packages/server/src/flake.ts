import FlakeId from 'flake-idgen';
import baseX from 'base-x';

const flakeIdGen = new FlakeId();
const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const bs62 = baseX(BASE62);

export const generate = (): string  => {
  const idBuffer = flakeIdGen.next();
  const idBase62 = bs62.encode(idBuffer);

  return idBase62;
};
