"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 4000,
  },
  {
    name: "Feb",
    total: 3000,
  },
  {
    name: "Mar",
    total: 5000,
  },
  {
    name: "Apr",
    total: 8000,
  },
  {
    name: "May",
    total: 6000,
  },
  {
    name: "Jun",
    total: 9500,
  },
  {
    name: "Jul",
    total: 7000,
  },
  {
    name: "Aug",
    total: 8500,
  },
  {
    name: "Sep",
    total: 10000,
  },
  {
    name: "Oct",
    total: 9000,
  },
  {
    name: "Nov",
    total: 11000,
  },
  {
    name: "Dec",
    total: 12500,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} labelFormatter={(label) => `Month: ${label}`} />
        <Bar dataKey="total" fill="#f97316" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
