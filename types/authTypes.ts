export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  role: string;
  workspaceId?: string | null;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
};
