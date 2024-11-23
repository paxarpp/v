import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './error-page';
import { Coaches } from './pages/coaches';
import { loaderPageCoaches } from './pages/coaches/loaders';
import { Main } from './pages/main';
import { LongCamp } from './pages/longCamp';
import { ShotCamps } from './pages/shotCamps';
import { Camp } from './pages/camp';
import { Shedule } from './pages/trainingSchedule';
import { loaderPageMain } from './pages/main/loaders';
import { loaderPageShedule } from './pages/trainingSchedule/loaders';
import { loaderPageShotCamps } from './pages/shotCamps/loaders';
import { loaderPageCamp } from './pages/camp/loaders';
import { App } from './App';

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
        element: <ShotCamps />,
        errorElement: <ErrorPage />,
        loader: loaderPageShotCamps,
      },
      {
        path: '/camps/:id',
        element: <Camp />,
        errorElement: <ErrorPage />,
        loader: loaderPageCamp,
      },
      {
        path: '/longCamps',
        element: <LongCamp />,
        errorElement: <ErrorPage />,
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
    ],
  },
]);
