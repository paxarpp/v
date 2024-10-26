import {
  createBrowserRouter,
} from "react-router-dom";
import { ErrorPage } from "./error-page";
import { Coaches } from "./pages/coaches";
import { loaderPageCoaches } from "./pages/coaches/loaders";
import { Main } from "./pages/main";
import { Shedule } from "./pages/trainingSchedule";
import { loaderPageMain } from "./pages/main/loaders";
import { loaderPageShedule } from "./pages/trainingSchedule/loaders";
import { App } from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        loader: loaderPageMain,
      },
      {
        path: "/about",
        element: <h2>О нас</h2>,
      },
      {
        path: "/allCoahes",
        element: <Coaches />,
        errorElement: <ErrorPage />,
        loader: loaderPageCoaches,
      },
      {
        path: "/weekendCamps",
        element: <h2>Кемпы на выходные</h2>
      },
      {
        path: '/longCamps',
        element: <h2>Кемпы длинные</h2>,
      },
      {
        path: '/trainingSchedule',
        element: <Shedule />,
        errorElement: <ErrorPage />,
        loader: loaderPageShedule,
      }
    ],
  },
]);