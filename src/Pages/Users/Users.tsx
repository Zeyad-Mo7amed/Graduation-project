import {
  IoEyeOutline,
  IoSearchOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetAllClient } from "../../APIs/GetAllClient.api";
import { DeleteClient } from "../../APIs/DeleteClient.api"; // تأكد من استيراد API الحذف
import Loading from "../../Components/Shared/Loading/Loading";
import NotFoundData from "../../Components/Shared/NotFoundData/NotFoundData";
import type { Customer } from "../../interfaces/interfaces";
import { useState, useEffect } from "react";
import imgNotFound from "../../../src/assets/c923ee5356a7b4341c342b4fdbd0756b.webp";
import { toast } from "react-toastify";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const queryClient = useQueryClient();

  // حالة الموديل والعميل المختار للحذف
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const { data: allCliData, isLoading: isLoadingAllCli } = useQuery({
    queryKey: ["GetAllClient"],
    queryFn: GetAllClient,
  });
  console.log(allCliData);
  

  // منطق الحذف (Mutation)
  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (clientId: string) => DeleteClient(clientId),
    onSuccess: () => {
      toast.success("تم حذف العميل بنجاح");
      queryClient.invalidateQueries({ queryKey: ["GetAllClient"] });
      setIsDeleteModalOpen(false);
      setSelectedCustomer(null);
    },
    onError: () => {
      toast.error("فشل في حذف العميل");
    },
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (isLoadingAllCli) return <Loading />;

  const filteredClients = (allCliData || []).filter((customer: Customer) => {
    const term = searchQuery.toLowerCase();
    return (
      customer.fullName.toLowerCase().includes(term) ||
      customer.phoneNumber.includes(term)
    );
  });

  const totalClients = filteredClients.length;
  const totalPages = Math.ceil(totalClients / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

  const getPaginationGroup = () => {
    const pages: (number | string)[] = [];
    const range = 1;
    if (totalPages <= 5) {
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

  const openDeleteModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  if (!allCliData || allCliData.length === 0) {
    return <NotFoundData />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6 bg-[#fcfcfc] dark:bg-[#0F172A] min-h-screen transition-colors duration-300"
      dir="rtl"
    >
      {/* ⚠️ مودال الحذف المضاف */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => !isDeleting && setIsDeleteModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#1E293B] w-full max-w-md rounded-2xl p-8 shadow-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4 text-red-500">
                <IoAlertCircleOutline size={60} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                تأكيد الحذف
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                هل أنت متأكد من حذف العميل{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  "{selectedCustomer?.fullName}"
                </span>
                ؟
              </p>
              <div className="flex gap-3">
                <button
                  disabled={isDeleting}
                  onClick={() =>
                    selectedCustomer && deleteMutate(selectedCustomer.userId)
                  }
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all disabled:opacity-50"
                >
                  {isDeleting ? "جاري الحذف..." : "نعم، احذف"}
                </button>
                <button
                  disabled={isDeleting}
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl font-bold"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full lg:w-1/3">
          <input
            type="text"
            placeholder="بحث برقم الهاتف أو اسم العميل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
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
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            قائمة العملاء
            <span className="hidden sm:inline-block text-sm font-normal text-gray-400 dark:text-slate-500 mr-2">
              {totalClients} عميل
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-700">
          {currentItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4" style={{opacity: 1, transform: 'none'}}>
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center">
                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" className="text-slate-300 dark:text-slate-500 text-4xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" strokeMiterlimit={10} strokeWidth={32} d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64z" />
                  <path fill="none" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={32} d="M338.29 338.29 448 448" />
                </svg>
              </div>
              <div>
                <p className="text-slate-600 dark:text-slate-300 font-bold text-lg">
                  لا توجد مراجعات تطابق بحثك
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  جرب البحث بكلمات أخرى أو تأكد من الاسم
                </p>
              </div>
            </div>

          ) : (
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
                  <th className="px-6 py-4 font-medium text-center">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${searchQuery}-${currentPage}`}
                className="divide-y divide-gray-50 dark:divide-slate-800"
              >
                {currentItems.map((customer: Customer) => (
                  <motion.tr
                    variants={itemVariants}
                    key={customer.userId}
                    className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={customer.profileImageURL}
                        alt={customer.fullName}
                        onError={(e) => {
                          e.currentTarget.src = imgNotFound;
                        }}
                        className="w-9 h-9 rounded-full object-cover border border-gray-100 dark:border-slate-700 shrink-0"
                      />
                      <span className="font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                        {customer.fullName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 tracking-wide whitespace-nowrap hidden md:table-cell">
                      {customer.phoneNumber}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-500 text-sm hidden lg:table-cell">
                      {customer.government}، {customer.city}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-500 text-sm hidden sm:table-cell">
                      {new Date(customer.createdAt).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-bold">
                        {customer.numberOfOrder}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-md text-[11px] font-bold inline-block whitespace-nowrap ${
                          customer.state === "Active"
                            ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                            : customer.state === "Pending"
                              ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                              : "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400"
                        }`}
                      >
                        {customer.state === "Active"
                          ? "تمت الموافقة"
                          : customer.state === "Pending"
                            ? "قيد المراجعة"
                            : "تم الرفض"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3 md:gap-4 text-gray-400 dark:text-slate-600">
                        <Link
                          to={`/DetailsUsers/${customer.userId}`}
                          className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-all hover:scale-110"
                        >
                          <IoEyeOutline size={20} />
                        </Link>
                        <button
                          title="delete"
                          onClick={() => openDeleteModal(customer)}
                          className="text-gray-300 cursor-pointer ms-2 dark:text-slate-600 hover:text-red-500 transition-all hover:scale-110 inline-block"
                        >
                          <MdOutlineDeleteOutline size={20} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          )}
        </div>

        {/* Pagination Section */}
        <div className="p-4 border-t border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-slate-500">
          <div className="flex items-center gap-2 order-1 md:order-2">
            <button
              title="previous"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2.5 cursor-pointer border-gray-200 dark:border-slate-800 border rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-blue-400 text-gray-400 dark:text-slate-500 transition-all active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronRight size={20} />
            </button>
            <div className="flex gap-1.5">
              {getPaginationGroup().map((page, i) => (
                <button
                  key={i}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  className={`w-9 h-9 border flex items-center justify-center rounded-xl text-sm font-bold transition-all 
                    ${page === "..." ? "cursor-default border-transparent opacity-50" : "cursor-pointer active:scale-90"}
                    ${
                      page === currentPage
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:border-blue-300 bg-white dark:bg-[#0F172A]"
                    }`}
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
              className="p-2.5 cursor-pointer border border-gray-200 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-blue-400 text-gray-400 dark:text-slate-500 transition-all active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronLeft size={20} />
            </button>
          </div>

          <div className="order-1 sm:order-2 text-xs md:text-sm">
            عرض{" "}
            <span className="font-semibold text-gray-700 dark:text-slate-200 mx-1">
              {totalClients === 0 ? 0 : indexOfFirstItem + 1}
            </span>
            إلى{" "}
            <span className="font-semibold text-gray-700 dark:text-slate-200 mx-1">
              {Math.min(indexOfLastItem, totalClients)}
            </span>
            من أصل{" "}
            <span className="font-semibold text-gray-700 dark:text-slate-200 mx-1">
              {totalClients}
            </span>{" "}
            عميل
          </div>
        </div>
      </div>
    </motion.div>
  );
}
