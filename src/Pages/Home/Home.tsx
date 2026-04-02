import React from "react";
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
} from "recharts";
import { FiUsers, FiTool, FiCheckCircle, FiDollarSign } from "react-icons/fi";

// --- 1. مصفوفات البيانات (Static Data / Mock API) ---

const STATS_CARDS = [
  {
    id: 1,
    title: "إجمالي المستخدمين",
    value: "1,250",
    icon: <FiUsers />,
    color: "border-blue-500",
    iconBg: "bg-blue-50 text-blue-500",
  },
  {
    id: 2,
    title: "عدد الحرفيين",
    value: "340",
    icon: <FiTool />,
    color: "border-sky-500",
    iconBg: "bg-sky-50 text-sky-500",
  },
  {
    id: 3,
    title: "الطلبات المكتملة",
    value: "8,420",
    icon: <FiCheckCircle />,
    color: "border-purple-500",
    iconBg: "bg-purple-50 text-purple-500",
  },
  {
    id: 4,
    title: "إجمالي الأرباح",
    value: "45,000 ج.م",
    icon: <FiDollarSign />,
    color: "border-emerald-500",
    iconBg: "bg-emerald-50 text-emerald-500",
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
    statusColor: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "#1210",
    client: "أحمد علي",
    technician: "ياسر علي",
    status: "قيد التنفيذ",
    statusColor: "bg-orange-100 text-orange-600",
  },
  {
    id: "#1211",
    client: "منى سامي",
    technician: "هاني سعيد",
    status: "قيد التنفيذ",
    statusColor: "bg-orange-100 text-orange-600",
  },
];

// بيانات الرسوم البيانية
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

// --- 2. المكون الرئيسي (Home Page) ---

export default function Home() {
  return (
    <div dir="rtl" className="space-y-6 p-4 bg-[#F0F5FA] min-h-screen">
      {/* عرض الكروت الإحصائية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_CARDS.map((item) => (
          <StatCard key={item.id} {...item} />
        ))}
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-6 text-slate-800">
            معدل الطلبات اليومية
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={LINE_CHART_DATA}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F1F5F9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12, dx: -10 }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#3B82F6" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-6 w-full text-right text-slate-800">
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
                >
                  {PIE_CHART_DATA.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* القوائم */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ListContainer title="طلبات انضمام معلقة">
          {PENDING_CRAFTSMEN.map((person) => (
            <JoinRequestItem
              key={person.id}
              name={person.name}
              craft={person.craft}
            />
          ))}
        </ListContainer>

        <ListContainer title="أحدث الطلبات">
          {LATEST_ORDERS.map((order, index) => (
            <OrderItem key={index} {...order} />
          ))}
        </ListContainer>
      </div>
    </div>
  );
}

// --- 3. المكونات الفرعية (Reusable Components) ---

const StatCard = ({ title, value, icon, color, iconBg }: any) => (
  <div
    className={`bg-white p-6 rounded-3xl shadow-sm border-r-8 ${color} flex items-center justify-between transition-transform hover:scale-[1.02]`}
  >
    <div className={`${iconBg} p-4 rounded-2xl text-2xl`}>{icon}</div>
    <div className="text-left">
      <p className="text-slate-400 text-sm font-bold mb-1">{title}</p>
      <h4 className="text-xl font-black text-slate-800 text-right">{value}</h4>
    </div>
  </div>
);

const ListContainer = ({ title, children }: any) => (
  <div className="space-y-4">
    <h3 className="text-xl font-black text-slate-800 mr-2">{title}</h3>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

const JoinRequestItem = ({ name, craft }: any) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
        {name[0]}
      </div>
      <div className="text-right">
        <p className="font-bold text-slate-800">{name}</p>
        <p className="text-xs text-slate-400 font-medium">{craft}</p>
      </div>
    </div>
    <div className="flex gap-2">
      <button className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">
        قبول
      </button>
      <button className="bg-red-50 cursor-pointer text-red-500 px-5 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors">
        رفض
      </button>
    </div>
  </div>
);

const OrderItem = ({ id, client, technician, status, statusColor }: any) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex flex-col text-right">
      <span className="text-xs font-bold text-blue-600 mb-1">{id}</span>
      <p className="font-bold text-slate-800 text-sm">العميل: {client}</p>
      <p className="text-xs text-slate-400">الحرفي: {technician}</p>
    </div>
    <span className={`${statusColor} px-4 py-2 rounded-xl text-xs font-black`}>
      {status}
    </span>
  </div>
);
