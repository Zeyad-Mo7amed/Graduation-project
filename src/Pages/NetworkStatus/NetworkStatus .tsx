import { useEffect, useState } from "react";

export default function NetworkStatus() {
  // بنبدأ بحالة النت الحالية من المتصفح مباشرة
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // دالة بتحدث الحالة لما النت يرجع
    const goOnline = () => setIsOnline(true);
    // دالة بتحدث الحالة لما النت يفصل
    const goOffline = () => setIsOnline(false);

    // المتصفح بيبعت "إشارة" أول ما النت يفصل أو يرجع
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    // تنظيف الـ Listeners لما المكون يتشال
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-red-600 text-white text-center p-3 font-bold z-[9999] animate-bounce">
      ⚠️ عذراً، لقد انقطع الاتصال بالإنترنت
    </div>
  );
}
