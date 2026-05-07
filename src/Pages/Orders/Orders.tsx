import { useState } from "react";
import { FaSearch, FaFilter, FaDownload, FaRegEye } from "react-icons/fa";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GetAllOrder } from "../../APIs/GetAllOrder.api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Shared/Loading/Loading";
import NotFoundData from "../../Components/Shared/NotFoundData/NotFoundData";
import type { Order } from "../../interfaces/interfaces";

export default function Orders() {
  // 1. جلب البيانات
  const { data: orderData, isLoading: isLoadingOrder } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: GetAllOrder,
  });

  // 2. منطق البحث
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders =
    orderData?.filter((order) => order.id.toString().includes(searchTerm)) ||
    [];

  // 3. منطق الترقيم (Pagination) - تم التعديل لعرض 5 عناصر
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // دالة توليد أرقام الصفحات المطورة (لو عدي صفحة 2 يظهر الـ ...)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  // 4. تنسيق الألوان والحالات المطلوبة
  const getStatusStyles = (state: string) => {
    switch (state) {
      case "Completed":
        return "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400";
      case "Pending":
        return "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-500";
      case "Rejected":
      case "Cancelled":
        return "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
    }
  };

  const translateStatus = (state: string) => {
    const statuses: Record<string, string> = {
      Completed: "مكتمل",
      Pending: "قيد التنفيذ",
      Rejected: "تم الرفض",
      Cancelled: "تم إلغاؤه",
    };
    return statuses[state] || state;
  };

  if (isLoadingOrder) return <Loading />;
  if (!orderData || orderData.length === 0) return <NotFoundData />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1E293B] p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
            جميع الطلبات
          </h1>
          <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">
            {filteredOrders.length} طلب
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <div className="relative flex-grow md:flex-grow-0">
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm" />
            <input
              type="text"
              placeholder="ابحث برقم الطلب..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pr-11 pl-4 py-2.5 bg-gray-50/50 dark:bg-[#0F172A] border border-gray-200 dark:border-slate-800 dark:text-white rounded-2xl text-sm w-full md:w-64 lg:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-gray-400"
            />
          </div>
          <button className="flex cursor-pointer items-center justify-center gap-2 flex-1 md:flex-none px-4 py-2.5 border border-gray-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-200">
            <FaFilter className="text-xs" /> تصفية
          </button>
          <button className="flex cursor-pointer items-center justify-center gap-2 flex-1 md:flex-none px-4 py-2.5 border border-gray-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-200">
            <FaDownload className="text-xs" /> تصدير
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-xl border border-gray-50 dark:border-slate-800">
        <table className="w-full text-right min-w-[900px]">
          <thead>
            <tr className="text-slate-500 dark:text-slate-400 bg-[#f7f8fa] dark:bg-[#0F172A] text-[13px]">
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
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group cursor-default"
                >
                  <td className="p-4 text-[14px] font-bold text-slate-700 dark:text-slate-200">
                    #{order.id}
                  </td>
                  <td className="p-4 text-[14px] text-slate-600 dark:text-slate-400 font-medium">
                    {order.nameCli || "غير معروف"}
                  </td>
                  <td className="p-4 text-[14px] text-slate-600 dark:text-slate-400">
                    {order.serviceName}
                  </td>
                  <td className="p-4 text-[14px] text-slate-500 dark:text-slate-500">
                    {order.nameTec || "بانتظار التعيين"}
                  </td>
                  <td className="p-4 text-[13px] text-gray-400 dark:text-gray-500 font-medium">
                    {new Date(order.createdAt).toLocaleString("ar-EG")}
                  </td>
                  <td className="p-4 text-[15px] font-bold text-slate-900 dark:text-white">
                    {order.finalPrice} ج.م
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold inline-block min-w-[110px] shadow-sm ${getStatusStyles(order.state)}`}
                    >
                      {translateStatus(order.state)}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Link
                      to={`/detailsOrder/${order.id}`}
                      className="p-2 text-gray-400 hover:text-blue-500 inline-block"
                    >
                      <FaRegEye size={18} />
                    </Link>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-10 text-center text-gray-400">
                  لا توجد طلبات تطابق بحثك
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-50 dark:border-slate-800 gap-6">
        <div className="flex items-center gap-2 order-1 md:order-2">
          <button
            title="Right"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2.5 cursor-pointer border-gray-200 dark:border-slate-800 border rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-blue-400 text-gray-400 dark:text-slate-500 transition-all active:scale-90 disabled:opacity-50"
          >
            <HiChevronRight size={20} />
          </button>

          <div className="flex gap-1.5">
            {getPageNumbers().map((page, i) => (
              <button
                key={i}
                disabled={page === "..."}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                className={`w-9 h-9 border cursor-pointer flex items-center justify-center rounded-xl text-sm font-bold transition-all
                  ${page === currentPage ? "bg-blue-600 text-white border-blue-600 shadow-md" : "border-gray-200 dark:border-slate-800 text-gray-500 hover:border-blue-300 bg-white dark:bg-[#0F172A]"}
                  ${page === "..." ? "cursor-default border-none" : ""}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            title="Left"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2.5 cursor-pointer border-gray-200 dark:border-slate-800 border rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-blue-400 text-gray-400 dark:text-slate-500 transition-all active:scale-90 disabled:opacity-50"
          >
            <HiChevronLeft size={20} />
          </button>
        </div>

        <div className="text-sm font-medium order-2 md:order-1">
          <span className="text-gray-400 dark:text-slate-500">عرض </span>
          <span className="text-slate-800 dark:text-slate-200 font-bold px-0.5">
            {filteredOrders.length > 0 ? indexOfFirstItem +1 : 0}
          </span>
          <span className="text-gray-400 dark:text-slate-500"> إلى </span>
          <span className="text-slate-800 dark:text-slate-200 font-bold px-0.5">
            {Math.min(indexOfLastItem, filteredOrders.length)}
          </span>
          <span className="text-gray-400 dark:text-slate-500"> من أصل </span>
          <span className="text-slate-800 dark:text-slate-200 font-bold px-0.5">
            {filteredOrders.length}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
