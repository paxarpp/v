import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./templates/header";
import { Auth } from "./auth";
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

  const authing = (l: string, p: string) => {
    const authLogin = async () => {
      const user = await login<{
        data?: IUser 
      }>(l, p);
      if (user?.data) {
        setUser(user.data);
        toggleAuthOpen();
      }
    };
    authLogin();
  };

  console.log(currentUser);

  return (
    <AuthContext.Provider value={{ user: currentUser, setUser }}>
      <Header toggleAuthOpen={toggleAuthOpen} />
      {authOpen ? <Auth authing={authing} /> : null}
      <div id="detail">
        <Outlet />
      </div>
    </AuthContext.Provider>
  )
}
