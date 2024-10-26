export type IUserRole = 'ADMIN' | 'USER' | 'GUEST';

export interface IUser {
  email: string,
  id: string,
  roles: IUserRole[],
  username: string,
}