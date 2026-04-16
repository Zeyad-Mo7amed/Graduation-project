import {
  FiSearch,
  FiFilter,
  FiEye,
} from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { MdFiberManualRecord } from "react-icons/md";
import { Link } from "react-router-dom";

const tickets = [
  {
    id: "TCK-501",
    user: "محمد عبد الله",
    role: "عميل",
    order: "ORD-10025",
    subject: "تأخر الفني عن الموعد المحدد",
    date: "15 أبريل 2026, 10:30 ص",
    status: "مفتوحة",
    statusColor: "text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
  },
  {
    id: "TCK-502",
    user: "محمود صبحي",
    role: "فني",
    order: "ORD-10018",
    subject: "العميل يرفض دفع المبلغ الإضافي",
    date: "14 أبريل 2026, 04:15 م",
    status: "قيد المعالجة",
    statusColor:
      "text-amber-500 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400",
  },
  {
    id: "TCK-503",
    user: "سارة أحمد",
    role: "عميل",
    order: "ORD-09980",
    subject: "جودة الخدمة غير مطابقة للتوقعات",
    date: "12 أبريل 2026, 02:00 م",
    status: "مغلقة",
    statusColor:
      "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
  },
  {
    id: "TCK-504",
    user: "عادل إمام",
    role: "فني",
    order: "ORD-09855",
    subject: "طلب تغيير موقع العمل بعد الوصول",
    date: "10 أبريل 2026, 11:45 ص",
    status: "مغلقة",
    statusColor:
      "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
  },
];

export default function Support() {
  return (
    <div
      className="p-4 md:p-6 bg-[#f9fafb] dark:bg-[#0f172a] min-h-screen transition-colors duration-300"
      dir="rtl"
    >
      {/* Search & Filter Section - Adjusted for Mobile */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-100 dark:border-slate-700/50">
        <div className="relative w-full md:flex-1">
          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 size-5" />
          <input
            type="text"
            placeholder="بحث برقم التذكرة أو اسم صاحب الشكوى..."
            className="w-full pr-10 pl-4 py-2 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-slate-200 text-sm"
          />
        </div>
        <button className="w-full cursor-pointer md:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-gray-100 dark:border-slate-700 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all bg-white dark:bg-[#1e293b]">
          <FiFilter className="size-4" />
          <span className="text-sm font-bold">تصفية</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-100 dark:border-slate-700/50 overflow-hidden">
        {/* Title */}
        <div className="p-5 border-b border-gray-50 dark:border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base md:text-lg font-bold text-gray-800 dark:text-slate-100">
              تذاكر الدعم الفني
            </h2>
            <span className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1">
              <MdFiberManualRecord className="size-3 animate-pulse" />
              12 تذكرة مفتوحة
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                <th className="p-4 whitespace-nowrap">رقم التذكرة</th>
                <th className="p-4 whitespace-nowrap">مقدم الشكوى</th>
                <th className="p-4 hidden lg:table-cell whitespace-nowrap">
                  الطلب المرتبط
                </th>
                <th className="p-4 hidden md:table-cell whitespace-nowrap">
                  عنوان الشكوى
                </th>
                <th className="p-4 hidden xl:table-cell whitespace-nowrap">
                  التاريخ
                </th>
                <th className="p-4 text-center whitespace-nowrap">الحالة</th>
                <th className="p-4 text-center whitespace-nowrap">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-700/50">
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50/40 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="p-4 font-bold text-xs md:text-sm text-gray-900 dark:text-slate-200">
                    {ticket.id}
                  </td>
                  <td className="p-4 text-gray-800 dark:text-slate-300">
                    <div className="flex items-center gap-2 md:gap-3 text-right min-w-[120px]">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-200 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 overflow-hidden flex-shrink-0">
                        <img
                          src={`https://ui-avatars.com/api/?name=${ticket.user}&background=random&color=fff`}
                          alt=""
                        />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-xs md:text-sm leading-tight truncate">
                          {ticket.user}
                        </div>
                        <div
                          className={`text-[9px] md:text-[10px] font-bold ${ticket.role === "عميل" ? "text-blue-500" : "text-purple-400"}`}
                        >
                          {ticket.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell text-gray-400 dark:text-slate-500 text-[13px] whitespace-nowrap">
                    {ticket.order}
                  </td>
                  <td className="p-4 hidden md:table-cell text-xs md:text-sm font-medium text-gray-700 dark:text-slate-300 max-w-[200px] truncate">
                    {ticket.subject}
                  </td>
                  <td className="p-4 hidden xl:table-cell text-[11px] text-gray-400 dark:text-slate-500 whitespace-nowrap">
                    {ticket.date}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-block px-2 md:px-3 py-1 rounded-md text-[9px] md:text-[11px] font-bold shadow-sm whitespace-nowrap ${ticket.statusColor}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Link
                      to={`/SupportDetails/${ticket.id}`} // ضيفنا / والـ { } جوه الباكتيكس
                      className="text-gray-300 cursor-pointer dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <FiEye className="size-4 md:size-5 mx-auto" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - Adjusted for Mobile */}
        <div className="p-4 bg-white dark:bg-[#1e293b] flex flex-col sm:row sm:flex-row items-center justify-between border-t border-gray-50 dark:border-slate-700/50 gap-4">
          <div className="text-[10px] md:text-xs font-medium text-gray-400 dark:text-slate-500 order-2 sm:order-1">
            عرض 1 إلى 4 من{" "}
            <span className="text-gray-700 dark:text-slate-300 font-bold">
              45
            </span>{" "}
            تذكرة
          </div>
          <div className="flex items-center gap-2 order-1 md:order-2">
                    <button
                      title="HiChevronRight"
                      className="p-2.5 cursor-pointer border-gray-200 dark:border-slate-800 border rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-blue-400 text-gray-400 dark:text-slate-500 transition-all active:scale-90"
                    >
                      <HiChevronRight size={20} />
                    </button>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, "...", 24].map((page, i) => (
                        <button
                          key={i}
                          className={`w-9 h-9 border cursor-pointer flex items-center justify-center rounded-xl text-sm font-bold transition-all active:scale-90 
                            ${
                              page === 1
                                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100 dark:shadow-none"
                                : "border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 bg-white dark:bg-[#0F172A]"
                            }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      title="HiChevronLeft"
                      className="p-2.5 cursor-pointer border border-gray-200 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-blue-400 text-gray-400 dark:text-slate-500 transition-all active:scale-90"
                    >
                      <HiChevronLeft size={20} />
                    </button>
                  </div>
        </div>
      </div>
    </div>
  );
}
