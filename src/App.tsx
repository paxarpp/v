import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Main, loaderInfo } from "./pages/main";
import { ErrorPage } from "./error-page";
import { Header } from "./templates/header";
import styles from './app.module.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    loader: loaderInfo,
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
