import { RouterProvider } from "react-router-dom";
import { routes } from "./Routing/AppRouting";

export default function App() {
  return (
    <>
      <RouterProvider router={routes}/>
    </>
  );
}
