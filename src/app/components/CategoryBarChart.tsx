"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { spendByCategory } from "@/data/insights";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    value
  );

export const CategoryBarChart = () => {
  const data = spendByCategory().map((item) => ({
    ...item,
    label: item.category
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} width={80} tickFormatter={formatCurrency} />
        <Tooltip formatter={(value: number) => formatCurrency(value)} cursor={{ fill: "rgba(59, 130, 246, 0.08)" }} />
        <Bar dataKey="amount" radius={[6, 6, 0, 0]} fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategoryBarChart;
