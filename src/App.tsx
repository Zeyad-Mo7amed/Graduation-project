  import { RouterProvider } from "react-router-dom";
  import { routes } from "./Routing/AppRouting";
  import NetworkStatus from "./Pages/NetworkStatus/NetworkStatus ";
  export default function App() {
    return (
      <>
        <NetworkStatus />
        <RouterProvider router={routes} />
      </>
    );
  }
