import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { MdHome, MdConstruction } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";

// أنيميشن ظهور العناصر
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-[#F0F5FA] dark:bg-[#0F172A] flex items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden"
      dir="rtl"
    >
      {/* ------------------------------------------------------------ */}
      {/* الباك جروند المخصصة (تأثير التوهج النيون المستوحى من صورتك) */}
      {/* ------------------------------------------------------------ */}
      {/* توهج علوي أيسر */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-glow rounded-full blur-[100px] opacity-50"></div>
      {/* توهج سفلي أيمن */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-glow rounded-full blur-[100px] opacity-50"></div>
      {/* ------------------------------------------------------------ */}

      <motion.div
        className="text-center max-w-2xl relative z-10" // z-10 ليكون المحتوى فوق التوهج
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* الجزء البصري */}
        <motion.div
          className="relative mb-12 flex justify-center items-center"
          variants={itemVariants}
        >
          <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tight text-white dark:text-[#1E293B] drop-shadow-xl flex items-center justify-center relative z-10">
            <span>4</span>
            <motion.div
              className="w-32 h-32 md:w-44 md:h-44 bg-[#2F81ED] rounded-full flex items-center justify-center shadow-2xl mx-[-10px] md:mx-[-20px]"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <MdConstruction className="text-white text-6xl md:text-8xl" />
            </motion.div>
            <span>4</span>
          </h1>
        </motion.div>

        {/* النص المحتوى */}
        <motion.div variants={itemVariants} className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            عذراً، يبدو أنك ضللت الطريق!
          </h2>
          <p className="text-lg text-[#556377] dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            الصفحة التي تبحث عنها غير موجودة. لا تقلق، "حرفي" جاهز لإعادتك
            للمسار الصحيح.
          </p>
        </motion.div>

        {/* الأزرار */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-8 py-3.5 bg-[#2F81ED] text-white rounded-full font-bold hover:bg-[#1e6cd4] transition-all duration-300 shadow-lg shadow-blue-200 dark:shadow-none active:scale-95 group"
          >
            <MdHome className="text-xl" />
            العودة للوحة التحكم
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-[#1E293B] text-[#2F81ED] dark:text-blue-400 rounded-full font-bold border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300 active:scale-95 group"
          >
            <FiArrowRight className="text-lg rotate-180 group-hover:translate-x-1 transition-transform" />
            العودة للصفحة السابقة
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
