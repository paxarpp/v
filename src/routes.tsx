import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './error-page';
import { Coaches } from './pages/coaches';
import { loaderPageCoaches } from './pages/coaches/loaders';
import { Main } from './pages/main';
import { LongCamp } from './pages/longCamp';
import { ShotCamp } from './pages/shotCamp';
import { Shedule } from './pages/trainingSchedule';
import { loaderPageMain } from './pages/main/loaders';
import { loaderPageShedule } from './pages/trainingSchedule/loaders';
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
        element: <ShotCamp />,
        errorElement: <ErrorPage />,
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
