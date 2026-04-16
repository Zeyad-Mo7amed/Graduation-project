import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiShield,
  FiMail,
  FiUser,
  FiX,
  FiLock,
  FiAlertTriangle,
} from "react-icons/fi";
import { Link } from "react-router-dom";

// مصفوفة البيانات الأساسية
const adminsData = [
  {
    id: 1,
    name: " زياد محمد",
    email: "ahmed@admin.com",
    role: "مدير عام",
    roleColor:
      "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
    status: "نشط",
    statusColor:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
  },
  {
    id: 2,
    name: "سارة محمود",
    email: "sara@admin.com",
    role: "خدمة عملاء",
    roleColor:
      "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
    status: "نشط",
    statusColor:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
  },
  {
    id: 3,
    name: "كريم حسن",
    email: "karim@admin.com",
    role: "مراجع مالي",
    roleColor:
      "text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400",
    status: "غير نشط",
    statusColor:
      "text-slate-500 bg-slate-50 dark:bg-slate-800 dark:text-slate-400",
  },
];

export default function Payments() {
  const [admins, setAdmins] = useState(adminsData);
  const [isModalOpen, setIsModalOpen] = useState(false); // مودال الإضافة
  const [adminToDelete, setAdminToDelete] = useState<any>(null); // مودال الحذف

  // أنيميشن ظهور العناصر
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  // دالة الحذف الفعلية
  const handleDelete = () => {
    setAdmins(admins.filter((a) => a.id !== adminToDelete.id));
    setAdminToDelete(null);
  };

  return (
    <div
      className="p-4 md:p-8 bg-[#f9fafb] dark:bg-[#0f172a] min-h-screen transition-colors duration-300 relative"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              المدراء وصلاحياتهم
            </h1>
            <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">
              إدارة فريق العمل وتحديد صلاحيات الوصول للنظام.
            </p>
          </div>
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all cursor-pointer"
          >
            <FiPlus className="size-5" />
            <span>إضافة مدير جديد</span>
          </motion.button>
        </div>

        {/* Table Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-slate-500 text-xs font-bold uppercase">
                  <th className="p-5">اسم المدير</th>
                  <th className="p-5 hidden md:table-cell">
                    البريد الإلكتروني
                  </th>
                  <th className="p-5">الصلاحية</th>
                  <th className="p-5 text-center">الحالة</th>
                  <th className="p-5 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-700/50">
                {admins.map((admin) => (
                  <motion.tr
                    variants={itemVariants}
                    key={admin.id}
                    className="hover:bg-gray-50/40 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                          <FiUser className="size-5" />
                        </div>
                        <span className="font-bold text-gray-800 dark:text-slate-200">
                          {admin.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 hidden md:table-cell text-gray-500 dark:text-slate-400 text-sm">
                      {admin.email}
                    </td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 ${admin.roleColor}`}
                      >
                        <FiShield className="size-3" /> {admin.role}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold ${admin.statusColor}`}
                      >
                        {admin.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/EditAdmin/${admin.id}`}
                          className="p-2 text-gray-300 dark:text-slate-600 hover:text-blue-500 transition-all hover:bg-blue-50 rounded-lg"
                        >
                          <FiEdit2 className="size-4" />
                        </Link>
                        <button
                          onClick={() => setAdminToDelete(admin)}
                          className="p-2 text-gray-300 dark:text-slate-600 hover:text-red-500 transition-all hover:bg-red-50 rounded-lg cursor-pointer"
                        >
                          <FiTrash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* --- Modals Section --- */}

      <AnimatePresence>
        {/* 1. مودال إضافة مدير جديد */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700"
            >
              <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-xl font-bold dark:text-white">
                  إضافة مدير جديد
                </h2>
                <button title="close"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-400 cursor-pointer"
                >
                  <FiX className="size-6" />
                </button>
              </div>
              <div className="p-8 space-y-6 text-right">
                <div>
                  <label className="block text-sm font-bold mb-2 dark:text-slate-200">
                    اسم المدير
                  </label>
                  <div className="relative">
                    <FiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="أدخل الاسم"
                      className="w-full pr-11 pl-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 dark:text-slate-200">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="admin@example.com"
                      className="w-full pr-11 pl-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 dark:text-slate-200">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <FiLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      placeholder="********"
                      className="w-full pr-11 pl-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-slate-800/30 flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-md cursor-pointer"
                >
                  حفظ
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 hover:text-red-500 hover:border-red-500 duration-300 py-3.5 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 font-bold rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* 2. مودال تأكيد الحذف (زي الصورة بالظبط) */}
        {adminToDelete && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAdminToDelete(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl p-8 text-center border border-gray-100 dark:border-slate-700"
            >
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiAlertTriangle className="size-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                هل أنت متأكد من حذف هذا المدير؟
              </h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                لن يتمكن هذا المدير من الدخول إلى لوحة التحكم مرة أخرى ولن يمكنك
                التراجع عن هذا الإجراء.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all shadow-lg cursor-pointer"
                >
                  نعم، احذف
                </button>
                <button
                  onClick={() => setAdminToDelete(null)}
                  className="flex-1 hover:border-blue-500 hover:text-blue-500 duration-100 py-3 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
                >
                  تراجع
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
