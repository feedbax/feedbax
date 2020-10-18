const users = new Set<string>();
const admins = new Set<string>();

export const addAdmin = (
  (socketId: string): Set<string> => admins.add(socketId)
);

export const addUser = (
  (socketId: string): Set<string> => users.add(socketId)
);

export const isUser = (
  (socketId: string): boolean => users.has(socketId)
);

export const isAdmin = (
  (socketId: string): boolean => admins.has(socketId)
);
