import { FiSearch, FiFilter, FiEye } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { MdFiberManualRecord } from "react-icons/md";
import { Link } from "react-router-dom";
import { GetAllComplaints } from "../../APIs/GetAllComplaints.api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Shared/Loading/Loading";
import { useState } from "react";

// --- TypeScript Interfaces ---
interface Complaint {
  id: number;
  orderId: number;
  title: string;
  userName: string;
  userRole: string;
  status: string; // تم التغيير إلى string ليتوافق مع الـ API (Submitted, Resolved, etc)
  createdAt: string;
  response: string | null;
  userId: string;
}

export default function Support() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: allComplaints, isLoading: isAllComplaintsLoading } =
    useQuery<any>({
      queryKey: ["allComplaints"],
      queryFn: GetAllComplaints,
    });

  // استخراج المصفوفة الأساسية
  const complaintsData: Complaint[] = Array.isArray(allComplaints)
    ? allComplaints
    : allComplaints?.data || [];

  const apiTotalPages =
    allComplaints?.totalPages || Math.ceil(complaintsData.length / 10) || 1;
  const totalCount = allComplaints?.totalCount || complaintsData.length;

  const renderPagination = () => {
    const pages: (number | string)[] = [];

    if (apiTotalPages <= 2) {
      for (let i = 1; i <= apiTotalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2);
      if (apiTotalPages > 2) {
        pages.push("...");
        pages.push(apiTotalPages);
      }
    }
    return pages;
  };

  if (isAllComplaintsLoading) {
    return <Loading />;
  }

  // Helper Styles - التعامل مع الحالة بنظام الـ String
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Submitted":
        return "text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
      case "InReview": // أو أي حالة وسيطة تانية بيرجعها الـ API عندك
      case "UnderProcess":
        return "text-amber-500 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400";
      case "Resolved":
      case "Closed":
        return "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400";
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "Submitted":
        return "مفتوحة";
      case "Resolved":
        return "محلولة";
      case "Closed":
        return "مغلقة";
      case "InReview":
        return "قيد المراجعة";
      default:
        return status; // يعرض النص القادم من الـ API لو غير معروف
    }
  };

  return (
    <div
      className="p-4 md:p-6 bg-[#f9fafb] dark:bg-[#0f172a] min-h-screen transition-colors duration-300"
      dir="rtl"
    >
      {/* Search & Filter Section */}
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
        <div className="p-5 border-b border-gray-50 dark:border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base md:text-lg font-bold text-gray-800 dark:text-slate-100">
              تذاكر الدعم الفني
            </h2>
            <span className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1">
              <MdFiberManualRecord className="size-3 animate-pulse" />
              {
                complaintsData.filter((c) => c.status === "Submitted").length
              }{" "}
              تذكرة مفتوحة
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                <th className="p-4 whitespace-nowrap">رقم التذكرة</th>
                <th className="p-4 whitespace-nowrap">مقدم الشكوى</th>
                <th className="p-4 whitespace-nowrap">الطلب المرتبط</th>
                <th className="p-4 whitespace-nowrap">عنوان الشكوى</th>
                <th className="p-4 whitespace-nowrap">التاريخ</th>
                <th className="p-4 text-center whitespace-nowrap">الحالة</th>
                <th className="p-4 text-center whitespace-nowrap">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-700/50">
              {complaintsData.map((complaint) => (
                <tr
                  key={complaint.id}
                  className="hover:bg-gray-50/40 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="p-4 font-bold text-xs md:text-sm text-gray-900 dark:text-slate-200">
                    TCK-{complaint.id}
                  </td>
                  <td className="p-4 text-gray-800 dark:text-slate-300">
                    <div className="flex items-center gap-2 md:gap-3 text-right min-w-[120px]">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-200 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 overflow-hidden flex-shrink-0">
                        <img
                          src={`https://ui-avatars.com/api/?name=${complaint.userName}&background=random&color=fff`}
                          alt=""
                        />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-xs md:text-sm leading-tight truncate">
                          {complaint.userName}
                        </div>
                        <div
                          className={`text-[9px] md:text-[10px] font-bold ${complaint.userRole === "Client" ? "text-blue-500" : "text-purple-400"}`}
                        >
                          {complaint.userRole === "Client"
                            ? "عميل"
                            : complaint.userRole}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 dark:text-slate-500 text-[13px] whitespace-nowrap">
                    ORD-{complaint.orderId}
                  </td>
                  <td className="p-4 text-xs md:text-sm font-medium text-gray-700 dark:text-slate-300 max-w-[200px] truncate">
                    {complaint.title}
                  </td>
                  <td className="p-4 text-[11px] text-gray-400 dark:text-slate-500 whitespace-nowrap">
                    {new Date(complaint.createdAt).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-block px-2 md:px-3 py-1 rounded-md text-[9px] md:text-[11px] font-bold shadow-sm whitespace-nowrap ${getStatusStyle(complaint.status)}`}
                    >
                      {getStatusText(complaint.status)}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Link
                      to={`/SupportDetails/${complaint.id}`}
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

        {/* Pagination Section */}
        <div className="p-4 bg-white dark:bg-[#1e293b] flex flex-col sm:row sm:flex-row items-center justify-between border-t border-gray-50 dark:border-slate-700/50 gap-4">
          <div className="text-[10px] md:text-xs font-medium text-gray-400 dark:text-slate-500 order-2 sm:order-1">
            عرض{" "}
            <span className="text-gray-700 dark:text-slate-300 font-bold">
              {complaintsData.length}
            </span>{" "}
            من{" "}
            <span className="text-gray-700 dark:text-slate-300 font-bold">
              {totalCount}
            </span>{" "}
            تذكرة
          </div>
          <div className="flex items-center gap-2 order-1 md:order-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2.5 cursor-pointer border-gray-200 dark:border-slate-800 border rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-400 transition-all active:scale-90 disabled:opacity-50"
            >
              <HiChevronRight size={20} />
            </button>
            <div className="flex gap-1.5">
              {renderPagination().map((page, i) => (
                <button
                  key={i}
                  disabled={page === "..."}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  className={`w-9 h-9 border flex items-center justify-center rounded-xl text-sm font-bold transition-all active:scale-90 
                    ${page === "..." ? "cursor-default border-transparent" : "cursor-pointer"}
                    ${
                      page === currentPage
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                        : "border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 bg-white dark:bg-[#0F172A]"
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === apiTotalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, apiTotalPages))
              }
              className="p-2.5 cursor-pointer border border-gray-200 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-400 transition-all active:scale-90 disabled:opacity-50"
            >
              <HiChevronLeft size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
