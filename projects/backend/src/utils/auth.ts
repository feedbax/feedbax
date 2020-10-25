const users = new Set<string>();
const admins = new Set<string>();

export const addAdmin = (
  (socketId: string): Set<string> => admins.add(socketId)
);

export const addUser = (
  (socketId: string): Set<string> => users.add(socketId)
);

export const isUser = (
  (socketId: string): boolean => {
    const userExists = users.has(socketId);
    if (!userExists) throw new Error('socket-id is not authorized for this event.');
    return true;
  }
);

export const isAdmin = (
  (socketId: string): boolean => {
    const adminExists = admins.has(socketId);
    if (!adminExists) throw new Error('socket-id is not authorized for this event.');
    return true;
  }
);
