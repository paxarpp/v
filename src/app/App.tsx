import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router';
import { Header } from '../templates/header';
import { Auth } from '../auth';
import { AuthProvider, AuthOpenContext } from '../context';
import { Footer } from '../templates/footer';
import { IAppInfo } from './interface';
import { loaderAppInfo } from './loader';

export async function clientLoader() {
  return await loaderAppInfo();
}

export default function App() {
  // const { app } = useLoaderData() as {
  //   app: IAppInfo;
  // };
  const [authOpen, setOpen] = useState(false);
  const [campId, setReserv] = useState('');

  const toggleAuthOpen = (campId?: string) => {
    setOpen(!authOpen);
    if (campId) {
      setReserv(campId);
    }
  };

  const onCloseAuth = () => {
    setOpen(false);
    setReserv('');
  };

  return (
    <div>app</div>
    // <AuthProvider>
    //   <AuthOpenContext.Provider value={{ toggleAuthOpen }}>
    //     <Header {...app} />
    //     {authOpen ? (
    //       <Auth
    //         onCloseAuth={onCloseAuth}
    //         toggleAuthOpen={toggleAuthOpen}
    //         campId={campId}
    //       />
    //     ) : null}
    //     <div id="detail">
    //       <Outlet />
    //     </div>
    //     <Footer {...app} />
    //   </AuthOpenContext.Provider>
    // </AuthProvider>
  );
};
