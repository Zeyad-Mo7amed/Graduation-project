import { AiOutlineSafety } from "react-icons/ai";
import { BsLightning } from "react-icons/bs";
import { CiCircleCheck, CiSettings } from "react-icons/ci";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import image from "../../../assets/d8a78d15c9e73a84c13f2eb5a78a8639ef8e0f7a.png";
import icone from "../../../assets/Maintenance-cuate1.png";

export default function Login() {
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
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#556377] mb-2"
                  >
                    البريد الالكتروني
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                      placeholder="admin@syanapro.com"
                      id="email"
                      type="email"
                      name="email"
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
                </div>
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
                    <input
                      id="password"
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                      placeholder="Enter your password"
                      type="password"
                      name="password"
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
                    <button
                      type="button"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        data-prefix="fas"
                        data-icon="eye"
                        className="h-[1em] svg-inline--fa fa-eye"
                        role="img"
                        viewBox="0 0 576 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z"
                        />
                      </svg>
                    </button>
                  </div>
                  <Link
                    className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-medium"
                    to="/forget-password"
                  >
                    نسيت كلمه المرور؟
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer hover:bg-[#0f4fa3] bg-[#2F81ED] text-white py-3 px-4 rounded-[8px] hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  تسجيل الدخول
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

              <div className="absolute left-0 -top-12 -rotate-6 w-[56px] h-[56px] rounded-xl p-[14px] bg-[#B6C5E9] flex items-center justify-center">
                <CiSettings className="text-3xl" />
              </div>
              <div className="absolute -top-12  rotate-6 w-[56px] h-[56px] rounded-xl p-[14px] bg-[#B6C5E9] flex items-center justify-center">
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
