import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FiUsers, FiTool, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { getClientsCount } from "../../APIs/getClientsCount.api";
import { useQuery } from "@tanstack/react-query";
import { getCountTechnicians } from "../../APIs/getCountTechnicians.api";
import Loading from "../../Components/Shared/Loading/Loading";
import { getAllTechnicians } from "../../APIs/GetAllTechnicians.api";
import type { StatCardProps, Technician } from "../../interfaces/interfaces";
import NotFoundData from "../../Components/Shared/NotFoundData/NotFoundData";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const LATEST_ORDERS = [
  {
    id: "#1209",
    client: "عمر خالد",
    technician: "محمد أحمد",
    status: "مكتمل",
    statusColor:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "#1210",
    client: "أحمد علي",
    technician: "ياسر علي",
    status: "قيد التنفيذ",
    statusColor:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  },
];

export default function Home() {
  const { data: clientsData, isLoading: isLoadingClients } = useQuery({
    queryKey: ["clientsCount"],
    queryFn: getClientsCount,
  });

  const { data: techData, isLoading: isLoadingTech } = useQuery({
    queryKey: ["CountTechnicians"],
    queryFn: getCountTechnicians,
  });

  const { data: allTechData, isLoading: isLoadingAllTech } = useQuery<
    Technician[]
  >({
    queryKey: ["GetAllTechnicians"],
    queryFn: getAllTechnicians,
  });
  

  const dynamicLineData = useMemo(() => {
    const days = [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    const counts: Record<string, number> = {};
    days.forEach((day) => (counts[day] = 0));

    allTechData?.forEach((tech) => {
      const dayName = new Date(tech.createdAt).toLocaleDateString("ar-EG", {
        weekday: "long",
      });
      if (counts[dayName] !== undefined) counts[dayName]++;
    });
    return days.map((name) => ({ name, value: counts[name] }));
  }, [allTechData]);

  const dynamicPieData = useMemo(() => {
    if (!allTechData) return [];
    const categories = allTechData.reduce(
      (acc: Record<string, number>, curr) => {
        acc[curr.serviceCategory] = (acc[curr.serviceCategory] || 0) + 1;
        return acc;
      },
      {},
    );
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [allTechData]);

  const pendingTechnicians = useMemo(() => {
    return allTechData?.filter((tech) => !tech.isActive).slice(0, 3) || [];
  }, [allTechData]);

  if (isLoadingClients || isLoadingTech || isLoadingAllTech) return <Loading />;

  const hasData = allTechData && allTechData.length > 0;

  if (!hasData) {
    return (
      <NotFoundData/>
    );
  }

  const totalUsers = (clientsData || 0) + (techData || 0);

  const DYNAMIC_STATS_CARDS: (StatCardProps & { id: number })[] = [
    {
      id: 1,
      title: "إجمالي المستخدمين",
      value: totalUsers.toLocaleString(),
      icon: <FiUsers />,
      color: "border-blue-500",
      iconBg: "bg-blue-50 dark:bg-blue-900/20 text-blue-500",
    },
    {
      id: 2,
      title: "عدد الحرفيين",
      value: techData || 0,
      icon: <FiTool />,
      color: "border-sky-500",
      iconBg: "bg-sky-50 dark:bg-sky-900/20 text-sky-500",
    },
    {
      id: 3,
      title: "الطلبات المكتملة",
      value:
        allTechData?.reduce((acc, curr) => acc + curr.completedJobs, 0) || "0",
      icon: <FiCheckCircle />,
      color: "border-purple-500",
      iconBg: "bg-purple-50 dark:bg-purple-900/20 text-purple-500",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
      dir="rtl"
      className="space-y-6 p-4 bg-[#F0F5FA] dark:bg-[#0F172A] min-h-screen transition-colors duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DYNAMIC_STATS_CARDS.map((item) => (
          <motion.div key={item.id} variants={itemAnim}>
            <StatCard {...item} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={itemAnim}
          className="lg:col-span-2 bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800"
        >
          <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">
            معدل انضمام الحرفيين
          </h3>
          <div style={{ width: "100%", height: "300px", minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dynamicLineData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F1F5F9"
                  className="dark:stroke-slate-700"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  width={50}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12, dx: -15 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    borderColor: "#334155",
                    color: "#fff",
                    borderRadius: "12px",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={1.5}
                  dot={{ r: 3, fill: "#3B82F6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          variants={itemAnim}
          className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center"
        >
          <h3 className="text-xl font-bold mb-6 w-full text-right text-slate-800 dark:text-white">
            توزيع تخصصات الحرفيين
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dynamicPieData}
                  innerRadius={72}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {dynamicPieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    borderColor: "#334155",
                    color: "#fff",
                    borderRadius: "12px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemAnim}>
          <ListContainer title="طلبات انضمام معلقة">
            {pendingTechnicians.length > 0 ? (
              pendingTechnicians.map((tech) => (
                <JoinRequestItem
                  key={tech.userId}
                  name={tech.fullname}
                  craft={tech.serviceCategory}
                />
              ))
            ) : (
              <p className="bg-white dark:bg-[#1E293B] p-8 text-center text-slate-400 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 font-bold">
                لا توجد طلبات معلقة
              </p>
            )}
          </ListContainer>
        </motion.div>

        <motion.div variants={itemAnim}>
          <ListContainer title="أحدث الطلبات">
            {LATEST_ORDERS.map((order, index) => (
              <OrderItem key={index} {...order} />
            ))}
          </ListContainer>
        </motion.div>
      </div>
    </motion.div>
  );
}

// --- المكونات الفرعية (نفس الديزاين بدون تغيير شبر) ---

const StatCard = ({ title, value, icon, color, iconBg }: StatCardProps) => (
  <div
    className={`bg-white dark:bg-[#1E293B] p-6 rounded-[10px] shadow-sm border-r-8 ${color} flex items-center justify-between transition-all hover:scale-[1.02] border-y border-l border-slate-50 dark:border-slate-800`}
  >
    <div className={`${iconBg} p-4 rounded-2xl text-2xl`}>{icon}</div>
    <div className="text-left">
      <p className="text-slate-400 dark:text-slate-500 text-sm font-bold mb-1">
        {title}
      </p>
      <h4 className="font-black text-slate-800 dark:text-white text-right">
        {value}
      </h4>
    </div>
  </div>
);

const ListContainer = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-black text-slate-800 dark:text-white mr-2">
      {title}
    </h3>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

const JoinRequestItem = ({ name, craft }: { name: string; craft: string }) => (
  <div className="bg-white dark:bg-[#1E293B] p-4 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-800 flex items-center justify-between hover:shadow-md transition-all text-right">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-500 dark:text-slate-400">
        {name[0]}
      </div>
      <div>
        <p className="font-bold text-slate-800 dark:text-gray-200">{name}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          {craft}
        </p>
      </div>
    </div>
    <div className="flex gap-2">
      <button className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700">
        قبول
      </button>
      <button className="bg-red-50 cursor-pointer dark:bg-red-900/10 text-red-500 px-5 py-2 rounded-xl text-xs font-bold hover:bg-red-100">
        رفض
      </button>
    </div>
  </div>
);

const OrderItem = ({ id, client, technician, status, statusColor }: {id:string, client:string, technician:string, status:string, statusColor:string}) => (
  <div className="bg-white dark:bg-[#1E293B] p-4 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-800 flex items-center justify-between hover:shadow-md transition-all text-right">
    <div className="flex flex-col">
      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">
        {id}
      </span>
      <p className="font-bold text-slate-800 dark:text-gray-200 text-sm">
        العميل: {client}
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500">
        الحرفي: {technician}
      </p>
    </div>
    <span className={`${statusColor} px-4 py-2 rounded-xl text-xs font-black`}>
      {status}
    </span>
  </div>
);
