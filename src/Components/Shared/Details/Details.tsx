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
  FiExternalLink, // أيقونة لفتح الخريطة الخارجية
} from "react-icons/fi";
import { FaStar, FaWrench } from "react-icons/fa";
import L from "leaflet";
import { motion } from "framer-motion"; // مكتبة الأنيميشن
import { Link } from "react-router-dom";

// حل مشكلة أيقونات Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const orderData = {
  status: "قيد التنفيذ",
  customer: {
    name: "محمد عبدالله",
    phone: "+201234567890", // الرقم بدون مسافات للاتصال
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    address: {
      text: "شقة 12، عمارة 4 شارع التسعين الشمالي، التجمع الخامس، القاهرة",
      lat: 30.0249,
      lng: 31.488,
    },
  },
  service: {
    type: "سباكة",
    date: "12 مايو 2026",
    time: "10:30 صباحاً",
    description:
      "يوجد تسريب مياه قوي تحت حوض المطبخ، ويبدو أن هناك كسر في الأنبوب الرئيسي الموصل للخلاط. أحتاج إلى فني لمعاينة المشكلة وتغيير الأجزاء التالفة في أسرع وقت.",
    attachments: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070",
      "https://images.unsplash.com/photo-1595433707802-68267d20790a?q=80&w=2080",
    ],
  },
  craftsman: {
    name: "أحمد حسن",
    rating: 4.8,
    reviews: 124,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    title: "فني سباكة معتمد",
  },
  financial: {
    serviceFee: 50.0,
    partsCost: 85.0,
    vat: 18.9,
    total: 153.9,
  },
};

// إعدادات الأنيميشن للكروت
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Details() {
  const mapCenter: [number, number] = [
    orderData.customer.address.lat,
    orderData.customer.address.lng,
  ];

  // رابط جوجل ماب للتتبع
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${orderData.customer.address.lat},${orderData.customer.address.lng}`;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-[#2B323B]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <Link
          to="/orders"
          className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all w-fit"
        >
          <FiArrowLeft className="rotate-180" size={20} />
          <span>العودة للطلبات</span>
        </Link>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-slate-400 font-bold text-sm">حالة الطلب:</span>
          <span className="bg-amber-100 text-amber-600 font-black px-4 py-1 rounded-xl text-xs">
            {orderData.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* العمود الأيمن */}
        <div className="lg:col-span-7 space-y-8">
          {/* كارت تفاصيل الخدمة */}
          <motion.div
            {...fadeInUp}
            className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50"
          >
            <h3 className="text-lg font-black mb-6 flex items-center gap-2 text-slate-800">
              <FaWrench className="text-blue-500" /> تفاصيل الخدمة
            </h3>
            <div className="space-y-4">
              <DetailRow label="نوع الخدمة" value={orderData.service.type} />
              <DetailRow
                label="التاريخ المجدول"
                value={orderData.service.date}
                icon={<FiCalendar />}
              />
              <DetailRow
                label="الوقت المجدول"
                value={orderData.service.time}
                icon={<FiClock />}
              />

              <div className="mt-6">
                <p className="text-slate-400 font-bold mb-3 text-sm">
                  وصف المشكلة
                </p>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <p className="text-slate-600 leading-relaxed text-sm font-medium">
                    {orderData.service.description}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-slate-400 font-bold mb-3 text-sm">
                  الصور المرفقة
                </p>
                <div className="flex gap-3">
                  {orderData.service.attachments.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="attachment"
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* كارت الملخص المالي */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-[12px] shadow-sm border-l-[12px] border-blue-500"
          >
            <h3 className="text-lg font-black mb-6 flex items-center gap-2 text-slate-800">
              <FiFileText className="text-blue-500" /> الملخص المالي
              <span className="mr-auto bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg text-[10px]">
                مدفوع
              </span>
            </h3>
            <div className="space-y-4">
              <PriceRow
                label="رسوم الخدمة (الكشفية)"
                value={orderData.financial.serviceFee}
              />
              <PriceRow
                label="تكلفة قطع الغيار"
                value={orderData.financial.partsCost}
              />
              <PriceRow
                label="ضريبة القيمة المضافة (14%)"
                value={orderData.financial.vat}
              />
              <div className="border-t border-dashed border-slate-200 pt-4 mt-4 flex justify-between items-end">
                <p className="font-black text-slate-800 text-xl">الإجمالي</p>
                <p className="text-blue-600 font-black text-3xl">
                  <span className="text-sm ml-1">ج.م</span>{" "}
                  {orderData.financial.total.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* العمود الأيسر */}
        <div className="lg:col-span-5 space-y-8">
          {/* كارت بيانات العميل + الخريطة المحدثة */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-[12px] shadow-sm border border-slate-50"
          >
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> بيانات
              العميل
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={orderData.customer.avatar}
                className="w-16 h-16 rounded-full border-2 border-slate-100"
                alt="avatar"
              />
              <div className="flex-1 text-right">
                <p className="font-black text-slate-800 text-lg">
                  {orderData.customer.name}
                </p>
                <a
                  href={`tel:${orderData.customer.phone}`}
                  className="text-slate-400 font-bold text-sm hover:text-blue-500 transition-colors"
                  dir="ltr"
                >
                  {orderData.customer.phone}
                </a>
              </div>
            </div>

            <div
              className="flex flex-row-reverse items-center justify-end w-full px-2 mb-4"
              dir="rtl"
            >
              <span className="text-[#2B323B] font-bold ms-2 text-lg whitespace-nowrap">
                عنوان الخدمة
              </span>
              <div className="text-blue-500 shrink-0">
                <FiMapPin size={22} />
              </div>
            </div>

            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4 text-right">
              {orderData.customer.address.text}
            </p>

            {/* الخريطة مع زر التتبع الخارجي */}
            <div className="h-64 rounded-[2rem] overflow-hidden border-4 border-slate-50 relative group">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 z-[1000] bg-white text-blue-600 px-3 py-2 rounded-xl shadow-lg font-bold text-xs flex items-center gap-2 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
              >
                تتبع في خرائط جوجل <FiExternalLink />
              </a>
              <MapContainer
                center={mapCenter}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={mapCenter}>
                  <Popup>{orderData.customer.name}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>

          {/* كارت بيانات الحرفي */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50"
          >
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
              بيانات الحرفي
            </h3>
            <div className="flex items-center gap-4 mb-8">
              <img
                src={orderData.craftsman.avatar}
                className="w-16 h-16 rounded-full border-2 border-slate-100"
                alt="avatar"
              />
              <div className="flex-1 text-right">
                <p className="font-black text-slate-800 text-lg">
                  {orderData.craftsman.name}
                </p>
                <p className="text-blue-500 font-bold text-xs">
                  {orderData.craftsman.title}
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-100">
                <div className="flex items-center gap-1 text-amber-500 font-black justify-center">
                  <FaStar size={12} /> {orderData.craftsman.rating}
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-1">
                  ({orderData.craftsman.reviews} تقييم)
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <a
                href={`tel:${orderData.customer.phone}`}
                className="bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
              >
                اتصال <FiPhone />
              </a>
              <button className="bg-blue-50 cursor-pointer text-blue-600 py-4 rounded-2xl font-black flex items-center justify-center gap-2 border border-blue-100 hover:bg-blue-100 transition-colors">
                مراسلة <FiMessageCircle />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// المكونات الفرعية (نفس المنطق السابق)
const DetailRow = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
    <p className="text-slate-400 font-bold text-sm">{label}</p>
    <div className="flex items-center gap-2 text-slate-800 font-black text-sm">
      {value} {icon && <span className="text-slate-300">{icon}</span>}
    </div>
  </div>
);

const PriceRow = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between items-center">
    <p className="text-slate-500 font-bold text-sm">{label}</p>
    <p className="text-slate-800 font-black text-lg">
      <span className="text-[10px] ml-1">ج.م</span> {value.toFixed(2)}
    </p>
  </div>
);
