import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { Header } from '../templates/header';
import { Auth } from '../auth';
import { AuthProvider, AuthOpenContext } from '../context';
import { Footer } from '../templates/footer';
import { IAppInfo } from './interface';

export const App = () => {
  const { app } = useLoaderData() as {
    app: IAppInfo;
  };
  const [authOpen, setOpen] = useState(false);

  const toggleAuthOpen = () => {
    setOpen(!authOpen);
  };

  const onCloseAuth = () => {
    setOpen(false);
  };
console.log(app)
  return (
    <AuthProvider>
      <AuthOpenContext.Provider value={{ toggleAuthOpen }}>
        <Header {...app} />
        {authOpen ? (
          <Auth onCloseAuth={onCloseAuth} toggleAuthOpen={toggleAuthOpen} />
        ) : null}
        <div id="detail">
          <Outlet />
        </div>
        <Footer {...app} />
      </AuthOpenContext.Provider>
    </AuthProvider>
  );
};
