import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { useState } from 'react';
import { Auth } from './auth';
import { AuthProvider, AuthOpenContext } from './context';
import { Footer } from './templates/footer';
import { Header } from './templates/header';
import { loaderAppInfo } from './app/loader';
import { NotFound } from './pages/notFound';
import { Route } from './+types/root';
import './index.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Magic Volley</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function clientLoader() {
  return await loaderAppInfo();
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
    <AuthProvider>
      <AuthOpenContext.Provider value={{ toggleAuthOpen }}>
        <Header {...app} />
        {authOpen ? (
          <Auth
            onCloseAuth={onCloseAuth}
            toggleAuthOpen={toggleAuthOpen}
            campId={campId}
          />
        ) : null}
        <div id="detail">
          <Outlet />
        </div>
        <Footer {...app} />
      </AuthOpenContext.Provider>
    </AuthProvider>
  );
}
