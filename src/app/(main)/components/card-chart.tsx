"use client";
import {
  transformMonthlyData,
  transformCategoryData,
} from "@/helpers/transform";
import { useExpenseStore } from "@/stores/list-expenses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
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
import { useMemo } from "react";
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
export default function ExpensesCharts() {
  const { expenses } = useExpenseStore();
  const monthlyData = useMemo(() => transformMonthlyData(expenses), [expenses]);
  const categoryData = useMemo(
    () => transformCategoryData(expenses),
    [expenses]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="expenses" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={(props) => {
                  const { name, percent } = props as {
                    name: string;
                    percent: number;
                  };
                  return `${name} ${(percent * 100).toFixed(0)}%`;
                }}
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
