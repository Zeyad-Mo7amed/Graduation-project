import { useState, useEffect } from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiMenu,
  FiSun,
  FiMoon,
} from "react-icons/fi";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  // 1. منطق الدارك مود - بيبدأ بالوضع الفاتح (Light) افتراضياً
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <nav className="bg-white dark:bg-[#111827] h-20 border-b border-[#E5EDF4] dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-30 transition-colors">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          aria-label="فتح القائمة الجانبية"
          title="القائمة"
          className="md:hidden text-gray-600 dark:text-gray-300 ml-4 p-2 rounded-lg bg-[#F0F5FA] dark:bg-[#1F2937] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <FiMenu size={26} />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[#738398] dark:text-gray-400 text-lg hidden sm:inline">
            {`نظرة عامة -`}
          </span>
          <span className="text-[#3B82F6] text-lg font-bold">لوحة التحكم</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* حقل البحث - Search */}
        <div className="relative hidden md:flex w-full max-w-md" dir="rtl">
          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none text-[#8896AA] dark:text-gray-500">
            <FiSearch size={20} strokeWidth={2} />
          </div>

          <input
            type="search"
            placeholder="البحث هنا..."
            className="w-full h-[45px] pr-16 pl-6 text-lg rounded-full 
                  bg-[#F0F5FA] dark:bg-[#1F2937] text-[#2B323B] dark:text-white placeholder:text-[#8896AA]
                  border border-transparent transition-all
                  focus:outline-none focus:bg-white dark:focus:bg-[#111827] focus:border-blue-300
                  focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
          />
        </div>

        {/* زرار تبديل الوضع (Dark/Light Mode) */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2.5 bg-[#F8FAFC] dark:bg-[#1F2937] rounded-full text-gray-500 dark:text-yellow-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-transparent dark:border-gray-700"
          title={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع المظلم"}
        >
          {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        {/* التنبيهات - Notifications */}
        <div className="relative p-2.5 bg-[#F8FAFC] dark:bg-[#1F2937] rounded-full text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-transparent dark:border-gray-700">
          <FiBell size={22} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#111827]"></span>
        </div>

        {/* الملف الشخصي - User Profile */}
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#1F2937] flex items-center justify-center border border-gray-100 dark:border-gray-700 cursor-pointer hover:border-[#3B82F6] transition-all text-gray-600 dark:text-gray-300">
          <FiUser size={24} />
        </div>
      </div>
    </nav>
  );
}
  