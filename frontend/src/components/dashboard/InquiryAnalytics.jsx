import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const STATUS_COLORS = {
  Pending: "#F5B544",
  Contacted: "#55A8F5",
  Resolved: "#42C98A",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-[#315158] bg-[#10272D] px-4 py-3 shadow-xl">
      <p className="mb-1 text-xs text-[#9AB8B8]">{label}</p>
      <p className="text-sm font-semibold text-[#70D6C7]">
        {payload[0].value} inquiries
      </p>
    </div>
  );
};

function InquiryAnalytics({ inquiries = [] }) {
  // Last 7 days inquiry trend
  const trendData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const count = inquiries.filter((inquiry) => {
      const createdAt = new Date(inquiry.created_at);
      return createdAt >= date && createdAt < nextDate;
    }).length;

    return {
      day: date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      inquiries: count,
    };
  });

  // Status distribution
  const statusData = ["Pending", "Contacted", "Resolved"].map((status) => ({
    name: status,
    value: inquiries.filter((inquiry) => inquiry.status === status).length,
    color: STATUS_COLORS[status],
  }));

  const total = inquiries.length;

  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {/* Inquiry Trend Chart */}
      <div className="rounded-2xl border border-[#29464B] bg-[#142A2F] p-5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#E7F0EF]">
              Inquiry Trends
            </h3>
            <p className="mt-1 text-xs text-[#8FAEAD]">
              Inquiries received over the last 7 days
            </p>
          </div>

          <span className="rounded-lg border border-[#315158] px-3 py-2 text-xs text-[#70D6C7]">
            Last 7 Days
          </span>
        </div>

        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient
                  id="inquiryGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#18B7A5" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#18B7A5" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#29464B"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                stroke="#8FAEAD"
                tick={{ fill: "#8FAEAD", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                stroke="#8FAEAD"
                tick={{ fill: "#8FAEAD", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="inquiries"
                stroke="#20C5B2"
                strokeWidth={3}
                fill="url(#inquiryGradient)"
                activeDot={{
                  r: 6,
                  fill: "#70D6C7",
                  stroke: "#10272D",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Distribution Chart */}
      <div className="rounded-2xl border border-[#29464B] bg-[#142A2F] p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-[#E7F0EF]">
            Inquiry Status Distribution
          </h3>
          <p className="mt-1 text-xs text-[#8FAEAD]">
            Overview of inquiry progress
          </p>
        </div>

        <div className="relative h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={5}
                stroke="none"
              >
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => [`${value} inquiries`, name]}
                contentStyle={{
                  backgroundColor: "#10272D",
                  border: "1px solid #315158",
                  borderRadius: "10px",
                  color: "#E7F0EF",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{total}</span>
            <span className="text-xs text-[#8FAEAD]">Total Inquiries</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {statusData.map((item) => (
            <div
              key={item.name}
              className="rounded-xl bg-[#10272D] p-3 text-center"
            >
              <div className="mb-2 flex items-center justify-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-[#A8C0BE]">{item.name}</span>
              </div>

              <p className="text-lg font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InquiryAnalytics;
