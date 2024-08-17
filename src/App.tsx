import { useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Main, loaderMedia, loaderCoaches, loaderCamps } from "./pages/main";
import { ErrorPage } from "./error-page";
import { Header } from "./templates/header";
import { Auth } from "./auth";

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
  const [authOpen, setOpen] = useState(false);

  const toggleAuthOpen = () => {
    setOpen(!authOpen)
  }

  return (
    <>
      <Header toggleAuthOpen={toggleAuthOpen} />
      {authOpen ? <Auth toggleAuthOpen={toggleAuthOpen} /> : null}
      <RouterProvider router={router} />
    </>
  )
}
