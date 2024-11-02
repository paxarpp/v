import { createContext } from 'react';
import { IUser } from './auth/interface';

interface IAuthContext {
  user: IUser | null;
  setUser: ((user: IUser | null) => void) | null;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: null,
});
