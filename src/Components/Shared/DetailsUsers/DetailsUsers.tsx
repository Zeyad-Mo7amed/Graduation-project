import React from "react";
import { motion } from "framer-motion";
import {
  IoWalletOutline,
  IoCartOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetClientDetails } from "../../../APIs/GetClientDetails..api";
import Loading from "../Loading/Loading";
import NotFoundData from "../NotFoundData/NotFoundData";

// 1. تعريف النوع الخاص ببيانات العميل القادمة من الـ API
interface ClientData {
  userId: string;
  fullName: string;
  phoneNumber: string;
  city: string;
  government: string;
  profileImageURL: string;
  isActive: boolean;
  numberOfOrder: number;
  createdAt: string;
  latitude?: number;
  longitude?: number;
}

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
  const { id } = useParams<{ id: string }>();
  console.log(id);
  
  const { data, isLoading } = useQuery<ClientData>({
    queryKey: ["GetClientDetails", id],
    queryFn: () => GetClientDetails(id as string),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (!data) return <NotFoundData />;

  // دالة بسيطة لتنسيق التاريخ القادم من الـ API
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 bg-[#f8f9fa] dark:bg-[#0F172A] min-h-screen text-right transition-colors duration-300"
      dir="rtl"
    >
      {/* 1. Profile Header Section */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 transition-colors">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={data.profileImageURL || "https://i.pravatar.cc/150"}
              className="w-20 h-20 rounded-full border-2 border-white dark:border-gray-700 shadow-md object-cover"
              alt={data.fullName}
            />
            {data.isActive && (
              <span className="absolute bottom-1 left-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#1E293B] rounded-full"></span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.fullName}
              </h1>
              <span
                className={`${
                  data.isActive
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                } text-xs px-2 py-0.5 rounded font-bold`}
              >
                {data.isActive ? "نشط" : "غير نشط"}
              </span>
            </div>
            <div className="text-gray-400 dark:text-gray-500 text-sm space-y-1 font-medium">
              <p>{data.phoneNumber}</p>
              <p>
                {data.city}، {data.government} • انضم في{" "}
                {formatDate(data.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 cursor-pointer md:flex-none flex items-center justify-center gap-2 px-6 py-2 border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 text-red-500 dark:text-red-400 rounded-xl font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95">
            <MdBlock size={18} />
            حظر المستخدم
          </button>
        </div>
      </div>

      {/* 2. Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="إجمالي الطلبات"
          value={data.numberOfOrder.toString()}
          icon={<IoCartOutline size={26} />}
          iconColor="text-blue-500"
          bgColor="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatsCard
          title="إجمالي المدفوعات"
          value="4,500 ج.م" // استاتيك كما طلبت لعدم وجودها في الـ API
          icon={<IoWalletOutline size={26} />}
          iconColor="text-green-500"
          bgColor="bg-green-50 dark:bg-green-900/20"
        />
        <StatsCard
          title="الطلبات الملغاة"
          value="1" // استاتيك كما طلبت لعدم وجودها في الـ API
          icon={<IoCloseCircleOutline size={26} />}
          iconColor="text-red-500"
          bgColor="bg-red-50 dark:bg-red-900/20"
        />
      </div>

      {/* 3. Orders Table Section */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
        <div className="p-6 border-b border-gray-50 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            سجل الطلبات
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-gray-400 dark:text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium">رقم الطلب</th>
                <th className="px-6 py-4 font-medium">الخدمة</th>
                <th className="px-6 py-4 font-medium">التاريخ</th>
                <th className="px-6 py-4 font-medium">التكلفة</th>
                <th className="px-6 py-4 font-medium text-center">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {orders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50/50 dark:hover:bg-[#0F172A]/50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-200">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300 font-medium">
                    {order.service}
                  </td>
                  <td className="px-6 py-4 text-gray-400 dark:text-gray-500 text-sm">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">
                    {order.cost}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        order.status === "مكتمل"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          : "bg-red-50 dark:bg-red-900/20 text-red-400 dark:text-red-400"
                      }`}
                    >
                      {order.status}
                    </span>
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

// مكون فرعي للكروت (StatsCard)
function StatsCard({
  title,
  value,
  icon,
  bgColor,
  iconColor,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}) {
  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between transition-colors">
      <div>
        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium mb-1">
          {title}
        </p>
        <p className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
          {value}
        </p>
      </div>
      <div className={`${bgColor} ${iconColor} p-3 rounded-2xl`}>{icon}</div>
    </div>
  );
}
