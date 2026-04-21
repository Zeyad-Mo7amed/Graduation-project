import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { routes } from "./Routing/AppRouting";
import {ToastContainer} from 'react-toastify' 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllContextProvider from "./Context/AllContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AllContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <ToastContainer />
      </QueryClientProvider>
    </AllContextProvider>
  </StrictMode>,
);
