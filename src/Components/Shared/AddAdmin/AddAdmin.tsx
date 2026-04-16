import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiCamera,
  FiCheck,
} from "react-icons/fi";
// import { useParams } from "react-router-dom";

const initialProfile = {
  name: "أحمد محمد",
  email: "ahmed@admin.com",
  phone: "+201001234567",
  avatar:
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?&auto=format&fit=crop&w=150&q=80",
};

export default function EditAdmin() {
  // const { id } = useParams();
  const [profile, setProfile] = useState(initialProfile);

  // أنميشن للحاويات
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div
      className="p-4 md:p-10 bg-[#f9fafb] dark:bg-[#0f172a] min-h-screen transition-colors duration-300"
      dir="rtl"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto bg-white dark:bg-[#1e293b] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50"
      >
        {/* قسم الصورة الشخصية مع أنميشن */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-100 dark:border-slate-700/50 mb-8"
        >
          <div className="flex flex-col items-center sm:items-start text-center sm:text-right">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">
              الصورة الشخصية
            </h1>
            <p className="text-xs md:text-sm text-gray-400 dark:text-slate-500 max-w-sm">
              يُفضل استخدام صورة مربعة (1:1) وبحد أقصى 2 ميجابايت.
            </p>
            <button className="mt-4 cursor-pointer hover:text-blue-500 hover:border-blue-500 flex items-center gap-2 px-5 py-2.5 border border-gray-100 dark:border-slate-700 rounded-xl text-gray-600 dark:text-slate-300 font-bold hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-all text-sm group">
              <FiCamera className="text-gray-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors" />
              تغيير الصورة
            </button>
          </div>

          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-blue-100 dark:bg-blue-900/30 overflow-hidden shadow-inner border-2 border-white dark:border-slate-700 transition-all group-hover:border-blue-400 group-hover:shadow-lg">
              <img
                src={profile.avatar}
                alt="الأفاتار"
                className="w-full h-full object-crop"
              />
            </div>
            {/* أيقونة كاميرا سريعة عند الهوفر */}
            <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <FiCamera className="text-white size-8" />
            </div>
          </div>
        </motion.div>

        {/* قسم البيانات الأساسية - Responsive */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            {/* الاسم الكامل */}
            <div className="relative">
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-slate-100 mb-2"
              >
                <FiUser className="text-gray-400 dark:text-slate-500 size-4" />{" "}
                الاسم بالكامل
              </label>
              <input
                id="name"
                type="text"
                value={profile.name}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:text-white transition-all text-sm md:text-base"
              />
            </div>

            {/* البريد الإلكتروني */}
            <div className="relative">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-slate-100 mb-2"
              >
                <FiMail className="text-gray-400 dark:text-slate-500 size-4" />{" "}
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:text-white transition-all text-sm md:text-base"
              />
            </div>
          </div>

          {/* رقم الهاتف */}
          <div className="relative">
            <label
              htmlFor="number"
              className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-slate-100 mb-2"
            >
              <FiPhone className="text-gray-400 dark:text-slate-500 size-4" />{" "}
              رقم الهاتف
            </label>
            <input
              id="number"
              type="tel"
              value={profile.phone}
              className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:text-white transition-all text-sm md:text-base"
            />
          </div>
        </motion.div>

        {/* قسم تغيير كلمة المرور */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-10 border-t border-gray-100 dark:border-slate-700/50"
        >
          <div className="flex items-center gap-3 mb-8 text-gray-800 dark:text-slate-100">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full border border-gray-100 dark:border-slate-700">
              <FiLock className="size-5" />
            </div>
            <h2 className="text-xl font-bold">تغيير كلمة المرور</h2>
          </div>

          <div className="space-y-6">
            {/* كلمة المرور الحالية */}
            <div>
              <label
                htmlFor="oldPass"
                className="block text-sm font-bold text-gray-800 dark:text-slate-100 mb-2"
              >
                كلمة المرور الحالية
              </label>
              <input
                id="oldPass"
                type="password"
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:text-white transition-all text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* كلمة المرور الجديدة */}
              <div>
                <label
                  htmlFor="newPass"
                  className="block text-sm font-bold text-gray-800 dark:text-slate-100 mb-2"
                >
                  كلمة المرور الجديدة
                </label>
                <input
                  id="newPass"
                  type="password"
                  placeholder="أدخل كلمة المرور الجديدة"
                  className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:text-white transition-all text-sm placeholder:text-gray-300 dark:placeholder:text-slate-600"
                />
              </div>

              {/* تأكيد كلمة المرور */}
              <div>
                <label
                  htmlFor="rePass"
                  className="block text-sm font-bold text-gray-800 dark:text-slate-100 mb-2"
                >
                  تأكيد كلمة المرور
                </label>
                <input
                  id="rePass"
                  type="password"
                  placeholder="أعد إدخال كلمة المرور الجديدة"
                  className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:text-white transition-all text-sm placeholder:text-gray-300 dark:placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* زر حفظ التغييرات مع أنميشن */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center justify-end border-t border-gray-100 dark:border-slate-700/50 pt-8"
        >
          <button className="w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2.5 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95 group">
            <FiCheck className="size-5 group-hover:scale-110 transition-transform" />
            حفظ التغييرات
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
