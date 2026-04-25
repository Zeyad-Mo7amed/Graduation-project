import  { useState } from "react";
import { FaStar, FaRegStar, FaSearch, FaFilter } from "react-icons/fa";
import {
  MdCheckCircleOutline,
  MdOutlineDeleteSweep,
  MdHistory,
} from "react-icons/md";
import {
  IoTriangleOutline,
  IoCheckmarkSharp,
  IoCloseSharp,
  IoCloseOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: number;
  client: string;
  worker: string;
  job: string;
  rating: number;
  comment: string;
  reasons: string[];
  date: string;
  initial: string;
}

export default function ReviewTheRatings() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] =
    useState<boolean>(false); // حالة مودال التأكيد
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const stats = [
    {
      title: "إجمالي التقييمات المشبوهة",
      value: 150,
      icon: <IoTriangleOutline className="text-slate-400 text-2xl" />,
    },
    {
      title: "تم اعتمادها",
      value: 80,
      icon: <MdCheckCircleOutline className="text-green-500 text-2xl" />,
    },
    {
      title: "تم حذفها",
      value: 50,
      icon: <MdOutlineDeleteSweep className="text-red-400 text-2xl" />,
    },
    {
      title: "في انتظار القرار",
      value: 20,
      icon: <MdHistory className="text-yellow-500 text-2xl" />,
    },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      client: "ياسر عبد الرحمن",
      worker: "أحمد سيد",
      job: "سباك",
      rating: 1,
      comment:
        "أسوأ سباك شوفته، جيه متأخر وشغله سيء جداً ولا أنصح بالتعامل معه أبداً...",
      reasons: ["كلمات مسيئة", "محتوى متكرر"],
      date: "10 مايو 2026",
      initial: "ي",
    },
    {
      id: 2,
      client: "مريم خالد",
      worker: "محمود حسن",
      job: "فني كهرباء",
      rating: 5,
      comment: "ممتاز جداً وسريع في شغله.",
      reasons: ["تقييمات سريعة"],
      date: "11 مايو 2026",
      initial: "م",
    },
    {
      id: 3,
      client: "علي عثمان",
      worker: "سعيد محمد",
      job: "عامل نظافة",
      rating: 3,
      comment: "بعض الأماكن بدون تنظيف.",
      reasons: ["حساب جديد"],
      date: "12 مايو 2026",
      initial: "ع",
    },
  ];

  const openDetails = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (review: Review) => {
    setSelectedReview(review);
    setIsConfirmDeleteOpen(true);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 md:p-8 font-sans"
      dir="rtl"
    >
      {/* 1. قسم الإحصائيات العلوي */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 flex justify-between items-center"
          >
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">
                {stat.title}
              </p>
              <h3 className="text-3xl font-black dark:text-white leading-none">
                {stat.value}
              </h3>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-full flex items-center justify-center">
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. حاوية الجدول الرئيسية */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-5 flex flex-col md:flex-row gap-4 justify-between items-center border-b border-gray-50 dark:border-slate-700">
          <div className="relative w-full md:w-1/3">
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="بحث باسم العميل أو الحرفي..."
              className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-slate-700/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none text-sm transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 dark:border-slate-600 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-bold transition-all cursor-pointer">
            <FaFilter className="text-sm" />
            تصفية
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-gray-50 dark:border-slate-700">
                <th className="p-5 font-bold">العميل</th>
                <th className="p-5 font-bold">الحرفي</th>
                <th className="p-5 font-bold">التقييم</th>
                <th className="p-5 font-bold">التعليق</th>
                <th className="p-5 font-bold">أسباب الشك</th>
                <th className="p-5 font-bold">التاريخ</th>
                <th className="p-5 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-700/50">
              {reviews.map((item) => (
                <motion.tr
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={item.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                        {item.initial}
                      </div>
                      <span className="font-bold dark:text-slate-200 whitespace-nowrap">
                        {item.client}
                      </span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold dark:text-slate-200 whitespace-nowrap">
                        {item.worker}
                      </span>
                      <span className="text-xs text-slate-400">{item.job}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex gap-0.5 text-yellow-400">
                      {[...Array(5)].map((_, i) =>
                        i < item.rating ? (
                          <FaStar key={i} size={14} />
                        ) : (
                          <FaRegStar
                            key={i}
                            size={14}
                            className="text-slate-300 dark:text-slate-600"
                          />
                        ),
                      )}
                    </div>
                  </td>
                  <td className="p-5 min-w-[200px]">
                    <p className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-[180px]">
                      {item.comment}
                    </p>
                    <button
                      onClick={() => openDetails(item)}
                      className="text-blue-500 text-[11px] font-bold mt-1 hover:underline cursor-pointer"
                    >
                      عرض التفاصيل
                    </button>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-wrap gap-1">
                      {item.reasons.map((r, i) => (
                        <span
                          key={i}
                          className="bg-pink-50 dark:bg-pink-900/20 text-pink-500 text-[10px] px-2.5 py-1 rounded-lg font-bold whitespace-nowrap"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="p-5">
                    <div className="flex gap-2 justify-center">
                      <button className="flex items-center gap-1.5 px-4 py-2 border border-blue-500 text-blue-500 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all cursor-pointer whitespace-nowrap">
                        <IoCheckmarkSharp size={16} /> اعتماد التقييم
                      </button>
                      {/* زر الحذف في الجدول */}
                      <button
                        onClick={() => openDeleteConfirm(item)}
                        className="flex items-center gap-1.5 px-4 py-2 border border-red-400 text-red-400 rounded-xl text-xs font-bold hover:bg-red-50 transition-all cursor-pointer whitespace-nowrap"
                      >
                        <IoCloseSharp size={16} /> حذف التقييم
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* مودال التفاصيل */}
      <AnimatePresence>
        {isModalOpen && selectedReview && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white dark:bg-slate-800 w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden z-[10000] border dark:border-slate-700"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <IoCloseOutline size={28} />
                </button>
                <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">
                  تفاصيل التقييم كاملة
                </h2>
                <div className="w-7" />
              </div>
              <div className="p-6 space-y-6">
                <div className="bg-[#F8F9FA] dark:bg-slate-900/50 rounded-[24px] p-5 flex items-center border border-gray-100">
                  <div className="flex-1 text-center border-l border-gray-200 px-2">
                    <p className="text-gray-400 text-[11px] mb-2 font-bold">
                      المقيم (العميل)
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                        {selectedReview.initial}
                      </div>
                      <span className="font-bold text-[#1E293B] dark:text-white">
                        {selectedReview.client}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 text-center px-2">
                    <p className="text-gray-400 text-[11px] mb-2 font-bold">
                      مقدم الخدمة (الحرفي)
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-bold text-[#1E293B] dark:text-white">
                        {selectedReview.worker}
                      </span>
                      <span className="bg-[#E2E8F0] text-[#64748B] text-[10px] px-2 py-0.5 rounded-md font-bold">
                        {selectedReview.job}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center px-2">
                  <div className="text-right">
                    <h4 className="font-bold text-[#1E293B] dark:text-white mb-1 text-sm">
                      التقييم والتاريخ
                    </h4>
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) =>
                        i === 0 ? (
                          <FaStar key={i} size={16} />
                        ) : (
                          <FaRegStar
                            key={i}
                            size={16}
                            className="text-gray-200"
                          />
                        ),
                      )}
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm mt-4 font-bold">
                    {selectedReview.date}
                  </span>
                </div>
                <div className="px-2">
                  <h4 className="font-bold text-[#1E293B] dark:text-white mb-3 text-sm">
                    التعليق المكتوب
                  </h4>
                  <div className="bg-[#F8F9FA] dark:bg-slate-900/50 p-4 rounded-[18px] border border-gray-100">
                    <p className="text-[#64748B] dark:text-slate-300 text-sm leading-relaxed font-medium">
                      {selectedReview.comment}
                    </p>
                  </div>
                </div>
                <div className="px-2">
                  <h4 className="font-bold text-[#1E293B] dark:text-white mb-3 text-sm">
                    أسباب الشك (محدد بواسطة الذكاء الاصطناعي)
                  </h4>
                  <div className="flex gap-2">
                    {selectedReview.reasons.map((r, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 bg-[#FFF1F2] text-[#F43F5E] px-4 py-2 rounded-xl text-xs font-bold border border-[#FFE4E6]"
                      >
                        {r} <IoWarningOutline size={14} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 pt-2 flex gap-3">
                <button className="flex-1 duration-150 hover:bg-[#0b4ab0] bg-[#3B82F6] text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all cursor-pointer">
                  اعتماد التقييم
                </button>
                {/* زر الحذف داخل المودال */}
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsConfirmDeleteOpen(true);
                  }}
                  className="flex-1 duration-150 hover:bg-[#bd0f2c] bg-[#F43F5E] text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-red-100 transition-all cursor-pointer"
                >
                  حذف التقييم
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#F1F5F9] duration-150 hover:text-white  text-[#64748B] px-8 py-3.5 rounded-2xl font-bold hover:bg-gray-400 cursor-pointer transition-all"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* مودال تأكيد الحذف (الذي طلبته) */}
      <AnimatePresence>
        {isConfirmDeleteOpen && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfirmDeleteOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-slate-800 w-full max-w-[400px] rounded-[35px] p-8 shadow-2xl z-[10002] text-center"
            >
              {/* أيقونة التحذير الدائرية */}
              <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoWarningOutline className="text-red-500 text-4xl" />
              </div>

              <h2 className="text-2xl font-black text-[#1E293B] dark:text-white mb-4">
                هل أنت متأكد من حذف هذا التقييم؟
              </h2>

              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-8 px-2 font-medium">
                لن يظهر هذا التقييم في ملف الحرفي بعد الحذف ولن يتم احتسابه في
                متوسط التقييمات. هذا الإجراء لا يمكن التراجع عنه.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsConfirmDeleteOpen(false)}
                  className="w-full bg-[#FF3B3B] hover:bg-red-600 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-red-100 dark:shadow-none cursor-pointer"
                >
                  نعم، احذف
                </button>
                <button
                  onClick={() => setIsConfirmDeleteOpen(false)}
                  className="w-full bg-[#F1F5F9] dark:bg-slate-700 text-[#64748B] dark:text-slate-200 py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-all cursor-pointer"
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
