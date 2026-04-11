import {
  IoEyeOutline,
  IoSearchOutline,
  IoFilter,
  IoAdd,
} from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const customers = [
  {
    id: 1,
    name: "أحمد حسن",
    phone: "+20 100 123 4567",
    location: "المعادي، القاهرة",
    date: "12 مايو 2026",
    orders: 15,
    status: "نشط",
    img: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    name: "سارة محمود",
    phone: "+20 112 345 6789",
    location: "مدينة نصر، القاهرة",
    date: "10 مايو 2026",
    orders: 4,
    status: "نشط",
    img: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    name: "محمود عبدالعزيز",
    phone: "+20 120 987 6543",
    location: "سموحة، الإسكندرية",
    date: "01 مايو 2026",
    orders: 0,
    status: "محظور",
    img: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: 4,
    name: "ليلى سعيد",
    phone: "+20 155 444 3333",
    location: "الشيخ زايد، الجيزة",
    date: "28 أبريل 2026",
    orders: 22,
    status: "نشط",
    img: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: 5,
    name: "عمر فاروق",
    phone: "+20 109 888 7777",
    location: "المهندسين، الجيزة",
    date: "20 أبريل 2026",
    orders: 8,
    status: "نشط",
    img: "https://i.pravatar.cc/150?u=5",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Users() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6 bg-[#fcfcfc] dark:bg-[#0F172A] min-h-screen transition-colors duration-300"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full lg:w-1/3">
          <input
            type="text"
            placeholder="بحث برقم الهاتف أو اسم العميل..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
          />
          <IoSearchOutline
            className="absolute left-3 top-3 text-gray-400 dark:text-gray-500"
            size={18}
          />
        </div>

        <div className="flex gap-2 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none bg-[#3b82f6] cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 text-sm md:text-base">
            <IoAdd size={20} />
            <span className="whitespace-nowrap">إضافة مستخدم</span>
          </button>
          <button className="border cursor-pointer border-gray-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all active:scale-95">
            <IoFilter size={18} />
            <span>تصفية</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            قائمة العملاء
            <span className="hidden sm:inline-block text-sm font-normal text-gray-400 dark:text-slate-500 mr-2">
              1,250 عميل
            </span>
          </h2>
        </div>

        {/* Scrollable Wrapper - Handle Table Overflow */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-700">
          <table className="w-full text-right border-collapse min-w-full">
            <thead>
              <tr className="text-gray-500 dark:text-slate-400 text-sm border-b border-gray-50 dark:border-slate-800">
                <th className="px-6 py-4 font-medium">العميل</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">
                  رقم الهاتف
                </th>
                <th className="px-6 py-4 font-medium hidden lg:table-cell">
                  المنطقة
                </th>
                <th className="px-6 py-4 font-medium hidden sm:table-cell">
                  التاريخ
                </th>
                <th className="px-6 py-4 font-medium">الطلبات</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium text-center">الإجراءات</th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-gray-50 dark:divide-slate-800"
            >
              {customers.map((customer) => (
                <motion.tr
                  variants={itemVariants}
                  key={customer.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={customer.img}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover border border-gray-100 dark:border-slate-700 shrink-0"
                    />
                    <span className="font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {customer.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 tracking-wide whitespace-nowrap hidden md:table-cell">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-500 text-sm hidden lg:table-cell">
                    {customer.location}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-500 text-sm hidden sm:table-cell">
                    {customer.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-bold">
                      {customer.orders}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-md text-[11px] font-bold inline-block whitespace-nowrap ${
                        customer.status === "نشط"
                          ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                          : "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3 md:gap-4 text-gray-400 dark:text-slate-600">
                      <Link
                        to={`/DetailsUsers/${customer.id}`}
                        title="عرض التفاصيل"
                        className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-all hover:scale-110"
                      >
                        <IoEyeOutline size={20} />
                      </Link>
                      <button
                        title="حظر العميل"
                        className={`hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-all hover:scale-110 ${customer.status === "محظور" ? "text-red-300 dark:text-red-900" : ""}`}
                      >
                        <MdBlock size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-4 border-t border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-slate-500">
          <div className="flex items-center gap-1 order-2 sm:order-1">
            <button
              title="HiChevronRight"
              className="p-1 border border-gray-200 dark:border-slate-800 rounded hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              <HiChevronRight size={20} />
            </button>
            <button className="w-8 h-8 border border-blue-600 flex items-center justify-center rounded bg-blue-600 text-white font-bold">
              1
            </button>
            <button className="w-8 h-8 border border-gray-300 dark:border-slate-800 flex items-center justify-center rounded hover:bg-gray-50 dark:hover:bg-slate-800">
              2
            </button>
            <button className="w-8 h-8 border border-gray-300 dark:border-slate-800 flex items-center justify-center rounded hover:bg-gray-50 dark:hover:bg-slate-800">
              3
            </button>
            <button
              title="HiChevronLeft"
              className="p-1 border border-gray-200 dark:border-slate-800 rounded hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              <HiChevronLeft size={20} />
            </button>
          </div>

          <div className="order-1 sm:order-2 text-xs md:text-sm">
            عرض{" "}
            <span className="font-semibold text-gray-700 dark:text-slate-200">
              1
            </span>{" "}
            إلى{" "}
            <span className="font-semibold text-gray-700 dark:text-slate-200">
              5
            </span>{" "}
            من أصل{" "}
            <span className="font-semibold text-gray-700 dark:text-slate-200">
              1,250
            </span>{" "}
            عميل
          </div>
        </div>
      </div>
    </motion.div>
  );
}
