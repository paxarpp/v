export type IUserRole = 'ADMIN' | 'USER' | 'MODERATOR' | 'GUEST';

export interface IUser {
  email: string;
  id: string;
  role: IUserRole;
  username: string;
}
