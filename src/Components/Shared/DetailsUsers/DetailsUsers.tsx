import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoWalletOutline,
  IoCartOutline,
  IoCloseCircleOutline,
  IoClose,
  IoAlertCircleOutline,
  IoSearchOutline as IoSearchIcon,
  IoCallOutline,
} from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GetClientDetails } from "../../../APIs/GetClientDetails..api";
import Loading from "../Loading/Loading";
import NotFoundData from "../NotFoundData/NotFoundData";
import { GetClientOrders } from "../../../APIs/GetClientOrders.aoi";
import { ChangeStateClient } from "../../../APIs/ChangeStateClient.api";
import { toast } from "react-toastify";
import { DeleteClient } from "../../../APIs/DeleteClient.api";
import { SendRejectMessage } from "../../../APIs/RejectState.api";

// Schema الفاليديشن باستخدام Zod
const rejectSchema = z.object({
  reason: z
    .string()
    .min(5, { message: "يجب كتابة سبب الرفض (5 حروف على الأقل)" }),
});

type RejectFormData = z.infer<typeof rejectSchema>;

// تعريف الأنواع
interface ClientData {
  userId: string;
  fullName: string;
  phoneNumber: string;
  city: string;
  government: string;
  profileImageURL: string;
  isActive: boolean;
  state: string;
  numberOfOrder: number;
  createdAt: string;
  faceImageUrl: string;
  backImageUrl: string;
}

interface OrderData {
  id: number;
  inspectedPrice: number;
  scheduledDate: string;
  scheduledTime: string;
  serviceName: string;
  state: string;
}

export default function DetailsUsers() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const queryClient = useQueryClient();

  // إعداد react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RejectFormData>({
    resolver: zodResolver(rejectSchema),
    defaultValues: { reason: "" },
  });

  // 1. جلب بيانات العميل
  const { data, isLoading } = useQuery<ClientData>({
    queryKey: ["GetClientDetails", id],
    queryFn: () => GetClientDetails(id as string),
    enabled: !!id,
  });

  // 2. جلب طلبات العميل
  const { data: ordersData, isLoading: isLoadingOrders } = useQuery<
    OrderData[]
  >({
    queryKey: ["GetClientOrders", id],
    queryFn: () => GetClientOrders((id as string) || "0"),
    enabled: !!id,
  });
  console.log(ordersData);
  
  // 3. منطق التحديث والرفض المزدوج
  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      status,
      reason,
    }: {
      status: number;
      reason?: string;
    }) => {
      // تغيير الحالة أولاً
      await ChangeStateClient(id as string, status);

      // لو الحالة رفض (1) والسبب موجود، نبعت الرسالة
      if (status === 1 && reason && data?.phoneNumber) {
        await SendRejectMessage({
          phoneNumber: data.phoneNumber,
          messsage: reason, // لاحظت الـ typo في الـ API بتاعك "messsage"
        });
        console.log(reason);
        
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetClientDetails", id] });
      toast.success("تم تحديث حالة المستخدم وإرسال الرسالة");
      setIsRejectModalOpen(false);
      reset();
    },
    onError: () => {
      toast.error("حدث خطأ أثناء التحديث");
    },
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (clientId: string) => DeleteClient(clientId),
    onSuccess: () => {
      toast.success("تم حذف العميل بنجاح");
      queryClient.invalidateQueries({ queryKey: ["GetAllClient"] });
      setIsDeleteModalOpen(false);
      navigate("/users");
    },
    onError: () => {
      toast.error("فشل في حذف العميل");
    },
  });

  const onRejectSubmit = (formData: RejectFormData) => {
    mutate({ status: 1, reason: formData.reason });
  };

  const handleDelete = () => {
    if (id) deleteMutate(id);
  };

  if (isLoading || isLoadingOrders) return <Loading />;
  if (!data) return <NotFoundData />;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const totalPayments =
    ordersData
      ?.filter((order) => order.state === "Completed")
      .reduce((acc, curr) => acc + curr.inspectedPrice, 0) || 0;

  const cancelledOrdersCount =
    ordersData?.filter((order) => order.state === "Cancelled").length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 bg-[#f8f9fa] dark:bg-[#0F172A] min-h-screen text-right transition-colors duration-300"
      dir="rtl"
    >
      {/* 🖼️ Modal تكبير الصور */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <IoClose size={30} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImg}
              alt="Zoomed"
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⚠️ Modal تأكيد الحذف */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isDeleting && setIsDeleteModalOpen(false)}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1E293B] w-full max-w-md rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-gray-800 text-center"
            >
              <div className="flex justify-center mb-4 text-red-500">
                <IoAlertCircleOutline size={60} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                تأكيد حذف العميل
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                هل أنت متأكد من رغبتك في حذف العميل{" "}
                <span className="font-bold text-gray-800 dark:text-white">
                  "{data.fullName}"
                </span>
                ؟ هذا الإجراء لا يمكن التراجع عنه.
              </p>
              <div className="flex gap-3">
                <button
                  disabled={isDeleting}
                  onClick={handleDelete}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all active:scale-95 shadow-lg disabled:opacity-50"
                >
                  {isDeleting ? "جاري الحذف..." : "نعم، احذف العميل"}
                </button>
                <button
                  disabled={isDeleting}
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ❌ Modal رفض الطلب */}
      <AnimatePresence>
        {isRejectModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isUpdating && setIsRejectModalOpen(false)}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1E293B] w-full max-w-md rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-gray-800 text-center"
            >
              <div className="flex justify-center mb-4 text-red-500">
                <IoCloseCircleOutline size={60} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                رفض طلب العميل
              </h3>

              <div className="my-4">
                <a
                  href={`tel:${data.phoneNumber}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-bold text-sm border border-blue-100 dark:border-blue-800 transition-all hover:bg-blue-100"
                >
                  <IoCallOutline />
                  {data.phoneNumber}
                </a>
              </div>

              {/* استخدام react-hook-form */}
              <form onSubmit={handleSubmit(onRejectSubmit)}>
                <div className="mb-6 text-right font-bold">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                    سبب الرفض:
                  </label>
                  <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={3}
                        placeholder="اكتب سبب الرفض هنا..."
                        className={`w-full p-3 rounded-xl border ${errors.reason ? "border-red-500" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-[#0F172A] text-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none font-medium`}
                      />
                    )}
                  />
                  {errors.reason && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.reason.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all active:scale-95 shadow-lg disabled:opacity-50"
                  >
                    {isUpdating ? "جاري المعالجة..." : "تأكيد الرفض"}
                  </button>
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => {
                      setIsRejectModalOpen(false);
                      reset();
                    }}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
                  >
                    تراجع
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Profile Header Section */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 gap-6 mb-8 transition-colors">
        <div className="flex flex-col justify-center text-center md:flex-row items-center justify-between mb-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={data.profileImageURL || "https://i.pravatar.cc/150"}
                className="w-20 h-20 rounded-full border-2 border-white dark:border-gray-700 shadow-md object-cover cursor-pointer hover:opacity-80 transition-opacity"
                alt={data.fullName}
                onClick={() => setSelectedImg(data.profileImageURL)}
              />
              {data.state === "Active" && (
                <span className="absolute bottom-1 left-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#1E293B] rounded-full"></span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.fullName}
                </h1>
                <span
                  className={`${data.state === "Active" ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-gray-800 text-gray-500"} text-xs px-2 py-0.5 rounded font-bold`}
                >
                  {data.state === "Active" ? "نشط" : "غير نشط"}
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
        </div>

        <div className="flex gap-3 w-full md:w-auto mx-auto justify-center">
          {data.state !== "Active" ? (
            <>
              <button
                disabled={isUpdating}
                onClick={() => mutate({ status: 2 })}
                className="flex-1 md:flex-none cursor-pointer px-6 py-3 bg-[#00a651] text-white rounded-xl font-bold hover:bg-green-700 transition-all active:scale-95 shadow-lg disabled:opacity-50"
              >
                {isUpdating ? "جاري التحديث..." : "قبول وتفعيل"}
              </button>
              <button
                disabled={isUpdating}
                onClick={() => setIsRejectModalOpen(true)}
                className="flex-1 md:flex-none cursor-pointer px-6 py-3 border-2 border-red-100 dark:border-red-900/30 text-red-500 dark:text-red-400 bg-white dark:bg-[#1E293B] rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95 disabled:opacity-50"
              >
                رفض الطلب
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex-1 md:flex-none cursor-pointer px-6 py-3 border-2 border-red-100 dark:border-red-900/30 text-red-500 dark:text-red-400 bg-white dark:bg-[#1E293B] rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95"
            >
              <div className="flex items-center justify-center gap-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  height={22}
                  width={22}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
                حذف العميل
              </div>
            </button>
          )}
        </div>
      </div>

      {/* صور البطاقة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 my-4">
        {[
          { label: "صورة البطاقة (وجه)", url: data.faceImageUrl },
          { label: "صورة البطاقة (ظهر)", url: data.backImageUrl },
        ].map((img, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#1E293B] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 group transition-all"
          >
            <p className="text-gray-700 dark:text-gray-200 font-bold mb-4 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {img.label}
            </p>
            <div
              onClick={() => setSelectedImg(img.url)}
              className="relative cursor-pointer overflow-hidden rounded-xl aspect-[4/3] bg-gray-100 dark:bg-[#0F172A]"
            >
              <img
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={img.url}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <IoSearchIcon className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="إجمالي الطلبات"
          value={ordersData?.length.toString() || "0"}
          icon={<IoCartOutline size={26} />}
          iconColor="text-blue-500"
          bgColor="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatsCard
          title="إجمالي المدفوعات"
          value={`${totalPayments} ج.م`}
          icon={<IoWalletOutline size={26} />}
          iconColor="text-green-500"
          bgColor="bg-green-50 dark:bg-green-900/20"
        />
        <StatsCard
          title="الطلبات الملغاة"
          value={cancelledOrdersCount.toString()}
          icon={<IoCloseCircleOutline size={26} />}
          iconColor="text-red-500"
          bgColor="bg-red-50 dark:bg-red-900/20"
        />
      </div>

      {/* جدول الطلبات */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
        <div className="p-6 border-b border-gray-50 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            سجل الطلبات
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                <th className="px-6 py-4">رقم الطلب</th>
                <th className="px-6 py-4">الخدمة</th>
                <th className="px-6 py-4">التاريخ</th>
                <th className="px-6 py-4">التكلفة</th>
                <th className="px-6 py-4 text-center">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {ordersData && ordersData.length > 0 ? (
                ordersData.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-[#0F172A]/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-200">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300 font-medium">
                      {order.serviceName}
                    </td>
                    <td className="px-6 py-4 text-gray-400 dark:text-gray-500 text-sm">
                      {formatDate(order.scheduledDate)}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">
                      {order.inspectedPrice} ج.م
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${order.state === "Completed" || order.state === "Active" ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : order.state === "Cancelled" || order.state === "Rejected" ? "bg-red-50 dark:bg-red-900/20 text-red-400" : "bg-orange-100 dark:bg-orange-900/30 text-orange-600"}`}
                      >
                        {order.state === "Completed"
                          ? "مكتمل"
                          : order.state === "Active"
                            ? "نشط"
                            : order.state === "Cancelled"
                              ? "ملغي"
                              : order.state === "Rejected"
                                ? "مرفوض"
                                : "قيد التنفيذ"}
                      </span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-400 font-medium"
                  >
                    لا يوجد طلبات لهذا العميل حتى الآن
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

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
