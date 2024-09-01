import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Header } from "./templates/header";
import { Auth } from "./auth";
import { router } from "./routes";
import "./index.css";

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
