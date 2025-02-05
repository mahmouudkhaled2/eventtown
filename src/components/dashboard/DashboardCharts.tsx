'use client';

import { useState, useCallback, useMemo } from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Data
const periods = [
  { label: "هذا الأسبوع", value: "this-week" },
  { label: "الأسبوع الماضي", value: "last-week" },
  { label: "آخر شهر", value: "last-month" },
];

const getBarData = (period) => {
  const data = {
    "this-week": [
      { category: "Category1", completed: 4, active: 7 },
      { category: "Category2", completed: 11, active: 7 },
      { category: "Category3", completed: 2, active: 5 },
    ],
    "last-week": [
      { category: "Category1", completed: 5, active: 6 },
      { category: "Category2", completed: 9, active: 8 },
      { category: "Category3", completed: 3, active: 4 },
    ],
    "last-month": [
      { category: "Category1", completed: 6, active: 8 },
      { category: "Category2", completed: 10, active: 9 },
      { category: "Category3", completed: 4, active: 6 },
    ],
  };
  return data[period] || data["this-week"];
};

const getLineData = (period) => {
  const data = {
    "this-week": [
      { month: "JAN", completed: 6, active: 4, value: 35 },
      { month: "FEB", completed: 7, active: 6, value: 38 },
      { month: "MAR", completed: 5, active: 11, value: 42 },
      { month: "APR", completed: 4, active: 8, value: 36 },
      { month: "MAY", completed: 5, active: 5, value: 37 },
      { month: "JUN", completed: 7, active: 4, value: 39 },
      { month: "JUL", completed: 8, active: 6, value: 40 },
      { month: "Aug", completed: 6, active: 5, value: 38 },
      { month: "Sep", completed: 4, active: 4, value: 35 },
      { month: "Oct", completed: 5, active: 3, value: 36 },
      { month: "Nov", completed: 7, active: 2, value: 39 },
      { month: "Dec", completed: 8, active: 3, value: 41 },
    ],
    "last-week": [
      { month: "JAN", completed: 5, active: 5, value: 36 },
      { month: "FEB", completed: 6, active: 7, value: 39 },
      { month: "MAR", completed: 4, active: 10, value: 41 },
      { month: "APR", completed: 5, active: 7, value: 37 },
      { month: "MAY", completed: 6, active: 4, value: 38 },
      { month: "JUN", completed: 8, active: 5, value: 40 },
      { month: "JUL", completed: 7, active: 7, value: 42 },
      { month: "Aug", completed: 5, active: 6, value: 39 },
      { month: "Sep", completed: 3, active: 5, value: 36 },
      { month: "Oct", completed: 4, active: 4, value: 37 },
      { month: "Nov", completed: 6, active: 3, value: 38 },
      { month: "Dec", completed: 7, active: 4, value: 40 },
    ],
    "last-month": [
      { month: "JAN", completed: 7, active: 3, value: 37 },
      { month: "FEB", completed: 8, active: 5, value: 40 },
      { month: "MAR", completed: 6, active: 9, value: 43 },
      { month: "APR", completed: 3, active: 9, value: 38 },
      { month: "MAY", completed: 4, active: 6, value: 36 },
      { month: "JUN", completed: 6, active: 3, value: 38 },
      { month: "JUL", completed: 9, active: 5, value: 41 },
      { month: "Aug", completed: 7, active: 4, value: 37 },
      { month: "Sep", completed: 5, active: 3, value: 34 },
      { month: "Oct", completed: 6, active: 2, value: 35 },
      { month: "Nov", completed: 8, active: 1, value: 37 },
      { month: "Dec", completed: 9, active: 2, value: 39 },
    ],
  };
  return data[period] || data["this-week"];
};

export default function DashboardCharts() {
  const [barPeriod, setBarPeriod] = useState("this-week");
  const [linePeriod, setLinePeriod] = useState("this-week");
  const [selectedPoint, setSelectedPoint] = useState(null);

  const barData = useMemo(() => getBarData(barPeriod), [barPeriod]);
  const lineData = useMemo(() => getLineData(linePeriod), [linePeriod]);

  const handleLineClick = useCallback((data) => {
    setSelectedPoint((prev) => (prev?.month === data.month ? null : data));
  }, []);

  const totalValue = useMemo(() => {
    return lineData.reduce((sum, item) => sum + (item.value || 0), 0);
  }, [lineData]);

  return (
    <div
      className="grid gap-4 md:grid-cols-4 xl:grid-cols-12 w-full max-w-7xl mx-auto p-4"
    >
      <Card className="overflow-hidden rounded-3xl bg-white shadow-none border-0 md:col-span-5 xl:col-span-7">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-normal">الطلبات</CardTitle>
            <span className="text-2xl font-bold text-[#4339ca]">
              ${totalValue.toFixed(2)}
            </span>
          </div>
          <Select value={linePeriod} onValueChange={setLinePeriod}>
            <SelectTrigger className="w-[140px] h-9 rounded-full border border-gray-200">
              <SelectValue placeholder="اختر الفترة" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-end gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#60a5fa]" />
              <span className="text-sm">نشطة</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#9ca3af]" />
              <span className="text-sm">مكتملة</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 pointer-events-none" />
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart    margin={{
                  top: 20,
                  right: -20,
                  bottom: 10,
                  left: -40,
                }} data={lineData}>
                  <defs>
                    <filter id="shadow" height="200%">
                      <feDropShadow
                        dx="0"
                        dy="4"
                        stdDeviation="8"
                        floodColor="#4339ca"
                      />
                    </filter>
                    <linearGradient
                      id="activeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    stroke="#6b7280"
                    fontSize={12}
                    
                  />
                  <YAxis
                    ticks={[0, 2, 4, 6, 8, 10, 12]}
                    axisLine={false}
                    tickLine={false}
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => `${value}`}

                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#9ca3af"
                    strokeWidth={2.5}
                    dot={false}
                    tension={0.4}
                  />
                  <Line
                    type="monotone"
                    dataKey="active"
                    stroke="#60a5fa"
                    strokeWidth={2.5}
                    dot={false}
                    tension={0.4}
                    onClick={(data) => handleLineClick(data)}
                    cursor="pointer"
                  />
                  {lineData.map((entry, index) => {
                    if (selectedPoint && entry.month === selectedPoint.month) {
                      return (
                        <g key={`custom-dot-${index}`}>
                          <circle
                            cx={`${(index / (lineData.length - 1)) * 100}%`}
                            cy={`${(1 - entry.active / 12) * 100}%`}
                            r={6}
                            fill="#4339ca"
                            stroke="white"
                            strokeWidth={2}
                            filter="url(#shadow)"
                          />
                          <foreignObject
                            x={`${(index / (lineData.length - 1)) * 100}%`}
                            y={`${(1 - entry.active / 12) * 100}%`}
                            width={60}
                            height={30}
                            style={{ transform: "translate(-50%, -150%)" }}
                          >
                            <div className="rounded-lg bg-[#4339ca] text-white px-3 py-1 text-sm text-center">
                              ${entry.value?.toFixed(2)}
                            </div>
                          </foreignObject>
                        </g>
                      );
                    }
                    return null;
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden rounded-3xl bg-white shadow-none border-0 md:col-span-5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-normal">
              نشاط التعليم
            </CardTitle>
          </div>
          <Select value={barPeriod} onValueChange={setBarPeriod}>
            <SelectTrigger className="w-[140px] h-9 rounded-full border border-gray-200">
              <SelectValue placeholder="اختر الفترة" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="relative p-4">
          <div className="absolute inset-0 pointer-events-none" />
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                margin={{
                  top: 10,
                  rights: -20,
                  bottom: -10,
                  left: -30,
                }}
                data={barData}
                barGap={8}
              >
                <XAxis
                  dataKey="category"
                  axisLine={true}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  ticks={[0, 2, 4, 6, 8, 10, 12]}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Bar
                  dataKey="completed"
                  fill="black"
                  radius={[20, 20, 20, 20]}
                  barSize={30}
                />
                <Bar
                  dataKey="active"
                  fill="#6366f1"
                  radius={[20, 20, 20, 20]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
