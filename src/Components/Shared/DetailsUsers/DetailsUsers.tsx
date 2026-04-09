
import React from "react";
import { motion } from "framer-motion";
import {
  IoEyeOutline,
  IoWalletOutline,
  IoCartOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { MdBlock } from "react-icons/md";

const orders = [
  {
    id: "ORD-9234",
    service: "صيانة تكييف",
    date: "10 أبريل 2026",
    cost: "450 ج.م",
    status: "مكتمل",
  },
  {
    id: "ORD-9120",
    service: "سباكة أساسية",
    date: "28 مارس 2026",
    cost: "200 ج.م",
    status: "مكتمل",
  },
  {
    id: "ORD-8901",
    service: "تنظيف خزانات",
    date: "15 فبراير 2026",
    cost: "850 ج.م",
    status: "ملغي",
  },
  {
    id: "ORD-8850",
    service: "كهرباء عامة",
    date: "02 يناير 2026",
    cost: "300 ج.م",
    status: "مكتمل",
  },
  {
    id: "ORD-8712",
    service: "صيانة تكييف",
    date: "18 نوفمبر 2025",
    cost: "400 ج.م",
    status: "مكتمل",
  },
];

export default function DetailsUsers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 bg-[#f8f9fa] min-h-screen text-right"
      dir="rtl"
    >
      {/* 1. Profile Header Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?u=1"
              className="w-20 h-20 rounded-full border-2 border-white shadow-md object-cover"
              alt="Profile"
            />
            <span className="absolute bottom-1 left-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-800">أحمد حسن</h1>
              <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded font-bold">
                نشط
              </span>
            </div>
            <div className="text-gray-400 text-sm space-y-1">
              <p>+20 100 123 4567</p>
              <p>المعادي، القاهرة • انضم في 12 مايو 2026</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 cursor-pointer md:flex-none flex items-center justify-center gap-2 px-6 py-2 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all active:scale-95">
            <FiEdit3 size={18} />
            تعديل البيانات
          </button>
          <button className="flex-1 cursor-pointer md:flex-none flex items-center justify-center gap-2 px-6 py-2 border border-red-100 bg-red-50/50 text-red-500 rounded-xl font-medium hover:bg-red-50 transition-all active:scale-95">
            <MdBlock size={18} />
            حظر المستخدم
          </button>
        </div>
      </div>

      {/* 2. Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="إجمالي الطلبات"
          value="12"
          icon={<IoCartOutline className="text-blue-500" size={26} />}
          bgColor="bg-blue-50"
        />
        <StatsCard
          title="إجمالي المدفوعات"
          value="4,500 ج.م"
          icon={<IoWalletOutline className="text-green-500" size={26} />}
          bgColor="bg-green-50"
        />
        <StatsCard
          title="الطلبات الملغاة"
          value="1"
          icon={<IoCloseCircleOutline className="text-red-500" size={26} />}
          bgColor="bg-red-50"
          isWarning
        />
      </div>

      {/* 3. Orders Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-lg font-bold text-gray-800">سجل الطلبات</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="px-6 py-4 font-medium">رقم الطلب</th>
                <th className="px-6 py-4 font-medium">الخدمة</th>
                <th className="px-6 py-4 font-medium">التاريخ</th>
                <th className="px-6 py-4 font-medium">التكلفة</th>
                <th className="px-6 py-4 font-medium text-center">الحالة</th>
                <th className="px-6 py-4 font-medium text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-gray-700">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {order.service}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800">
                    {order.cost}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        order.status === "مكتمل"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-50 text-red-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      title="IoeyeOutline"
                      className="text-gray-300 cursor-pointer hover:text-blue-500 transition-colors"
                    >
                      <IoEyeOutline size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// مكون فرعي للكروت (StatsCard) لتقليل تكرار الكود
function StatsCard({ title, value, icon, bgColor, isWarning }: { title: string; value: string; icon: React.ReactNode; bgColor: string; isWarning?: boolean }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-2xl font-black text-gray-800 tracking-tight">
          {value}
        </p>
      </div>
      <div className={`${bgColor} p-3 rounded-2xl`}>{icon}</div>
    </div>
  );
}
