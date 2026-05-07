import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiPhone,
  FiExternalLink,
  FiSend,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import {
  GetComplaintById,
  type ComplaintDetails,
} from "../../../APIs/GetComplaintDetails.api";
import Loading from "../Loading/Loading";

export default function SupportDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: complaintDetails, isLoading: complaintDetailsLoading } =
    useQuery<ComplaintDetails>({
      queryKey: ["complaint", id],
      queryFn: () => GetComplaintById(id!),
      enabled: !!id,
    });

    console.log(complaintDetails);
    

  if (complaintDetailsLoading) {
    return <Loading />;
  }

  if (!complaintDetails) {
    return (
      <div className="text-center p-10 dark:text-white font-bold">
        لم يتم العثور على بيانات الشكوى
      </div>
    );
  }

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

  // --- التعديل هنا ليتوافق مع الـ String القادم من الـ API ---
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Submitted":
        return {
          text: "مفتوحة",
          color: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
        };
      case "InReview":
      case "UnderProcess":
        return {
          text: "قيد المعالجة",
          color:
            "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400",
        };
      case "Resolved":
      case "Closed":
        return {
          text: "محلولة / مغلقة",
          color:
            "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
        };
      default:
        return {
          text: status,
          color:
            "text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400",
        };
    }
  };

  const statusInfo = getStatusInfo(complaintDetails.status );

  return (
    <div
      className="p-4 md:p-8 bg-[#f9fafb] dark:bg-[#0f172a] min-h-screen transition-colors duration-300"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
            <span className="font-bold text-sm">
              العودة للتذاكر / {complaintDetails.id}
            </span>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* العمود الأيمن (معلومات صاحب الشكوى) */}
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50"
            >
              <h3 className="text-gray-400 dark:text-slate-500 text-xs font-bold mb-6 uppercase tracking-wider">
                صاحب الشكوى
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
                  {complaintDetails.userName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">
                    {complaintDetails.userName}
                  </h4>
                  <span className="bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-3 py-0.5 rounded-lg text-[10px] font-bold">
                    {complaintDetails.userRole === "Client"
                      ? "عميل"
                      : complaintDetails.userRole}
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-4 border-t border-gray-50 dark:border-slate-700/50 pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-slate-400">
                  <FiPhone className="text-blue-500" />
                  <span dir="ltr">
                    {complaintDetails.phoneNumber || "غير متوفر"}
                  </span>
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
                <Link
                  to={`/detailsOrder/${complaintDetails.orderId}`}
                  className="text-blue-500 cursor-pointer hover:text-blue-600 text-[10px] font-bold flex items-center gap-1 transition-colors"
                >
                  <FiExternalLink /> عرض الطلب
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-slate-400">
                    رقم الطلب
                  </span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    #ORD-{complaintDetails.orderId}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-slate-400">
                    الحالة
                  </span>
                  <span className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    📦 تفاصيل الخدمة
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* العمود الأيسر (محتوى الشكوى) */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                  {complaintDetails.title}
                </h1>
                <span
                  className={`${statusInfo.color} px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2`}
                >
                  <FiClock
                    className={
                      complaintDetails.status === "InReview"
                        ? "animate-spin-slow"
                        : ""
                    }
                  />
                  {statusInfo.text}
                </span>
              </div>
              <p className="text-gray-400 dark:text-slate-500 text-[11px] mb-4">
                تم الإنشاء في:{" "}
                {new Date(complaintDetails.createdAt).toLocaleString("ar-EG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <div className="bg-gray-50 dark:bg-slate-800/50 p-5 rounded-xl border border-gray-100 dark:border-slate-700/50">
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                  {complaintDetails.description}
                </p>
              </div>

              {/* رد الإدارة */}
              {complaintDetails.response && (
                <div className="mt-6 border-t border-gray-100 dark:border-slate-700 pt-6">
                  <h4 className="font-bold text-blue-600 mb-2">رد الإدارة:</h4>
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl text-gray-700 dark:text-slate-300 border-r-4 border-blue-500">
                    {complaintDetails.response}
                  </div>
                </div>
              )}
            </motion.div>

            {/* كارت إضافة رد */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50"
            >
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                إرسال تحديث أو رد
              </h3>
              <textarea
                placeholder="اكتب ردك هنا..."
                className="w-full h-32 p-4 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white transition-all text-sm"
              />
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-200 dark:shadow-none">
                  <FiSend /> إرسال الرد
                </button>

                {complaintDetails.status !== "Resolved" &&
                  complaintDetails.status !== "Closed" && (
                    <button className="flex-1 hover:border-red-500 hover:text-red-500 duration-200 cursor-pointer border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
                      <FiCheckCircle /> إغلاق التذكرة
                    </button>
                  )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
