import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoCallOutline,
  IoLocationOutline,
  IoClose,
  IoCheckmark,
  IoAlertCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { MdOutlineDeleteOutline } from "react-icons/md";

// APIs Imports
import { getTechnicianDetails } from "../../../APIs/getTechnicianDetails";
import Loading from "../../../Components/Shared/Loading/Loading";
import NotFoundData from "../NotFoundData/NotFoundData";
import { toggleTechnicianStatus } from "../../../APIs/ActiveTechnician.api";
import { deleteTechnician } from "../../../APIs/DeleteTechnician.api";
import { SendRejectMessage } from "../../../APIs/RejectState.api";

// 1. Validation Schema
const rejectSchema = z.object({
  reason: z
    .string()
    .min(5, { message: "يجب كتابة سبب الرفض (5 حروف على الأقل)" }),
});

type RejectFormData = z.infer<typeof rejectSchema>;

export default function DetailsReview() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RejectFormData>({
    resolver: zodResolver(rejectSchema),
    defaultValues: { reason: "" },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["technicianDetails", id],
    queryFn: () => getTechnicianDetails(id as string),
    enabled: !!id,
  });

  const technician = Array.isArray(data) ? data[0] : data;

  // Mutation لتحديث الحالة (تفعيل 2 / رفض 1)
  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      status,
      reason,
    }: {
      status: number;
      reason?: string;
    }) => {
      await toggleTechnicianStatus(id as string, status);
      if (status === 1 && reason && technician?.phoneNumber) {
        await SendRejectMessage({
          phoneNumber: technician.phoneNumber,
          messsage: reason,
        });
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["technicianDetails", id] });
      const msg =
        variables.status === 2
          ? "تم تفعيل الفني بنجاح"
          : "تم رفض الطلب وإرسال السبب";
      toast.success(msg);
      setShowRejectModal(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "حدث خطأ في العملية");
    },
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteTechnician(id as string),
    onSuccess: () => {
      toast.success("تم حذف الفني بنجاح");
      setShowDeleteModal(false);
      navigate("/technicians");
    },
    onError: () => {
      toast.error("فشل في حذف الفني");
    },
  });

  if (isLoading) return <Loading />;
  if (!technician) return <NotFoundData />;

  const formatImageUrl = (url: string | undefined | null) => {
    if (!url) return null;
    return url
      .replace("//", "/")
      .replace("localhost:7048", "herafy.runasp.net");
  };

  const onRejectSubmit = (formData: RejectFormData) => {
    mutate({ status: 1, reason: formData.reason });
  };

  const dynamicAttachments = [
    {
      id: 1,
      title: "صورة البطاقة (وجه)",
      img: formatImageUrl(technician.faceImageUrl),
    },
    {
      id: 2,
      title: "صورة البطاقة (ظهر)",
      img: formatImageUrl(technician.backImageUrl),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 bg-[#fcfcfc] dark:bg-[#0F172A] min-h-screen text-right relative transition-colors duration-300"
      dir="rtl"
    >
      {/* 1. Profile Header Card */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col xl:flex-row items-center justify-between gap-6 mb-8 transition-colors">
        <div className="flex flex-col xl:flex-row items-center gap-6 text-center xl:text-right">
          <img
            src={formatImageUrl(technician.profileImageURL) || undefined}
            className="w-28 h-28 xl:w-24 xl:h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-md object-cover transition-transform duration-300"
            alt={technician.fullName}
            onClick={() =>
              setSelectedImg(formatImageUrl(technician.profileImageURL))
            }
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${technician.fullName}&background=random`;
            }}
          />

          <div className="flex flex-col items-center xl:items-start space-y-4">
            <h1 className="text-3xl xl:text-2xl font-black text-gray-800 dark:text-white">
              {technician.fullName}
            </h1>

            <div className="flex flex-wrap justify-center xl:justify-start gap-4 text-gray-500 dark:text-gray-400 text-sm">
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium tracking-tight bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">
                {technician.serviceCategory}
              </span>

              <span className="flex items-center gap-2">
                <IoCallOutline className="text-blue-500 text-lg" />
                <span dir="ltr">{technician.phoneNumber}</span>
              </span>

              <span className="flex items-center gap-2">
                <IoLocationOutline className="text-blue-500 text-lg" />
                {technician.government} - {technician.city}
              </span>

              <span className="flex items-center gap-1 bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-md text-xs font-bold">
                خبرة {technician.experienceYears} سنوات
              </span>
            </div>
          </div>
        </div>

        {technician.state !== "Active" ? (
          <div className="flex gap-3 w-full md:w-auto">
            <button
              disabled={isUpdating}
              onClick={() => mutate({ status: 2 })}
              className="flex-1 md:flex-none cursor-pointer px-6 py-3 bg-[#00a651] text-white rounded-xl font-bold hover:bg-green-700 transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-2">
                <IoCheckmark size={22} />
                {isUpdating ? "جاري التفعيل..." : "قبول وتفعيل"}
              </div>
            </button>
            <button
              disabled={isUpdating}
              onClick={() => setShowRejectModal(true)}
              className="flex-1 md:flex-none cursor-pointer px-6 py-3 border-2 border-red-100 dark:border-red-900/30 text-red-500 dark:text-red-400 bg-white dark:bg-[#1E293B] rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-2">
                <IoClose size={22} />
                رفض الطلب
              </div>
            </button>
          </div>
        ) : (
          <button
            disabled={isDeleting}
            onClick={() => setShowDeleteModal(true)}
            className="flex-1 md:flex-none cursor-pointer px-6 py-3 border-2 border-red-100 dark:border-red-900/30 text-red-500 dark:text-red-400 bg-white dark:bg-[#1E293B] rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-2">
              <MdOutlineDeleteOutline size={22} />
              {isDeleting ? "جاري الحذف..." : "حذف الفني"}
            </div>
          </button>
        )}
      </div>

      {/* 2. Attachments Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          مرفقات الفني (المستندات)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicAttachments.map((file) => (
            <motion.div
              key={file.id}
              whileHover={{ y: -5 }}
              onClick={() => file.img && setSelectedImg(file.img)}
              className={`bg-white dark:bg-[#1E293B] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all group ${file.img ? "cursor-pointer hover:border-blue-400 dark:hover:border-blue-500" : "cursor-default"}`}
            >
              <p className="text-gray-700 dark:text-gray-200 font-bold mb-4 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {file.title}
              </p>
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-100 dark:bg-[#0F172A]">
                <img
                  src={file.img || undefined}
                  alt={file.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400?text=No+Image";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ❌ Reject Modal (Sends Status 1) */}
      <AnimatePresence>
        {showRejectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isUpdating && setShowRejectModal(false)}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1E293B] w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 cursor-default"
            >
              <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoCloseCircleOutline size={48} />
              </div>
              <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-2 text-center">
                رفض طلب الفني
              </h3>
              <div className="my-4 flex justify-center">
                <span className="px-4 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold flex items-center gap-2">
                  <IoCallOutline /> {technician.phoneNumber}
                </span>
              </div>
              <form
                onSubmit={handleSubmit(onRejectSubmit)}
                className="space-y-4"
              >
                <div className="text-right">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    سبب الرفض:
                  </label>
                  <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={3}
                        className={`w-full p-3 rounded-xl border ${errors.reason ? "border-red-500" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-[#0F172A] dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none`}
                        placeholder="اكتب هنا سبب رفض الطلب..."
                      />
                    )}
                  />
                  {errors.reason && (
                    <p className="text-red-500 text-xs mt-1 font-bold">
                      {errors.reason.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/30 disabled:opacity-50"
                  >
                    {isUpdating ? "جاري الإرسال..." : "تأكيد الرفض"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowRejectModal(false);
                      reset();
                    }}
                    className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                  >
                    تراجع
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⚠️ Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isDeleting && setShowDeleteModal(false)}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1E293B] w-full max-w-md p-8 rounded-3xl shadow-2xl text-center border border-gray-100 dark:border-gray-800 cursor-default"
            >
              <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoAlertCircleOutline size={48} />
              </div>
              <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-2">
                تأكيد الحذف
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                هل أنت متأكد من حذف الفني <strong>{technician.fullName}</strong>
                ؟
                <br />
                هذا الإجراء سيقوم بإزالة كافة البيانات ولا يمكن التراجع عنه.
              </p>
              <div className="flex gap-4">
                <button
                  disabled={isDeleting}
                  onClick={() => deleteMutate()}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/30 disabled:opacity-50"
                >
                  {isDeleting ? "جاري الحذف..." : "نعم، احذف الفني"}
                </button>
                <button
                  disabled={isDeleting}
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  تراجع
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🖼️ Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full flex flex-col items-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                title="close"
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
