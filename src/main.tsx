import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { routes } from "./Routing/AppRouting";

// 1. استيراد المكتبات اللي ناقصة
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// 2. إنشاء الـ Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 3. تغليف التطبيق بالـ Provider */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />

      {/* 4. إضافة الـ Toaster هنا عشان يشتغل في كل الموقع */}
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  </StrictMode>,
);
