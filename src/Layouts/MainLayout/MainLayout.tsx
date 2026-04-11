import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Layout/Sidebar/Sidebar";
import Navbar from "../../Components/Layout/Navbar/Navbar";
import { useState } from "react";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div
      className="flex bg-[#F0F5FA] dark:bg-[#0F172A] min-h-screen transition-colors duration-300"
      dir="rtl"
    >
      {/* Sidebar - تأكد أن مكون الـ Sidebar داخله يدعم dark mode أيضاً */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col w-full min-w-0 transition-all duration-300">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <main className="p-4 md:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
