import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './templates/header';
import { Auth } from './auth';
import { AuthProvider, AuthOpenContext } from './context';
import styles from './app.module.css';

export const App = () => {
  const [authOpen, setOpen] = useState(false);

  const toggleAuthOpen = () => {
    setOpen(!authOpen);
  };

  const onCloseAuth = () => {
    setOpen(false);
  };

  return (
    <AuthProvider>
      <AuthOpenContext.Provider value={{ toggleAuthOpen }}>
        <Header />
        {authOpen ? (
          <Auth onCloseAuth={onCloseAuth} toggleAuthOpen={toggleAuthOpen} />
        ) : null}
        <div id="detail" className={styles.outlet}>
          <Outlet />
        </div>
      </AuthOpenContext.Provider>
    </AuthProvider>
  );
};
