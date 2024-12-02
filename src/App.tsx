import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './templates/header';
import { Auth } from './auth';
import { AuthProvider, AuthOpenContext } from './context';
import styles from './app.module.css';
import { Footer } from './templates/footer';

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
        <Footer />
      </AuthOpenContext.Provider>
    </AuthProvider>
  );
};
