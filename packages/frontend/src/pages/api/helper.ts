import type { NextApiRequest, NextApiResponse } from 'next';

type ApiRouteConfig<POST, GET, PUT, DELETE> = {
  post?: (req: NextApiRequest, res: NextApiResponse<POST>) => Promise<void>;
  get?: (req: NextApiRequest, res: NextApiResponse<GET>) => Promise<void>;
  put?: (req: NextApiRequest, res: NextApiResponse<PUT>) => Promise<void>;
  delete?: (req: NextApiRequest, res: NextApiResponse<DELETE>) => Promise<void>;
};

export function createApiRoute<POST, GET, PUT, DELETE>(
  config: ApiRouteConfig<POST, GET, PUT, DELETE>,
) {
  return (
    async (req: NextApiRequest, res: NextApiResponse<POST | GET | PUT | DELETE>) => {
      if (req.method === 'POST' && config.post) {
        await config.post(req, res);
      } else if (req.method === 'GET' && config.get) {
        await config.get(req, res);
      } else if (req.method === 'PUT' && config.put) {
        await config.put(req, res);
      } else if (req.method === 'DELETE' && config.delete) {
        await config.delete(req, res);
      }
    }
  );
}

export function request<Data>(
  fn: (req: NextApiRequest, res: NextApiResponse<Data>) => Promise<void>,
) {
  return fn;
}
