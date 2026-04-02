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
import { Link } from "react-router-dom";

// استقبلنا isOpen و toggleSidebar من الأب (MainLayout)
export default function Sidebar({ isOpen, toggleSidebar }) {
  const navItems = [
    { name: "الرئيسية", icon: FiHome, isActive: true },
    { name: "مراجعة الحرفيين", icon: FiUser },
    { name: "إدارة المستخدمين", icon: FiUsers },
    { name: "إدارة الطلبات", icon: FiBriefcase },
    { name: "الشكاوى والدعم", icon: FiHelpCircle },
    { name: "الطلبات المالية", icon: FiCreditCard },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed md:sticky inset-y-0 right-0 z-50 w-auto bg-white transform transition-transform duration-300 
  ${isOpen ? "translate-x-0" : "translate-x-full"} 
  md:translate-x-0 shadow-sm border-l border-[#E5EDF4] flex flex-col h-screen`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 h-24 border-b border-[#E5EDF4] shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#E7F3FF] text-[#3B82F6] p-3 rounded-full flex items-center justify-center">
              <FiTool size={26} strokeWidth={1.5} />
            </div>
            <span className="text-2xl sm:flex  md:hidden lg:flex font-bold text-black leading-none">
              خدماتي
            </span>
          </div>
          {/* زر إغلاق السايد بار في الموبايل */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-red-500 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-6 space-y-3 mt-1 overflow-y-auto">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to="#"
                className={`flex items-center gap-4 p-4 rounded-xl transition-all h-[60px] ${
                  item.isActive
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

        {/* زر تسجيل الخروج */}
        <div className="p-6 border-t border-[#E5EDF4] mt-auto">
          <button
            className="flex items-center gap-4 p-4 w-full text-[#DC2626] rounded-xl hover:bg-red-50 transition-colors h-[60px]"
            onClick={() => console.log("Logging out...")}
          >
            <FiLogOut size={22} className="shrink-0 scale-x-[-1]" />
            <span className="text-lg sm:flex  md:hidden lg:flex font-medium">
              تسجيل الخروج
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
