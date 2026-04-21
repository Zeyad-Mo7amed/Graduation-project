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
import Details from "../Components/Shared/Details/Details";
import DetailsUsers from "../Components/Shared/DetailsUsers/DetailsUsers";
import DetailsReview from "../Components/Shared/DetailsReview/DetailsReview";
import NotFound from "../Pages/Notfound/Notfound";
import SupportDetails from "../Components/Shared/SupportDetails/SupportDetails";
import EditAdmin from "../Components/Shared/AddAdmin/AddAdmin";
import MainRotectedRout from "../Components/Guard/MainRotectedRoute/MainRotectedRout";



export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainRotectedRout>
        <MainLayout />
      </MainRotectedRout>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "review", element: <ReviewOfCraftsmen /> },
      { path: "users", element: <Users /> },
      { path: "orders", element: <Orders /> },
      { path: "detailsOrder/:id", element: <Details /> },
      { path: "DetailsUsers/:id", element: <DetailsUsers /> },
      { path: "DetailsReview/:id", element: <DetailsReview /> },
      { path: "SupportDetails/:id", element: <SupportDetails /> },
      { path: "EditAdmin/:id", element: <EditAdmin /> },
      { path: "support", element: <Support /> },
      { path: "payments", element: <Payments /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "login", element: <Login /> }],
  },
]);

