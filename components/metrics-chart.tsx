"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MetricsChart() {
  const [metrics] = useState({
    weight: [
      { date: "Jan 1", value: 172 },
      { date: "Jan 15", value: 171 },
      { date: "Feb 1", value: 170 },
      { date: "Feb 15", value: 169 },
      { date: "Mar 1", value: 168 },
      { date: "Mar 15", value: 167 },
      { date: "Apr 1", value: 166 },
      { date: "Apr 15", value: 165 },
    ],
    bodyFat: [
      { date: "Jan 1", value: 22 },
      { date: "Jan 15", value: 21.5 },
      { date: "Feb 1", value: 21 },
      { date: "Feb 15", value: 20.5 },
      { date: "Mar 1", value: 20 },
      { date: "Mar 15", value: 19.5 },
      { date: "Apr 1", value: 19 },
      { date: "Apr 15", value: 18.5 },
    ],
    measurements: {
      chest: [
        { date: "Jan 1", value: 44 },
        { date: "Feb 1", value: 43 },
        { date: "Mar 1", value: 42.5 },
        { date: "Apr 1", value: 42 },
      ],
      waist: [
        { date: "Jan 1", value: 36 },
        { date: "Feb 1", value: 35 },
        { date: "Mar 1", value: 34.5 },
        { date: "Apr 1", value: 34 },
      ],
      hips: [
        { date: "Jan 1", value: 40 },
        { date: "Feb 1", value: 39 },
        { date: "Mar 1", value: 38.5 },
        { date: "Apr 1", value: 38 },
      ],
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Metrics Trends</CardTitle>
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
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-end justify-between p-4">
              {metrics.weight.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className="bg-primary w-8 rounded-t-md"
                    style={{
                      height: `${(item.value - 160) * 15}px`,
                    }}
                  />
                  <span className="text-xs">{item.date}</span>
                  <span className="text-xs font-medium">{item.value} lbs</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="body-fat" className="space-y-4 pt-4">
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-end justify-between p-4">
              {metrics.bodyFat.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className="bg-primary w-8 rounded-t-md"
                    style={{
                      height: `${item.value * 8}px`,
                    }}
                  />
                  <span className="text-xs">{item.date}</span>
                  <span className="text-xs font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="measurements" className="pt-4">
            <Tabs defaultValue="chest">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chest">Chest</TabsTrigger>
                <TabsTrigger value="waist">Waist</TabsTrigger>
                <TabsTrigger value="hips">Hips</TabsTrigger>
              </TabsList>
              <TabsContent value="chest" className="space-y-4 pt-4">
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-end justify-between p-4">
                  {metrics.measurements.chest.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div
                        className="bg-primary w-12 rounded-t-md"
                        style={{
                          height: `${(item.value - 38) * 30}px`,
                        }}
                      />
                      <span className="text-xs">{item.date}</span>
                      <span className="text-xs font-medium">{item.value} in</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="waist" className="space-y-4 pt-4">
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-end justify-between p-4">
                  {metrics.measurements.waist.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div
                        className="bg-primary w-12 rounded-t-md"
                        style={{
                          height: `${(item.value - 30) * 30}px`,
                        }}
                      />
                      <span className="text-xs">{item.date}</span>
                      <span className="text-xs font-medium">{item.value} in</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="hips" className="space-y-4 pt-4">
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-end justify-between p-4">
                  {metrics.measurements.hips.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div
                        className="bg-primary w-12 rounded-t-md"
                        style={{
                          height: `${(item.value - 34) * 30}px`,
                        }}
                      />
                      <span className="text-xs">{item.date}</span>
                      <span className="text-xs font-medium">{item.value} in</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
