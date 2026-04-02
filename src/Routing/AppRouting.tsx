import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";

export const routes = createBrowserRouter([
  {
    path: "/",element: <MainLayout />,children:
      [{ index:true, element: <Home /> }],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "login", element: <Login /> }],
  },
]);
