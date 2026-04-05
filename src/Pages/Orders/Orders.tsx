import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaRegEye,
  FaRegEdit,
} from "react-icons/fa";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import { motion } from "framer-motion"; // ضيف دي عشان الأنميشن
import { Link } from "react-router-dom";

export default function Orders() {
  const orders = [
    {
      id: "10025",
      customer: "محمد عبدالله",
      service: "سباكة",
      technician: "أحمد حسن",
      date: "12 مايو 2026، 10:30 ص",
      price: "150 ج.م",
      status: "مكتمل",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: "10026",
      customer: "سارة خليل",
      service: "كهرباء",
      technician: "بانتظار التعيين",
      date: "12 مايو 2026، 11:15 ص",
      price: "200 ج.م",
      status: "جاري البحث عن فني",
      statusColor: "bg-blue-100 text-blue-700",
    },
    {
      id: "10027",
      customer: "يوسف إبراهيم",
      service: "تنظيف",
      technician: "محمود علي",
      date: "12 مايو 2026، 12:00 م",
      price: "350 ج.م",
      status: "قيد التنفيذ",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
    {
      id: "10028",
      customer: "فاطمة سعيد",
      service: "نجارة",
      technician: "مصطفى كمال",
      date: "11 مايو 2026، 02:45 م",
      price: "1,200 ج.م",
      status: "ملغي",
      statusColor: "bg-red-100 text-red-700",
    },
  ];



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-sm font-sans"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg md:text-xl font-bold text-slate-800">
            جميع الطلبات
          </h1>
          <span className="bg-blue-50 text-blue-500 px-3 py-1 rounded-full text-xs font-bold">
            1,024 طلب
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <div className="relative flex-grow md:flex-grow-0">
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="ابحث برقم الطلب..."
              className="pr-11 pl-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm w-full md:w-64 lg:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-gray-400"
            />
          </div>
          <button className="flex items-center justify-center gap-2 flex-1 md:flex-none px-4 py-2.5 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 active:scale-95 transition-all duration-200">
            <FaFilter className="text-xs" />
            تصفية
          </button>
          <button className="flex items-center justify-center gap-2 flex-1 md:flex-none px-4 py-2.5 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-green-400 hover:text-green-600 active:scale-95 transition-all duration-200">
            <FaDownload className="text-xs" />
            تصدير
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-xl border border-gray-50">
        <table className="w-full text-right min-w-[900px]">
          <thead>
            <tr className="text-slate-500 bg-[#f7f8fa] text-[13px]">
              <th className="p-4 font-bold rounded-tr-xl">رقم الطلب</th>
              <th className="p-4 font-bold">العميل</th>
              <th className="p-4 font-bold">الخدمة</th>
              <th className="p-4 font-bold">الفني / الحرفي</th>
              <th className="p-4 font-bold">التاريخ والوقت</th>
              <th className="p-4 font-bold">التكلفة</th>
              <th className="p-4 font-bold text-center">الحالة</th>
              <th className="p-4 font-bold text-center rounded-tl-xl">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-blue-50/30 transition-colors group cursor-default"
              >
                <td className="p-4 text-[14px] font-bold text-slate-700">
                  #{order.id}
                </td>
                <td className="p-4 text-[14px] text-slate-600 font-medium">
                  {order.customer}
                </td>
                <td className="p-4 text-[14px] text-slate-600">
                  {order.service}
                </td>
                <td className="p-4 text-[14px] text-slate-500">
                  {order.technician}
                </td>
                <td className="p-4 text-[13px] text-gray-400 font-medium">
                  {order.date}
                </td>
                <td className="p-4 text-[15px] font-bold text-slate-900">
                  {order.price}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[11px] font-bold inline-block min-w-[110px] shadow-sm ${order.statusColor}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        to={`/detailsOrder/${order.id}`}

                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200 inline-block"
                      >
                        <FaRegEye size={18} />
                      </Link>
                    </motion.div>
                    <button className="p-2 text-gray-400 hover:text-slate-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
                      <FaRegEdit size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-50 gap-6">
        <div className="text-sm font-medium order-2 md:order-1">
          <span className="text-gray-400">عرض </span>
          <span className="text-slate-800 font-bold px-0.5">1</span>
          <span className="text-gray-400"> إلى </span>
          <span className="text-slate-800 font-bold px-0.5">6</span>
          <span className="text-gray-400"> من أصل </span>
          <span className="text-slate-800 font-bold px-0.5">1,024</span>
        </div>

        <div className="flex items-center gap-2 order-1 md:order-2">
          <button className="p-2.5 cursor-pointer border-gray-200 border rounded-xl hover:bg-gray-50 hover:border-blue-400 text-gray-400 transition-all active:scale-90">
            <HiChevronRight size={20} />
          </button>
          <div className="flex gap-1.5">
            {[1, 2, 3, "...", 24].map((page, i) => (
              <button
                key={i}
                className={`w-9 h-9 border cursor-pointer flex items-center justify-center rounded-xl text-sm font-bold transition-all active:scale-90 
                  ${
                    page === 1
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                      : "border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 bg-white"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="p-2.5 cursor-pointer border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-400 text-gray-400 transition-all active:scale-90">
            <HiChevronLeft size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
