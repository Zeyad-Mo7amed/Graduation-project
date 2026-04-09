import  { useState } from "react";
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
  const [selectedImg, setSelectedImg] = useState<string | null>(null); // حالة الصورة المختارة

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 bg-[#fcfcfc] min-h-screen text-right relative"
      dir="rtl"
    >
      {/* 1. Profile Header Card (نفس الكود السابق) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-5">
          <img
            src="https://i.pravatar.cc/150?u=11"
            className="w-24 h-24 rounded-full border-4 border-gray-50 object-cover"
            alt="Craftsman"
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-gray-800">خالد جمال</h1>
            <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1 text-blue-600 font-medium tracking-tight bg-blue-50 px-2 py-0.5 rounded-md">
                سباك
              </span>
              <span className="flex items-center gap-1">
                <IoCallOutline /> +20 100 987 6543
              </span>
              <span className="flex items-center gap-1">
                <IoLocationOutline /> القاهرة
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="cursor-pointer lg:flex-none px-5 py-3 bg-[#00a651] text-white rounded-xl font-bold hover:bg-green-700 transition-all active:scale-95">
            <div className="flex items-center justify-center gap-2">
              <IoCheckmark size={20} />
            قبول وتفعيل
            </div>
          </button>
          <button className="cursor-pointer lg:flex-none px-5 py-3 border-2 border-red-100 text-red-500 bg-white rounded-xl font-bold hover:bg-red-50 transition-all active:scale-95">
            <div className="flex items-center justify-center gap-2">
              <IoClose size={20} />
            رفض الطلب
            </div>
          </button>
        </div>
      </div>

      {/* 2. Attachments Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">مرفقات الفني</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {attachments.map((file) => (
            <motion.div
              key={file.id}
              onClick={() => setSelectedImg(file.img as string)} 
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-blue-300 transition-colors group"
            >
              <p className="text-gray-700 font-bold mb-4 text-center">
                {file.title}
              </p>
              <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                <img
                  src={file.img}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Lightbox (المودال الخاص بتكبير الصورة) */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)} // قفل عند الضغط في أي مكان
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()} // منع القفل عند الضغط على الصورة نفسها
            >
              <button
                title="img"
                onClick={() => setSelectedImg(null)}
                className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
              >
                <IoClose size={40} />
              </button>
              <img
                src={selectedImg}
                className="rounded-2xl shadow-2xl max-h-[85vh] object-contain border-4 border-white/10"
                alt="Full preview"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
