import {
  FiX,
  FiHome,
  FiTool,
  FiUser,
  FiUsers,
  FiBriefcase,
  FiHelpCircle,
  FiCreditCard,
  FiLogOut,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom"; // استخدمنا useLocation

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation(); 
  const navItems = [
    { name: "الرئيسية", icon: FiHome, path: "/" },
    { name: "مراجعة الحرفيين", icon: FiUser, path: "/review" },
    { name: "إدارة المستخدمين", icon: FiUsers, path: "/users" },
    { name: "إدارة الطلبات", icon: FiBriefcase, path: "/orders" },
    { name: "الشكاوى والدعم", icon: FiHelpCircle, path: "/support" },
    { name: "الطلبات المالية", icon: FiCreditCard, path: "/payments" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed md:sticky inset-y-0 right-0 z-50 w-auto bg-white transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "translate-x-full"} 
          md:translate-x-0 shadow-sm border-l border-[#E5EDF4] flex flex-col h-screen`}
      >
        <div className="flex items-center justify-between p-6 h-24 border-b border-[#E5EDF4] shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#E7F3FF] text-[#3B82F6] p-3 rounded-full flex items-center justify-center">
              <FiTool size={26} strokeWidth={1.5} />
            </div>
            <span className="text-2xl sm:flex  md:hidden lg:flex font-bold text-black leading-none">
              خدماتي
            </span>
          </div>
          <button
            title="حذف العنصر"
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-red-500 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-3 mt-1 overflow-y-auto">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path; // تحقق من المسار الحالي
            return (
              <Link
                onClick={toggleSidebar}
                key={index}
                to={item.path}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all h-[60px] ${
                  isActive
                    ? "bg-[#3B82F6] text-white shadow-md"
                    : "text-[#738398] hover:bg-[#F0F5FA] hover:text-black"
                }`}
              >
                <Icon size={22} className="shrink-0" />
                <span className="text-lg font-medium sm:flex  md:hidden lg:flex">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#E5EDF4] mt-auto">
          <button
            className="flex items-center gap-4 p-4 w-full text-[#DC2626] rounded-xl hover:bg-red-50 transition-colors h-[60px]"
            onClick={() => console.log("Logging out...")}
          >
            <FiLogOut size={22} className="shrink-0 " />
            <span className="text-lg sm:flex  md:hidden lg:flex font-medium">
              تسجيل الخروج
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
