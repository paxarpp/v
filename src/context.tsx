import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { IUser } from './auth/interface';

interface IAuthContext {
  user: IUser | null;
  signin: (user: IUser) => void;
  logout: () => void;
  isAdmin: boolean;
  isModerator: boolean;
}

const UserContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const signin = (user: IUser) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    document.cookie = `magicVolley=`;
  };
  const isAdmin = !!user?.roles.includes('ADMIN');
  const isModerator = !!user?.roles.includes('MODERATOR');

  const value = {
    user,
    signin,
    logout,
    isAdmin,
    isModerator,
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

const AuthOpenContext = createContext<
  { toggleAuthOpen: (campId: string) => void } | undefined
>(undefined);

function useAuth() {
  const context = useContext(AuthOpenContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
}

export { AuthProvider, useUser, AuthOpenContext, useAuth };
