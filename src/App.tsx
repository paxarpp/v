import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Main, loaderMedia, loaderCoaches, loaderCamps } from "./pages/main";
import { ErrorPage } from "./error-page";
import { Header } from "./templates/header";
import styles from './app.module.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const [medias, coches, camps] = await Promise.all([loaderMedia(), loaderCoaches(), loaderCamps()]);
      const main = {
        ...medias,
        ...coches,
        ...camps,
      };
      return { main }
    },
  },
  {
    path: "contacts/:contactId",
    element: <div />,
  },
]);

export const App = () => {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  )
}
