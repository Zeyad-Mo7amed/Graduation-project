import { motion } from "framer-motion";
import { IoSearchOutline, IoFilter, IoEyeOutline } from "react-icons/io5";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import type { Technician } from "../../interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
import { getAllTechnicians } from "../../APIs/GetAllTechnicians.api";
import Loading from "../../Components/Shared/Loading/Loading";
import NotFoundData from "../../Components/Shared/NotFoundData/NotFoundData";
import { useState } from "react";

export default function ReviewOfCraftsmen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: allTechData, isLoading: isLoadingAllTech } = useQuery<
    Technician[]
  >({
    queryKey: ["GetAllTechnicians"],
    queryFn: getAllTechnicians,
  });

  if (isLoadingAllTech) return <Loading />;

  // 1. الفلترة بناءً على البحث
  const filteredData =
    allTechData?.filter((tech) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        tech.fullname.toLowerCase().includes(searchTerm) ||
        tech.serviceCategory.toLowerCase().includes(searchTerm)
      );
    }) || [];

  // 2. حسابات الصفحات
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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

  const hasData = currentItems.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-6 bg-[#fcfcfc] dark:bg-[#0F172A] min-h-screen transition-colors duration-300"
      dir="rtl"
    >
      {/* Header Search & Filter */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="بحث باسم الحرفي أو المهنة..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-400"
          />
          <IoSearchOutline
            className="absolute left-3 top-3 text-gray-400 dark:text-gray-500"
            size={18}
          />
        </div>
        <button className="border cursor-pointer border-gray-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
          <IoFilter size={18} />
          <span>تصفية</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-3">
            طلبات الانضمام
            <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400 text-xs px-2 py-1 rounded-md font-bold">
              {totalItems} طلب
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
          {!hasData ? (
            <NotFoundData />
          ) : (
            <table className="w-full text-right border-collapse min-w-[700px]">
              <thead>
                <tr className="text-gray-400 dark:text-gray-500 text-sm border-b border-gray-50 dark:border-slate-800">
                  <th className="px-6 py-4 font-medium">الحرفي</th>
                  <th className="px-6 py-4 font-medium">المهنة</th>
                  <th className="px-6 py-4 font-medium">عدد سنوات الخبرة</th>
                  <th className="px-6 py-4 font-medium">تاريخ التقديم</th>
                  <th className="px-6 py-4 font-medium">الحالة</th>
                  <th className="px-6 py-4 font-medium text-center">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                {currentItems.map((tech, index) => (
                  <motion.tr
                    key={tech.userId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={tech.profileImageURL.replace(
                          "localhost:7048//",
                          "localhost:7048/",
                        )}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${tech.fullname}&background=random`;
                        }}
                      />
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {tech.fullname}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50/50 dark:bg-blue-900/20 text-slate-600 dark:text-blue-400 px-3 py-1 rounded-lg text-xs font-medium border dark:border-blue-900/30">
                        {tech.serviceCategory}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 tracking-wide text-sm">
                      {tech.experienceYears} سنوات
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-500 text-sm">
                      {new Date(tech.createdAt).toLocaleDateString("ar-EG", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                          !tech.isActive
                            ? "bg-orange-50 dark:bg-orange-900/20 text-orange-400 border border-orange-100 dark:border-orange-900/30"
                            : "bg-green-50 dark:bg-green-900/20 text-green-500 border border-green-100 dark:border-green-900/30"
                        }`}
                      >
                        {tech.isActive ? "تمت الموافقة" : "قيد المراجعة"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/detailsReview/${tech.userId}`}
                        className="text-gray-300 dark:text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:scale-110 inline-block"
                      >
                        <IoEyeOutline size={20} />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Section */}
        <div className="p-4 border-t border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2 order-1 md:order-2">
            <button
              title="Previous Page"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2.5 cursor-pointer border-gray-200 dark:border-slate-800 border rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-blue-400 text-gray-400 disabled:opacity-30 transition-all active:scale-90"
            >
              <HiChevronRight size={20} />
            </button>
            <div className="flex gap-1.5">
              {getPageNumbers().map((page, i) => (
                <button
                  key={i}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  className={`w-9 h-9 border flex items-center justify-center rounded-xl text-sm font-bold transition-all active:scale-90 
                    ${
                      page === currentPage
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "border-gray-200 dark:border-slate-800 text-gray-500 hover:border-blue-300 bg-white dark:bg-[#0F172A]"
                    } ${page === "..." ? "cursor-default border-none" : "cursor-pointer"}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              title="Next Page"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2.5 cursor-pointer border border-gray-200 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-blue-400 text-gray-400 disabled:opacity-30 transition-all active:scale-90"
            >
              <HiChevronLeft size={20} />
            </button>
          </div>

          <div className="order-1 sm:order-2 dark:text-slate-400">
            عرض
            <span className="font-semibold text-gray-700 dark:text-slate-200 mx-1">
              {totalItems === 0 ? 0 : indexOfFirstItem + 1}
            </span>
            إلى
            <span className="font-semibold text-gray-700 dark:text-slate-200 mx-1">
              {Math.min(indexOfLastItem, totalItems)}
            </span>
            من أصل
            <span className="font-semibold text-gray-700 dark:text-slate-200 mx-1">
              {totalItems}
            </span>
            طلب
          </div>
        </div>
      </div>
    </motion.div>
  );
}
