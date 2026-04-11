import { AiOutlineSafety } from "react-icons/ai";
import { BsLightning } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import image from "../../../assets/d8a78d15c9e73a84c13f2eb5a78a8639ef8e0f7a.png";
import icone from "../../../assets/Maintenance-cuate1.png";

export default function Login() {
  return (
    <>
      <section className="bg-white dark:bg-[#0F172A] min-h-screen transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Form Side */}
          <div className="flex flex-col justify-center p-8 md:p-20 gap-8">
            <div className="flex gap-x-3">
              <div className="w-[47px] text-white rounded-2xl h-[47px] bg-[#2F81ED] flex items-center justify-center text-2xl shadow-lg shadow-blue-200 dark:shadow-none">
                <MdHome />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  حرفي
                </h3>
                <p className="text-sm text-[#556377] dark:text-gray-400 font-medium">
                  لإدارة خدمات المنزل
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                تسجيل الدخول للوحة التحكم
              </h2>
              <p className="text-base text-[#6A7282] dark:text-gray-400">
                مرحباً بك مجدداً، يرجى إدخال بيانات الدخول
              </p>
            </div>

            <div>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#556377] dark:text-gray-300 mb-2"
                  >
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-[#2F81ED] focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600"
                      placeholder="admin@harafy.com"
                      id="email"
                      type="email"
                      name="email"
                    />
                    <svg
                      className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-[#556377] dark:text-gray-300"
                    >
                      كلمة المرور
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-[#2F81ED] focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600"
                      placeholder="••••••••"
                      type="password"
                      name="password"
                    />
                    <svg
                      className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 384 512"
                    >
                      <path d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z" />
                    </svg>
                    <button title="submet"
                      type="button"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2F81ED] transition-colors"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 576 512"
                      >
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z" />
                      </svg>
                    </button>
                  </div>
                  <Link
                    className="text-sm text-[#2F81ED] hover:underline mt-2 inline-block font-medium"
                    to="/forget-password"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer bg-[#2F81ED] hover:bg-[#1e6cd4] text-white py-4 px-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg shadow-blue-200 dark:shadow-none active:scale-[0.98]"
                >
                  تسجيل الدخول
                </button>
              </form>

              <div className="mt-10 flex gap-x-2 text-[#6A7282] dark:text-gray-400 font-medium items-center bg-gray-50 dark:bg-gray-800/50 w-fit px-4 py-2 rounded-lg">
                <AiOutlineSafety className="text-[#0C8D62] text-xl" />
                <span className="text-sm">
                  نظام محمي وآمن بمديريات التشفير المتقدمة
                </span>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative hidden lg:block overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={image}
              alt="registerImage"
            />
            <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[2px]"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-8">
              <div className="relative flex justify-center mb-8">
                <img
                  src={icone}
                  alt="registerIcone"
                  className="relative z-10 w-64"
                />

                {/* Decorative Icons */}
                <div className="absolute -right-4 top-0 -rotate-12 w-[60px] h-[60px] rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur flex items-center justify-center shadow-xl">
                  <BsLightning className="text-3xl text-yellow-500" />
                </div>
                <div className="absolute -left-4 bottom-20 rotate-12 w-[60px] h-[60px] rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur flex items-center justify-center shadow-xl">
                  <svg
                    className="text-[#2F81ED]"
                    height="26"
                    width="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
              </div>

              <div className="text-center text-white drop-shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex justify-center items-center gap-2">
                  <CiCircleCheck className="text-green-400 text-3xl" />
                  فريق من المحترفين
                </h2>
                <p className="text-lg leading-relaxed font-medium opacity-90">
                  أفضل الكفاءات والمهنيين في خدمات الصيانة المنزلية، الكهرباء،
                  والسباكة لضمان جودة استثنائية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
