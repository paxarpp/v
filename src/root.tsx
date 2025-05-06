import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from 'react-router';
import { useState } from 'react';
import { Auth } from './auth';
import { AuthProvider, AuthOpenContext } from './context';
import { Footer } from './templates/footer';
import { Header } from './templates/header';
import { NotFound } from './pages/notFound';
import { Route } from './+types/root';
import { GlobalSpinner } from './templates/globalSpinner';
import { pl } from './api/pageLoader';
import { IAppInfo } from './app/interface';
import './index.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Magic Volley</title>
        <Meta />
        <Links />
        <base href="/" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getAppInfo<IAppInfo>();
  return { app: result, error };
}

export function HydrateFallback() {
  return (
    <div>
      <p>Loading, please wait...</p>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (error?.status === 404) {
    return <NotFound />;
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default function Root({ loaderData }: Route.ComponentProps) {
  const { app } = loaderData;
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

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

  const [isOpen, setViewerOpen] = useState(false);
  const [image, setImage] = useState({ src: '', alt: '' });

  const onPreview = (src: string, alt = '') => {
    setViewerOpen(true);
    setImage({ src, alt });
  };

  const closePreview = () => {
    setViewerOpen(false);
  };

  return (
    <AuthProvider>
      <AuthOpenContext.Provider
        value={{
          toggleAuthOpen,
          image: {
            isOpen,
            image,
            closePreview,
            onPreview,
          },
        }}
      >
        <Header {...app} />
        {authOpen ? (
          <Auth
            onCloseAuth={onCloseAuth}
            toggleAuthOpen={toggleAuthOpen}
            campId={campId}
          />
        ) : null}
        <div id="detail">
          {isNavigating ? <GlobalSpinner /> : null}
          <Outlet />
        </div>
        <Footer {...app} />
      </AuthOpenContext.Provider>
    </AuthProvider>
  );
}
