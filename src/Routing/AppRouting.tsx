import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import ReviewOfCraftsmen from "../Pages/Review/ReviewOfCraftsmen";
import Users from "../Pages/Users/Users";
import Orders from "../Pages/Orders/Orders";
import Support from "../Pages/Support/Support";
import Payments from "../Pages/Payments/Payments";

export const routes = createBrowserRouter([
  {
    path: "/",element: <MainLayout />,children:[
      { index:true, element: <Home /> },
      { path:'Review', element: <ReviewOfCraftsmen /> },
      { path:'Users', element: <Users /> },
      { path:'Orders', element: <Orders /> },
      { path:'Support', element: <Support /> },
      { path:'Payments', element: <Payments /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "login", element: <Login /> }],
  },
]);
