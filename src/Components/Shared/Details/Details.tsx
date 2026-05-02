import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiMapPin,
  FiPhone,
  FiMessageCircle,
  FiFileText,
  FiExternalLink,
} from "react-icons/fi";
import { FaStar, FaWrench } from "react-icons/fa";
import L from "leaflet";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useQuery } from "@tanstack/react-query";
import { GetDetailsOrder } from "../../../APIs/GetDetailsOrder.api";
import Loading from "../Loading/Loading";
import NotFoundData from "../NotFoundData/NotFoundData";
import type { OrderDetails } from "../../../interfaces/interfaces";


const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Details() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery<OrderDetails>({
    queryKey: ["GetDetailsOrder", id],
    queryFn: () => GetDetailsOrder(id as string),
    enabled: !!id,
  });
  console.log(data);
  
  if (isLoading) return <Loading />;
  if (!data) return <NotFoundData />;

  const tahtaCenter: [number, number] = [26.7696, 31.5021];

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.placeDetails)}`;

  const translateStatus = (state: string) => {
    const statuses: Record<string, string> = {
      Completed: "مكتمل",
      Pending: "قيد الانتظار",
      "In Progress": "قيد التنفيذ",
      Canceled: "ملغي",
    };
    return statuses[state] || state;
  };

  const getStatusColor = (state: string) => {
    switch (state) {
      case "Completed":
        return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
      case "Canceled":
        return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400";
      default:
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400";
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] p-4 md:p-8 font-sans text-[#2B323B] dark:text-gray-200 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <Link
          to="/orders"
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:gap-3 transition-all w-fit"
        >
          <FiArrowLeft className="rotate-180" size={20} />
          <span>العودة للطلبات</span>
        </Link>
        <div className="flex items-center gap-3 bg-white dark:bg-[#1E293B] px-4 py-2 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800">
          <span className="text-slate-400 dark:text-gray-500 font-bold text-sm">
            حالة الطلب:
          </span>
          <span
            className={`${getStatusColor(data.state)} font-black px-4 py-1 rounded-xl text-xs`}
          >
            {translateStatus(data.state)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            {...fadeInUp}
            className="bg-white dark:bg-[#1E293B] p-6 rounded-[2.5rem] shadow-sm border border-slate-50 dark:border-gray-800"
          >
            <h3 className="text-lg font-black mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
              <FaWrench className="text-blue-500" /> تفاصيل الخدمة
            </h3>
            <div className="space-y-4">
              <DetailRow label="نوع الخدمة" value={data.serviceName} />
              <DetailRow
                label="التاريخ المجدول"
                value={new Date(data.scheduledDate).toLocaleDateString("ar-EG")}
                icon={<FiCalendar />}
              />
              <DetailRow
                label="الوقت المجدول"
                value={data.scheduledTime}
                icon={<FiClock />}
              />
              <div className="mt-6">
                <p className="text-slate-400 dark:text-gray-500 font-bold mb-3 text-sm">
                  وصف المشكلة
                </p>
                <div className="bg-slate-50 dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-100 dark:border-gray-800">
                  <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm font-medium">
                    {data.problemDetails}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-slate-400 dark:text-gray-500 font-bold mb-3 text-sm">
                  الصور المرفقة
                </p>
                <div className="flex gap-3">
                  {data.workImage ? (
                    <img
                      src={data.workImage}
                      alt="work"
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                    />
                  ) : (
                    <p className="text-xs text-gray-400 font-bold">
                      لا توجد صور مرفقة
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-[#1E293B] p-6 rounded-[12px] shadow-sm border-l-[12px] border-blue-500 dark:border-l-blue-600"
          >
            <h3 className="text-lg font-black mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
              <FiFileText className="text-blue-500" /> الملخص المالي
              <span className="mr-auto bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-lg text-[10px]">
                {data.state === "Completed" ? "تم السداد" : "بانتظار السداد"}
              </span>
            </h3>
            <div className="space-y-4">
              <PriceRow
                label="رسوم الخدمة (الكشفية)"
                value={data.inspectedPrice}
              />
              <PriceRow label="تكلفة الخدمة" value={data.afterPrice} />
              <div className="border-t border-dashed border-slate-200 dark:border-gray-700 pt-4 mt-4 flex justify-between items-end">
                <p className="font-black text-slate-800 dark:text-white text-xl">
                  الإجمالي
                </p>
                <p className="text-blue-600 dark:text-blue-400 font-black text-3xl">
                  <span className="text-sm ml-1">ج.م</span>{" "}
                  {data.finalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#1E293B] p-6 rounded-[12px] shadow-sm border border-slate-50 dark:border-gray-800"
          >
            <h3 className="text-lg font-black mb-6 flex items-center gap-2 dark:text-white">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> بيانات
              العميل
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={data.imageCliURL || "https://via.placeholder.com/150"}
                className="w-16 h-16 rounded-full border-2 border-slate-100 dark:border-gray-700 object-cover"
                alt="client"
              />
              <div className="flex-1 text-right">
                <p className="font-black text-slate-800 dark:text-white text-lg">
                  {data.nameClient}
                </p>
                <a
                  href={data.phoneClient ? `tel:${data.phoneClient}` : "#"}
                  className="text-slate-400 dark:text-gray-500 font-bold text-sm hover:text-blue-500 transition-colors"
                  dir="ltr"
                >
                  {data.phoneClient || "رقم الهاتف غير متاح"}
                </a>
              </div>
            </div>

            <div
              className="flex flex-row-reverse items-center justify-end w-full px-2 mb-2"
              dir="rtl"
            >
              <span className="text-[#2B323B] dark:text-gray-200 font-bold ms-2 text-lg whitespace-nowrap">
                عنوان الخدمة
              </span>
              <div className="text-blue-500 shrink-0">
                <FiMapPin size={22} />
              </div>
            </div>

            <p className="text-slate-500 dark:text-gray-400 text-sm font-medium mb-4 text-right leading-relaxed">
              {data.placeDetails}
            </p>

            <div className="h-64 rounded-[2rem] overflow-hidden border-4 border-slate-50 dark:border-gray-800 relative z-10">
              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 z-[9999] bg-white dark:bg-[#1E293B] text-blue-600 dark:text-blue-400 px-3 py-2 rounded-xl shadow-2xl font-bold text-[10px] flex items-center gap-2 border border-blue-50 dark:border-gray-700 hover:scale-105 transition-transform"
              >
                تتبع العنوان في الخرائط <FiExternalLink />
              </a>

              <MapContainer
                center={tahtaCenter}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={tahtaCenter}>
                  <Popup>{data.placeDetails}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>

          {/* بيانات الحرفي */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-[#1E293B] p-6 rounded-[2.5rem] shadow-sm border border-slate-50 dark:border-gray-800"
          >
            <h3 className="text-lg font-black mb-6 flex items-center gap-2 dark:text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
              بيانات الحرفي
            </h3>
            <div className="flex items-center gap-4 mb-8">
              <img
                src={data.imageTecUrl || "https://via.placeholder.com/150"}
                className="w-16 h-16 rounded-full border-2 border-slate-100 dark:border-gray-700 object-cover"
                alt="tech"
              />
              <div className="flex-1 text-right">
                <p className="font-black text-slate-800 dark:text-white text-lg">
                  {data.nameTec || "بانتظار قبول فني"}
                </p>
                <p className="text-blue-500 dark:text-blue-400 font-bold text-xs">
                  {data.serviceName}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-[#0F172A] p-3 rounded-2xl text-center border border-slate-100 dark:border-gray-800">
                <div className="flex items-center gap-1 text-amber-500 font-black justify-center">
                  <FaStar size={12} /> {data.ratingAvg}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <a
                href={data.phoneClient ? `tel:${data.phoneClient}` : "#"}
                className="bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg"
              >
                اتصال <FiPhone />
              </a>
              <button className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-4 rounded-2xl font-black flex items-center justify-center gap-2 border border-blue-100 dark:border-blue-900/30">
                مراسلة <FiMessageCircle />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const DetailRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-50 dark:border-gray-800 last:border-0">
    <p className="text-slate-400 dark:text-gray-500 font-bold text-sm">
      {label}
    </p>
    <div className="flex items-center gap-2 text-slate-800 dark:text-gray-200 font-black text-sm">
      {value}{" "}
      {icon && (
        <span className="text-slate-300 dark:text-gray-600">{icon}</span>
      )}
    </div>
  </div>
);

const PriceRow = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between items-center">
    <p className="text-slate-500 dark:text-gray-400 font-bold text-sm">
      {label}
    </p>
    <p className="text-slate-800 dark:text-white font-black text-lg">
      <span className="text-[10px] ml-1">ج.م</span> {value.toFixed(2)}
    </p>
  </div>
);
