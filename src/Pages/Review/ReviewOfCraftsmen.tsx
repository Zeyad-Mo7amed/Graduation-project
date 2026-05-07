import { motion, AnimatePresence } from "framer-motion";
import {
  IoSearchOutline,
  IoEyeOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import type { Technician } from "../../interfaces/interfaces";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllTechnicians } from "../../APIs/GetAllTechnicians.api";
import { deleteTechnician } from "../../APIs/DeleteTechnician.api";
import Loading from "../../Components/Shared/Loading/Loading";
import NotFoundData from "../../Components/Shared/NotFoundData/NotFoundData";
import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

export default function ReviewOfCraftsmen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const itemsPerPage = 6;
  const queryClient = useQueryClient();

  // جلب البيانات
  const { data: allTechData, isLoading: isLoadingAllTech } = useQuery<
    Technician[]
  >({
    queryKey: ["GetAllTechnicians"],
    queryFn: getAllTechnicians,
  });

  // Mutation الحذف
  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteTechnician(id),
    onSuccess: () => {
      toast.success("تم حذف الفني بنجاح");
      queryClient.invalidateQueries({ queryKey: ["GetAllTechnicians"] });
      setDeleteId(null);
    },
    onError: () => {
      toast.error("فشل في حذف الفني (تأكد من السيرفر)");
    },
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

  // منطق الترقيم الذكي (Pagination Logic)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const range = 1;

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > range + 2) pages.push("...");

      const start = Math.max(2, currentPage - range);
      const end = Math.min(totalPages - 1, currentPage + range);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - range - 1) pages.push("...");
      pages.push(totalPages);
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
      {/* Header Search */}
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
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-3">
            طلبات الانضمام
            <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400 text-xs px-2 py-1 rounded-md font-bold">
              {totalItems} طلب
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto">
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
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                      {tech.experienceYears} سنوات
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(tech.createdAt).toLocaleDateString("ar-EG", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                          tech.state === "Active"
                            ? "bg-green-50 dark:bg-green-900/20 text-green-500  "
                            : tech.state === "Rejected"
                              ? "bg-red-50 dark:bg-red-900/20 text-red-500  "
                              : "bg-orange-50 dark:bg-orange-900/20 text-orange-400  "
                        }`}
                      >
                        {tech.state === "Active"
                          ? "تمت الموافقة"
                          : tech.state === "Rejected"
                            ? "تم الرفض"
                            : "قيد المراجعة"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/detailsReview/${tech.userId}`}
                        className="text-gray-300 dark:text-slate-600 hover:text-blue-500 transition-all hover:scale-110 inline-block"
                      >
                        <IoEyeOutline size={20} />
                      </Link>
                      <button title="delete"
                        onClick={() => setDeleteId(tech.userId)}
                        className="text-gray-300 cursor-pointer ms-2 dark:text-slate-600 hover:text-red-500 transition-all hover:scale-110 inline-block"
                      >
                        <MdOutlineDeleteOutline size={20} />
                      </button>
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
              title="previous"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2.5 hover:border-blue-500 cursor-pointer border border-gray-200 dark:border-slate-800 rounded-xl disabled:opacity-30 transition-all"
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
                  className={`w-9 h-9 border flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                    page === currentPage
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]"
                  } ${page === "..." ? "cursor-default border-none opacity-50" : "cursor-pointer hover:border-blue-500"}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              title="next"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2.5 cursor-pointer hover:border-blue-600 border border-gray-200 dark:border-slate-800 rounded-xl disabled:opacity-30 transition-all"
            >
              <HiChevronLeft size={20} />
            </button>
          </div>

          <div className="order-1 sm:order-2 dark:text-slate-400">
            عرض
            <span className="font-semibold mx-2 text-gray-700 dark:text-slate-200">
              {totalItems === 0 ? 0 : indexOfFirstItem + 1}
            </span>
            إلى
            <span className="font-semibold mx-2 text-gray-700 dark:text-slate-200">
              {Math.min(indexOfLastItem, totalItems)}
            </span>
            من أصل
            <span className="font-semibold mx-2 text-gray-700 dark:text-slate-200">
              {totalItems}
            </span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isDeleting && setDeleteId(null)}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1E293B] w-full max-w-md p-8 rounded-3xl shadow-2xl text-center border border-gray-100 dark:border-gray-800 cursor-default"
            >
              <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoAlertCircleOutline size={48} />
              </div>
              <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-2">
                تأكيد الحذف
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                هل أنت متأكد من حذف هذا الفني؟ <br /> هذا الإجراء سيقوم بإزالة
                كافة البيانات ولا يمكن التراجع عنه.
              </p>
              <div className="flex gap-4">
                <button
                  disabled={isDeleting}
                  onClick={() => deleteId && deleteMutate(deleteId)}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/30 disabled:opacity-50"
                >
                  {isDeleting ? "جاري الحذف..." : "نعم، احذف الفني"}
                </button>
                <button
                  disabled={isDeleting}
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  تراجع
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
