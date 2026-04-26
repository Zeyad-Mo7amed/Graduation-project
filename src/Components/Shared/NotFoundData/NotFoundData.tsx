import { motion } from 'framer-motion';
import { FiInbox } from 'react-icons/fi';

export default function NotFoundData() {
  return (
    <>
      <div
              className="flex flex-col items-center justify-center min-h-[80vh] space-y-4 text-slate-500 dark:text-slate-400"
              dir="rtl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-8xl bg-white dark:bg-[#1E293B] p-8 rounded-full shadow-sm border border-slate-100 dark:border-slate-800 text-blue-500/20"
              >
                <FiInbox />
              </motion.div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white">
                لا توجد بيانات حالياً
              </h2>
              <p className="text-sm">
                يبدو أن السجل فارغ، لم يتم العثور على أي حرفيين مسجلين.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                تحديث
              </button>
            </div>
    </>
  )
}
