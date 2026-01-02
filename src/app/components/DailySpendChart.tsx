"use client";

import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { spendByDay } from "@/data/insights";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    value
  );

export const DailySpendChart = () => {
  const data = spendByDay();

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="colorFood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="colorTransport" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={formatCurrency} width={80} />
        <Tooltip formatter={(value: number) => formatCurrency(value)} cursor={{ stroke: "#1d4ed8", strokeWidth: 1 }} />
        <Legend />
        <Area
          type="monotone"
          dataKey="total"
          name="Total"
          stroke="#1d4ed8"
          fill="url(#colorTotal)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="food"
          name="Food"
          stroke="#f97316"
          fill="url(#colorFood)"
          strokeWidth={1.5}
        />
        <Area
          type="monotone"
          dataKey="transport"
          name="Transport"
          stroke="#0ea5e9"
          fill="url(#colorTransport)"
          strokeWidth={1.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DailySpendChart;
