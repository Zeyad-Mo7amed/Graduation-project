import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Layout/Sidebar/Sidebar";
import Navbar from "../../Components/Layout/Navbar/Navbar";
import { useState } from "react";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <>
      <div className="flex bg-[#F0F5FA]" dir="rtl">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col w-full transition-all duration-300">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
