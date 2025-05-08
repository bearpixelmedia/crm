"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface RecentMetricsProps {
  className?: string
}

export function RecentMetrics({ className }: RecentMetricsProps) {
  const [metrics] = useState({
    weight: [
      { date: "Jan", value: 172 },
      { date: "Feb", value: 170 },
      { date: "Mar", value: 168 },
      { date: "Apr", value: 165 },
    ],
    bodyFat: [
      { date: "Jan", value: 22 },
      { date: "Feb", value: 21 },
      { date: "Mar", value: 20 },
      { date: "Apr", value: 19 },
    ],
    measurements: {
      chest: "42 in",
      waist: "34 in",
      hips: "38 in",
      biceps: "14 in",
      thighs: "22 in",
    },
  })

  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>Body Metrics</CardTitle>
        <CardDescription>Track your progress over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weight">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="body-fat">Body Fat</TabsTrigger>
            <TabsTrigger value="measurements">Measurements</TabsTrigger>
          </TabsList>
          <TabsContent value="weight" className="space-y-4 pt-4">
            <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-end justify-between p-4">
              {metrics.weight.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className="bg-primary w-12 rounded-t-md"
                    style={{
                      height: `${(item.value - 160) * 10}px`,
                    }}
                  />
                  <span className="text-xs">{item.date}</span>
                  <span className="text-xs font-medium">{item.value} lbs</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="body-fat" className="space-y-4 pt-4">
            <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-end justify-between p-4">
              {metrics.bodyFat.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className="bg-primary w-12 rounded-t-md"
                    style={{
                      height: `${item.value * 5}px`,
                    }}
                  />
                  <span className="text-xs">{item.date}</span>
                  <span className="text-xs font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="measurements" className="pt-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(metrics.measurements).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center border-b pb-2">
                  <span className="capitalize">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
