export type IUserRole = 'ADMIN' | 'USER' | 'MODERATOR';

export interface IUser {
  email: string,
  id: string,
  roles: IUserRole[],
  username: string,
}