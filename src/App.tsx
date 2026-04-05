import { RouterProvider } from "react-router-dom";
import { routes } from "./Routing/AppRouting";
import Login from "./Pages/Auth/Login/Login";

export default function App() {
  return (
    <>
      
      <RouterProvider router={routes}/>
    </>
  );
}
