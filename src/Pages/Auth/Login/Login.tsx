import { AiOutlineSafety } from "react-icons/ai";
import { BsLightning } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { MdHome } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import image from "../../../assets/d8a78d15c9e73a84c13f2eb5a78a8639ef8e0f7a.png";
import icone from "../../../assets/Maintenance-cuate1.png";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../APIs/Login.api";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  // 1. تعريف الـ Validation Schema باستخدام Zod
  const loginSchema = z.object({
    email: z
      .string()
      .nonempty("البريد الإلكتروني مطلوب")
      .email("برجاء إدخال بريد إلكتروني صالح"),
    password: z
      .string()
      .nonempty("كلمة المرور مطلوبة")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "يجب أن تحتوي على 8 أحرف، حرف كبير، حرف صغير، رقم، ورمز خاص",
      ),
  });

  // 2. إعداد React Hook Form مع Controller
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 3. إعداد React Query (Mutation) لعملية تسجيل الدخول
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      toast.success(`تم تسجيل الدخول بنجاح! أهلاً ${res.displayName || ""}`);
      navigate("/");
    },
    onError: (err: unknown) => {
      let errorMessage = "فشل تسجيل الدخول، تأكد من البيانات";

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    },
  });

  // 4. فنكشن عند عمل Submit
  const onSubmit = (data:any) => {
    mutate(data);
    console.log(data);
    
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-20 gap-8">
            <div className="flex gap-x-3 ">
              <div className="w-[47px] text-white rounded-2xl h-[47px] bg-[#2F81ED] flex items-center justify-center text-2xl">
                <MdHome />
              </div>
              <div className="">
                <h3 className="text-2xl font-[700]">حرفي</h3>
                <p className="text-sm text-[#556377] font-[400]">
                  لاداره خدمات المنزل
                </p>
              </div>
            </div>
            <div className="">
              <h2 className="text-3xl font-[700]">
                تسجبل الدخول للوحه التحكم{" "}
              </h2>
              <p className="text-base text-[#6A7282]">
                مرجبا بك مجددا برجي ادخال بيانات الدخول
              </p>
            </div>

            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#556377] mb-2"
                  >
                    البريد الالكتروني
                  </label>
                  <div className="relative">
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={isPending}
                          className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all ${
                            errors.email
                              ? "border-red-500"
                              : "border-gray-200 focus:border-primary-500"
                          }`}
                          placeholder="admin@syanapro.com"
                          id="email"
                          type="email"
                        />
                      )}
                    />
                    <svg
                      data-prefix="fas"
                      data-icon="envelope"
                      className="h-[1em] svg-inline--fa fa-envelope absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      role="img"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"
                      />
                    </svg>
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      كلمه المرور
                    </label>
                  </div>
                  <div className="relative">
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={isPending}
                          id="password"
                          className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all ${
                            errors.password
                              ? "border-red-500"
                              : "border-gray-200 focus:border-primary-500"
                          }`}
                          placeholder="Enter your password"
                          type="password"
                        />
                      )}
                    />
                    <svg
                      data-prefix="fas"
                      data-icon="lock"
                      className="h-[1em] svg-inline--fa fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      role="img"
                      viewBox="0 0 384 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"
                      />
                    </svg>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 font-medium whitespace-pre-line">
                      {errors.password.message}
                    </p>
                  )}
                  <Link
                    className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-medium mt-2 inline-block"
                    to="/forget-password"
                  >
                    نسيت كلمه المرور؟
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full cursor-pointer bg-[#2F81ED] text-white py-3 px-4 rounded-[8px] hover:bg-[#0f4fa3] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "جاري التحقق..." : "تسجيل الدخول"}
                </button>
              </form>
              <p className="mt-10 flex gap-x-2 text-[#6A7282] font-[400] items-center">
                <AiOutlineSafety className="text-[#0C8D62]" />
                نظام محمي وآمن بمديريات التشفير المتقدمة
              </p>
            </div>
          </div>

          <div className="relative">
            <img className="w-full" src={image} alt="registerImage" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img src={icone} alt="registerIcone" />

              <div className="absolute text-[#07788A] left-0 -top-12 -rotate-6 w-[56px] h-[56px] rounded-xl p-[14px] bg-[#B6C5E9] flex items-center justify-center">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="26"
                  width="26"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <div className="absolute -top-12  rotate-6 w-[56px] h-[56px] rounded-xl p-[14px] bg-[#B6C5E9] flex items-center justify-center">
                <BsLightning className="text-3xl text-yellow-600" />
              </div>

              <div className="content text-center text-white">
                <h2 className="text-2xl mb-3 flex justify-center items-center">
                  <span className="me-2 text-blue-600">
                    <CiCircleCheck />
                  </span>
                  فريق من المحترفين
                </h2>
                <p className="text-xl">
                  افضل الكفاءه والمهنيين في خدمات الصيانه المنزليه والكهرباء
                  والسباكه
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
