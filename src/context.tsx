import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { IUser } from './auth/interface';

interface IAuthContext {
  user: IUser | null;
  signin: (user: IUser) => void;
  logout: () => void;
}

const UserContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const signin = (user: IUser) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    signin,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
}

export { AuthProvider, useUser };
