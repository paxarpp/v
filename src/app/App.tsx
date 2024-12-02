import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { Header } from '../templates/header';
import { Auth } from '../auth';
import { AuthProvider, AuthOpenContext } from '../context';
import { Footer } from '../templates/footer';
import { IAppInfo } from './interface';

export const App = () => {
  const { app } = useLoaderData() as {
    app: { contactBlock: IAppInfo };
  };
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
        <Header {...app.contactBlock} />
        {authOpen ? (
          <Auth onCloseAuth={onCloseAuth} toggleAuthOpen={toggleAuthOpen} />
        ) : null}
        <div id="detail">
          <Outlet />
        </div>
        <Footer {...app.contactBlock} />
      </AuthOpenContext.Provider>
    </AuthProvider>
  );
};
