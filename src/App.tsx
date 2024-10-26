import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Header } from "./templates/header";
import { Auth } from "./auth";
import { router } from "./routes";
import { AuthContext } from "./context";
import { IUser } from "./auth/interface";
import { login } from './api';
import "./index.css";

export const App = () => {
  const [authOpen, setOpen] = useState(false);
  const [currentUser, setUser] = useState<IUser | null>(null);

  const toggleAuthOpen = () => {
    setOpen(!authOpen)
  }

  const auth = (l: string, p: string) => {
    const authing = async () => {
      const user = await login<{
        data?: IUser 
      }>(l, p);
      if (user?.data) {
        setUser(user.data);
        toggleAuthOpen();
      }
    };
    authing();
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, setUser }}>
      <Header toggleAuthOpen={toggleAuthOpen} />
      {authOpen ? <Auth authing={auth} /> : null}
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}
