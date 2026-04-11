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
import { FiUsers, FiTool, FiCheckCircle, FiDollarSign } from "react-icons/fi";
import { motion } from "framer-motion";

const STATS_CARDS = [
  {
    id: 1,
    title: "إجمالي المستخدمين",
    value: "1,250",
    icon: <FiUsers />,
    color: "border-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-900/20 text-blue-500",
  },
  {
    id: 2,
    title: "عدد الحرفيين",
    value: "340",
    icon: <FiTool />,
    color: "border-sky-500",
    iconBg: "bg-sky-50 dark:bg-sky-900/20 text-sky-500",
  },
  {
    id: 3,
    title: "الطلبات المكتملة",
    value: "8,420",
    icon: <FiCheckCircle />,
    color: "border-purple-500",
    iconBg: "bg-purple-50 dark:bg-purple-900/20 text-purple-500",
  },
  {
    id: 4,
    title: "إجمالي الأرباح",
    value: "45,000 ج.م",
    icon: <FiDollarSign />,
    color: "border-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500",
  },
];

const PENDING_CRAFTSMEN = [
  { id: 101, name: "محمد أحمد", craft: "سباكة" },
  { id: 102, name: "سارة محمود", craft: "تنظيف" },
  { id: 103, name: "خالد عبد الله", craft: "نجارة" },
];

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
  {
    id: "#1211",
    client: "منى سامي",
    technician: "هاني سعيد",
    status: "قيد التنفيذ",
    statusColor:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  },
];

const LINE_CHART_DATA = [
  { name: "السبت", value: 120 },
  { name: "الأحد", value: 140 },
  { name: "الإثنين", value: 110 },
  { name: "الثلاثاء", value: 170 },
  { name: "الأربعاء", value: 90 },
  { name: "الخميس", value: 230 },
  { name: "الجمعة", value: 210 },
];

const PIE_CHART_DATA = [
  { name: "سباكة", value: 400 },
  { name: "نجارة", value: 300 },
  { name: "كهرباء", value: 300 },
  { name: "تنظيف", value: 200 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
      dir="rtl"
      className="space-y-6 p-4 bg-[#F0F5FA] dark:bg-[#0F172A] min-h-screen transition-colors duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_CARDS.map((item) => (
          <motion.div key={item.id} variants={itemAnim}>
            <StatCard {...item} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={itemAnim}
          className="lg:col-span-2 bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors"
        >
          <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">
            معدل الطلبات اليومية
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={LINE_CHART_DATA}
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
                  itemStyle={{ color: "#3B82F6" }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#3B82F6" }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          variants={itemAnim}
          className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center transition-colors"
        >
          <h3 className="text-xl font-bold mb-6 w-full text-right text-slate-800 dark:text-white">
            أكثر الحرف المطلوبة
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_CHART_DATA}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {PIE_CHART_DATA.map((_, index) => (
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
            {PENDING_CRAFTSMEN.map((person) => (
              <JoinRequestItem key={person.id} {...person} />
            ))}
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

const StatCard = ({
  title,
  value,
  icon,
  color,
  iconBg,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  iconBg: string;
}) => (
  <div
    className={`bg-white dark:bg-[#1E293B] p-6 rounded-3xl shadow-sm border-r-8 ${color} flex items-center justify-between transition-all hover:scale-[1.02] border-y border-l border-y-slate-50 border-l-slate-50 dark:border-y-transparent dark:border-l-transparent`}
  >
    <div className={`${iconBg} p-4 rounded-2xl text-2xl transition-colors`}>
      {icon}
    </div>
    <div className="text-left">
      <p className="text-slate-400 dark:text-slate-500 text-sm font-bold mb-1">
        {title}
      </p>
      <h4 className=" font-black text-slate-800 dark:text-white text-right">
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
  <div className="bg-white dark:bg-[#1E293B] p-4 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-800 flex items-center justify-between hover:shadow-md transition-all">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-500 dark:text-slate-400">
        {name[0]}
      </div>
      <div className="text-right">
        <p className="font-bold text-slate-800 dark:text-gray-200">{name}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          {craft}
        </p>
      </div>
    </div>
    <div className="flex gap-2">
      <button className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">
        قبول
      </button>
      <button className="bg-red-50 dark:bg-red-900/10 cursor-pointer text-red-500 px-5 py-2 rounded-xl text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
        رفض
      </button>
    </div>
  </div>
);

const OrderItem = ({
  id,
  client,
  technician,
  status,
  statusColor,
}: {
  id: string;
  client: string;
  technician: string;
  status: string;
  statusColor: string;
}) => (
  <div className="bg-white dark:bg-[#1E293B] p-4 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-800 flex items-center justify-between hover:shadow-md transition-all">
    <div className="flex flex-col text-right">
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
    <span
      className={`${statusColor} px-4 py-2 rounded-xl text-xs font-black transition-colors`}
    >
      {status}
    </span>
  </div>
);
