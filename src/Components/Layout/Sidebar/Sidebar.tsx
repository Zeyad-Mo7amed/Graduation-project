import {
  FiX,
  FiHome,
  FiTool,
  FiUser,
  FiUsers,
  FiBriefcase,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { name: "الرئيسية", icon: FiHome, path: "/" },
    { name: "مراجعة الحرفيين", icon: FiUser, path: "/review" },
    { name: "إدارة المستخدمين", icon: FiUsers, path: "/users" },
    { name: "إدارة الطلبات", icon: FiBriefcase, path: "/orders" },
    { name: "الشكاوى والدعم", icon: FiHelpCircle, path: "/support" },
    {
      name: " نتايج مراجعه التقيمات ",
      icon: FiHelpCircle,
      path: "/ReviewTheRatings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
    window.location.reload();
  };

  return (
    <>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/60 z-40 md:hidden transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed md:sticky inset-y-0 right-0 z-50 w-auto bg-white dark:bg-[#111827] transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "translate-x-full"} 
          md:translate-x-0 shadow-sm border-l border-[#E5EDF4] dark:border-gray-800 flex flex-col h-screen`}
      >

        <div className="flex items-center justify-between p-6 h-24 border-b border-[#E5EDF4] dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#E7F3FF] dark:bg-[#1e293b] text-[#3B82F6] p-3 rounded-[15px] flex items-center justify-center">
              <FiTool size={26} strokeWidth={1.5} />
            </div>
            <span className="text-2xl sm:flex md:hidden lg:flex font-bold text-black dark:text-white leading-none">
              خدماتي
            </span>
          </div>
          <button
            title="إغلاق"
            onClick={toggleSidebar}
            className="md:hidden cursor-pointer text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-3 mt-1 overflow-y-auto">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                onClick={toggleSidebar}
                key={index}
                to={item.path}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all h-[60px] ${
                  isActive
                    ? "bg-[#3B82F6] text-white shadow-md"
                    : "text-[#738398] dark:text-gray-400 hover:bg-[#F0F5FA] dark:hover:bg-[#1f2937] hover:text-black dark:hover:text-white"
                }`}
              >
                <Icon size={22} className="shrink-0" />
                <span className="text-lg font-medium sm:flex md:hidden lg:flex">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>


        <div className="p-6 border-t border-[#E5EDF4] dark:border-gray-800 mt-auto">
          <button
            className="flex items-center gap-4 p-4 w-full text-[#DC2626] dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors h-[60px] cursor-pointer"
            onClick={handleLogout}
          >
            <FiLogOut size={22} className="shrink-0 " />
            <span className="text-lg sm:flex md:hidden lg:flex font-medium">
              تسجيل الخروج
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
