import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './templates/header';
import { Auth } from './auth';
import { AuthContext } from './context';
import { IUser } from './auth/interface';
import { login } from './api';
import styles from './app.module.css';

export const App = () => {
  const [authOpen, setOpen] = useState(false);
  const [currentUser, setUser] = useState<IUser | null>(null);

  const toggleAuthOpen = () => {
    setOpen(!authOpen);
  };

  const onCloseAuth = () => {
    setOpen(false);
  };

  const authing = (l: string, p: string) => {
    const authLogin = async () => {
      const user = await login<{
        data?: IUser;
      }>(l, p);
      if (user?.data) {
        setUser(user.data);
        toggleAuthOpen();
      }
    };
    authLogin();
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, setUser }}>
      <Header toggleAuthOpen={toggleAuthOpen} />
      {authOpen ? <Auth authing={authing} onCloseAuth={onCloseAuth} /> : null}
      <div id="detail" className={styles.outlet}>
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
};
