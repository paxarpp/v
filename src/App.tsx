import { useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Main } from "./pages/main";
import { loaderMedia, loaderCoaches, loaderCamps, loaderQuestions } from "./pages/main/loades";
import { ErrorPage } from "./error-page";
import { Header } from "./templates/header";
import { Auth } from "./auth";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const [medias, coches, camps, questions] =
        await Promise.all([loaderMedia(), loaderCoaches(), loaderCamps(), loaderQuestions()]);
      const main = {
        ...medias,
        ...coches,
        ...camps,
        ...questions,
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
