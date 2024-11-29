import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './error-page';
import { Coaches } from './pages/coaches';
import { loaderPageCoaches } from './pages/coaches/loaders';
import { Main } from './pages/main';
import { LongCamps } from './pages/longCamps';
import { ShortCamps } from './pages/shortCamps';
import { Camp } from './pages/camp';
import { User } from './pages/user';
import { Shedule } from './pages/trainingSchedule';
import { loaderPageMain } from './pages/main/loaders';
import { loaderPageShedule } from './pages/trainingSchedule/loaders';
import { loaderPageShortCamps } from './pages/shortCamps/loaders';
import { loaderPageLongCamps } from './pages/longCamps/loaders';
import { loaderPageCamp } from './pages/camp/loaders';
import { loaderPageUser } from './pages/user/loaders';
import { App } from './App';
import { ProtectedRoute } from './templates/protectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        loader: loaderPageMain,
      },
      {
        path: '/about',
        element: <h2>О нас</h2>,
      },
      {
        path: '/allCoahes',
        element: <Coaches />,
        errorElement: <ErrorPage />,
        loader: loaderPageCoaches,
      },
      {
        path: '/weekendCamps',
        element: <ShortCamps />,
        errorElement: <ErrorPage />,
        loader: loaderPageShortCamps,
      },
      {
        path: '/camps/:id',
        element: <Camp />,
        errorElement: <ErrorPage />,
        loader: loaderPageCamp,
      },
      {
        path: '/longCamps',
        element: <LongCamps />,
        errorElement: <ErrorPage />,
        loader: loaderPageLongCamps,
      },
      {
        path: '/trainingSchedule',
        element: <Shedule />,
        errorElement: <ErrorPage />,
        loader: loaderPageShedule,
      },
      {
        path: '/oldCamps',
        element: <div />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/tournaments',
        element: <div />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/corporates',
        element: <div />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/user/:id',
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        loader: loaderPageUser,
      },
    ],
  },
]);
