import { motion } from "framer-motion";
import { IoSearchOutline, IoFilter, IoEyeOutline } from "react-icons/io5";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const requests = [
  {
    id: 1,
    name: "خالد جمال",
    profession: "سباكة",
    phone: "+20 100 987 6543",
    date: "15 مايو 2026",
    status: "قيد المراجعة",
    img: "https://i.pravatar.cc/150?u=11",
  },
  {
    id: 2,
    name: "مصطفى كمال",
    profession: "كهرباء",
    phone: "+20 112 555 4444",
    date: "14 مايو 2026",
    status: "قيد المراجعة",
    img: "https://i.pravatar.cc/150?u=12",
  },
  {
    id: 3,
    name: "عادل سمير",
    profession: "نجارة",
    phone: "+20 120 111 2222",
    date: "13 مايو 2026",
    status: "قيد المراجعة",
    img: "https://i.pravatar.cc/150?u=13",
  },
  {
    id: 4,
    name: "حسام الدين",
    profession: "صيانة تكييف",
    phone: "+20 155 999 8888",
    date: "12 مايو 2026",
    status: "تمت الموافقة",
    img: "https://i.pravatar.cc/150?u=14",
  },
  {
    id: 5,
    name: "رامي سعيد",
    profession: "نقاشة",
    phone: "+20 109 777 6666",
    date: "10 مايو 2026",
    status: "مرفوض",
    img: "https://i.pravatar.cc/150?u=15",
  },
];

export default function ReviewOfCraftsmen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-6 bg-[#fcfcfc] min-h-screen"
      dir="rtl"
    >
      {/* Header Search & Filter */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="بحث باسم الحرفي أو المهنة..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
          />
          <IoSearchOutline
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
        </div>
        <button className="border cursor-pointer border-gray-200 bg-white text-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all">
          <IoFilter size={18} />
          <span>تصفية</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-3">
            طلبات الانضمام
            <span className="bg-orange-50 text-orange-500 text-xs px-2 py-1 rounded-md font-bold">
              24 طلب معلق
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
          <table className="w-full text-right border-collapse min-w-[700px]">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-50">
                <th className="px-6 py-4 font-medium">الحرفي</th>
                <th className="px-6 py-4 font-medium">المهنة</th>
                <th className="px-6 py-4 font-medium">رقم الهاتف</th>
                <th className="px-6 py-4 font-medium">تاريخ التقديم</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {requests.map((request, index) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={request.img}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover grayscale-[0.5]"
                    />
                    <span className="font-medium text-gray-800">
                      {request.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50/50 text-slate-600 px-3 py-1 rounded-lg text-xs font-medium">
                      {request.profession}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 tracking-wide text-sm">
                    {request.phone}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {request.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                        request.status === "قيد المراجعة"
                          ? "bg-orange-50 text-orange-400 border border-orange-100"
                          : request.status === "تمت الموافقة"
                            ? "bg-green-50 text-green-500 border border-green-100"
                            : "bg-red-50 text-red-400 border border-red-100"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link to={`/detailsReview/${request.id}`}
                      title="عرض التفاصيل"
                      className="text-gray-300 hover:text-blue-500 cursor-pointer transition-all hover:scale-110"
                    >
                      <IoEyeOutline size={20} />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-4 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1 order-2 sm:order-1">
            <button
              title="Right"
              className="p-1 cursor-pointer border border-gray-200 rounded hover:bg-gray-50"
            >
              <HiChevronRight size={20} />
            </button>
            <button className="w-8 h-8 cursor-pointer border border-blue-600 flex items-center justify-center rounded bg-blue-600 text-white font-bold">
              1
            </button>
            <button className="w-8 h-8 cursor-pointer border border-gray-300 flex items-center justify-center rounded hover:bg-gray-50">
              2
            </button>
            <button className="w-8 h-8 cursor-pointer border border-gray-300 flex items-center justify-center rounded hover:bg-gray-50 text-gray-400">
              3
            </button>
            <span className="px-1 text-gray-300">...</span>
            <button
              title="Left"
              className="p-1 cursor-pointer border border-gray-200 rounded hover:bg-gray-50"
            >
              <HiChevronLeft size={20} />
            </button>
          </div>

          <div className="order-1 sm:order-2">
            عرض <span className="font-semibold text-gray-700">1</span> إلى{" "}
            <span className="font-semibold text-gray-700">5</span> من أصل{" "}
            <span className="font-semibold text-gray-700">24</span> طلب
          </div>
        </div>
      </div>
    </motion.div>
  );
}
