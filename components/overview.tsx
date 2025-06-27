"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useData } from "@/context/data-context"
import { useMemo } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function Overview() {
  const { projects, isLoading } = useData()

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <div className="h-[350px] w-full">
        <Skeleton className="h-full w-full" />
      </div>
    )
  }

  const chartData = useMemo(() => {
    // Calculate monthly revenue from projects
    const monthlyRevenue = {}
    const currentYear = new Date().getFullYear()
    
    // Initialize all months with 0
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    months.forEach(month => {
      monthlyRevenue[month] = 0
    })

    // Process projects to extract revenue
    projects.forEach(project => {
      if (project.name && project.name.includes('$')) {
        const amount = project.name.match(/\$[\d,]+\.?\d*/)?.[0]
        if (amount) {
          const revenue = parseFloat(amount.replace(/[\$,]/g, ''))
          
          // Try to extract date from project (use current month if no date available)
          let projectMonth = new Date().getMonth()
          if (project.startDate) {
            const date = new Date(project.startDate)
            if (!isNaN(date.getTime())) {
              projectMonth = date.getMonth()
            }
          }
          
          const monthName = months[projectMonth]
          monthlyRevenue[monthName] += revenue
        }
      }
    })

    // Convert to chart data format
    return months.map(month => ({
      name: month,
      total: monthlyRevenue[month]
    }))
  }, [projects])

  // If no data available, show empty state
  if (projects.length === 0) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>No project data available</p>
          <p className="text-sm">Add projects to see revenue overview</p>
        </div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
          labelStyle={{ color: '#000' }}
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
