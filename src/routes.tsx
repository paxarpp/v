import {
  createBrowserRouter,
} from "react-router-dom";
import { ErrorPage } from "./error-page";
import { Coaches } from "./pages/coaches";
import { loaderPageCoaches } from "./pages/coaches/loaders";
import { Main } from "./pages/main";
import { loaderPageMain } from "./pages/main/loaders";

export const router = createBrowserRouter([
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
    path: "/allCoahes", // why crash?
    element: <Coaches />,
    errorElement: <ErrorPage />,
    loader: loaderPageCoaches,
  },
  {
    path: "/weekendCamps",
    element: <h2>Кемпы на выходные</h2>
  },
  {
    path: '/longCamps', // why crash
    element: <h2>Кемпы длинные</h2>,
  },
  {
      path: '/trainingSchedule',
      element: <h2>Расписание тренировок</h2>,
  }
]);