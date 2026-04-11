import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoCallOutline,
  IoLocationOutline,
  IoClose,
  IoCheckmark,
} from "react-icons/io5";

const attachments = [
  {
    id: 1,
    title: "صورة البطاقة",
    img: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=800",
  },
  {
    id: 2,
    title: "مرفق إضافي 1",
    img: "https://images.unsplash.com/photo-1633113088452-959739542032?q=80&w=800",
  },
  {
    id: 3,
    title: "مرفق إضافي 2",
    img: "https://images.unsplash.com/photo-1589330273594-fade1ee91647?q=80&w=800",
  },
];

export default function DetailsReview() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 bg-[#fcfcfc] dark:bg-[#0F172A] min-h-screen text-right relative transition-colors duration-300"
      dir="rtl"
    >
      {/* 1. Profile Header Card */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 transition-colors">
        <div className="flex items-center gap-5">
          <img
            src="https://i.pravatar.cc/150?u=11"
            className="w-24 h-24 rounded-full border-4 border-gray-50 dark:border-gray-700 object-cover"
            alt="Craftsman"
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-gray-800 dark:text-white">
              خالد جمال
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400 text-sm">
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium tracking-tight bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-md">
                سباك
              </span>
              <span className="flex items-center gap-1">
                <IoCallOutline className="text-blue-500" /> +20 100 987 6543
              </span>
              <span className="flex items-center gap-1">
                <IoLocationOutline className="text-blue-500" /> القاهرة
              </span>
            </div>
          </div>
        </div>

        {/* Actions Buttons */}
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none cursor-pointer px-6 py-3 bg-[#00a651] text-white rounded-xl font-bold hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-100 dark:shadow-none">
            <div className="flex items-center justify-center gap-2">
              <IoCheckmark size={22} />
              قبول وتفعيل
            </div>
          </button>
          <button className="flex-1 md:flex-none cursor-pointer px-6 py-3 border-2 border-red-100 dark:border-red-900/30 text-red-500 dark:text-red-400 bg-white dark:bg-[#1E293B] rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95">
            <div className="flex items-center justify-center gap-2">
              <IoClose size={22} />
              رفض الطلب
            </div>
          </button>
        </div>
      </div>

      {/* 2. Attachments Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          مرفقات الفني
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {attachments.map((file) => (
            <motion.div
              key={file.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedImg(file.img)}
              className="bg-white dark:bg-[#1E293B] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-all group"
            >
              <p className="text-gray-700 dark:text-gray-200 font-bold mb-4 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {file.title}
              </p>
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-100 dark:bg-[#0F172A]">
                <img
                  src={file.img}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Lightbox (Modal) */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button title="close"
                onClick={() => setSelectedImg(null)}
                className="absolute -top-14 left-0 md:-left-10 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
              >
                <IoClose size={32} />
              </button>
              <img
                src={selectedImg}
                className="rounded-2xl shadow-2xl max-h-[80vh] w-auto object-contain border-4 border-white/20 dark:border-gray-700/50"
                alt="Full preview"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
