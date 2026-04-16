import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiPhone,
  FiMapPin,
  FiExternalLink,
  FiSend,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

export default function SupportDetails() {
  const { id } = useParams();

  // أنميشن للحاويات
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      className="p-4 md:p-8 bg-[#f9fafb] dark:bg-[#0f172a] min-h-screen transition-colors duration-300"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header مع أنميشن الرجوع */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <Link
            to="/support"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-all group"
          >
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            <span className="font-bold text-sm">العودة للتذاكر / {id}</span>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* العمود الأيسر (معلومات جانبية) */}
          <div className="space-y-6">
            {/* صاحب الشكوى */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50"
            >
              <h3 className="text-gray-400 dark:text-slate-500 text-xs font-bold mb-6 uppercase tracking-wider">
                صاحب الشكوى
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 overflow-hidden shadow-inner">
                  <img
                    src="https://ui-avatars.com/api/?name=محمد+عبدالله&background=0284c7&color=fff"
                    alt="avatar"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">
                    محمد عبد الله
                  </h4>
                  <span className="bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-3 py-0.5 rounded-lg text-[10px] font-bold">
                    عميل
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-4 border-t border-gray-50 dark:border-slate-700/50 pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-slate-400">
                  <FiPhone className="text-blue-500" />{" "}
                  <span dir="ltr">+20 100 123 4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-slate-400">
                  <FiMapPin className="text-blue-500" />{" "}
                  <span>المعادي، القاهرة</span>
                </div>
              </div>
            </motion.div>

            {/* الطلب المرتبط */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-400 dark:text-slate-500 text-xs font-bold uppercase">
                  الطلب المرتبط
                </h3>
                <button className="text-blue-500 cursor-pointer hover:text-blue-600 text-[10px] font-bold flex items-center gap-1 transition-colors">
                  <FiExternalLink /> عرض الطلب
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-slate-400">
                    رقم الطلب
                  </span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    #ORD-10025
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-slate-400">
                    نوع الخدمة
                  </span>
                  <span className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    🚰 سباكة
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-slate-400">
                    حالة الطلب
                  </span>
                  <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-0.5 rounded-md text-[10px] font-bold">
                    مكتمل
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* العمود الأيمن (محتوى الشكوى) */}
          <div className="lg:col-span-2 space-y-6">
            {/* كارت تفاصيل الشكوى */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                  الفني تأخر عن الموعد
                </h1>
                <span className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                  <FiClock className="animate-spin-slow" /> قيد المعالجة
                </span>
              </div>
              <p className="text-gray-400 dark:text-slate-500 text-xs mb-4">
                15 أبريل 2026, 10:30 ص
              </p>
              <div className="bg-gray-50 dark:bg-slate-800/50 p-5 rounded-xl border border-gray-100 dark:border-slate-700/50">
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                  لقد قمت بطلب فني سباكة لحل مشكلة تسريب المياه في الحمام، وتم
                  تحديد الموعد من الساعة 9 إلى 10 صباحاً. الفني لم يصل حتى
                  الساعة 11:30 ولم يقم بالرد على الهاتف عندما حاولت التواصل معه.
                  أرجو اتخاذ الإجراء اللازم لأن التسريب يتسبب في أضرار بالغة.
                </p>
              </div>
            </motion.div>

            {/* كارت إضافة رد */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50"
            >
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                إضافة رد
              </h3>
              <textarea
                placeholder="اكتب ردك هنا..."
                className="w-full h-32 p-4 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white transition-all"
              />
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                  <FiSend /> إرسال الرد
                </button>
                <button className="flex-1 hover:border-red-500 hover:text-red-500 duration-200 cursor-pointer border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
                  <FiCheckCircle /> إغلاق التذكرة
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
