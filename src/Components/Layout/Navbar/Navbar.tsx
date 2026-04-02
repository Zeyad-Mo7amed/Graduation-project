import { FiSearch, FiBell, FiUser, FiMenu } from "react-icons/fi"; // أضفنا FiMenu هنا

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <nav className="bg-white h-20 border-b border-[#E5EDF4] flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          aria-label="فتح القائمة الجانبية"
          title="القائمة"
          className="md:hidden text-gray-600 ml-4 p-2 rounded-lg bg-[#F0F5FA] hover:bg-gray-200 transition-colors"
        >
          <FiMenu size={26} />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[#738398] text-lg hidden sm:inline">
            {`نظرة عامة -`}
          </span>
          <span className="text-[#3B82F6] text-lg font-bold">لوحة التحكم</span>
        </div>
      </div>

      <div className="flex  items-center gap-4">
        <div className="relative hidden md:flex w-full max-w-md" dir="rtl">
          <div className="absolute  inset-y-0 right-0 flex items-center pr-6 pointer-events-none text-[#8896AA]">
            <FiSearch size={20} strokeWidth={2} />
          </div>

          <input
            type="search"
            placeholder="البحث هنا..."
            className="w-full h-[45px] pr-16 pl-6 text-lg rounded-full 
                  bg-[#F0F5FA] text-[#2B323B] placeholder:text-[#8896AA]
                  border border-transparent transition-all
                  focus:outline-none focus:bg-white focus:border-blue-300
                  focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="relative p-2 bg-[#F8FAFC] rounded-full text-gray-500 cursor-pointer hover:bg-gray-100 transition-all">
          <FiBell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </div>

        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border border-gray-100 cursor-pointer hover:border-[#3B82F6] transition-all">
          <FiUser size={24} />
        </div>
      </div>
    </nav>
  );
}
