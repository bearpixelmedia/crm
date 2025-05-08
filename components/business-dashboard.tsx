"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Calendar, DollarSign, Download, LineChart, TrendingUp, Users } from "lucide-react"

export function BusinessDashboard() {
  const [currentMonth] = useState("April 2023")

  return (
    <div className="mt-6">
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="clients">Client Acquisition</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,550</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">+3</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Client Retention</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">+2.1%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessions Completed</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">168</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">+8.3%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue breakdown for {currentMonth}</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-end justify-between p-4">
                  {[
                    { week: "Week 1", value: 1200 },
                    { week: "Week 2", value: 1350 },
                    { week: "Week 3", value: 950 },
                    { week: "Week 4", value: 1050 },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div
                        className="bg-primary w-16 rounded-t-md"
                        style={{
                          height: `${(item.value / 1500) * 250}px`,
                        }}
                      />
                      <span className="text-xs">{item.week}</span>
                      <span className="text-xs font-medium">${item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
                <CardDescription>Breakdown by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">1:1 Training</div>
                      <div className="text-muted-foreground">$2,800 (62%)</div>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Group Classes</div>
                      <div className="text-muted-foreground">$950 (21%)</div>
                    </div>
                    <Progress value={21} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Online Coaching</div>
                      <div className="text-muted-foreground">$650 (14%)</div>
                    </div>
                    <Progress value={14} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Nutrition Plans</div>
                      <div className="text-muted-foreground">$150 (3%)</div>
                    </div>
                    <Progress value={3} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Growth</CardTitle>
                <CardDescription>New vs. churned clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-green-500">+5</div>
                      <div className="text-sm text-muted-foreground">New Clients</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-red-500">-2</div>
                      <div className="text-sm text-muted-foreground">Churned Clients</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Net Growth</div>
                    <div className="flex items-center">
                      <div className="flex-1 bg-muted h-2 rounded-md overflow-hidden">
                        <div className="bg-green-500 h-full" style={{ width: "71%" }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">+3 (7.7%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Health Score</CardTitle>
                <CardDescription>Overall performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[200px]">
                  <div className="text-5xl font-bold">85</div>
                  <div className="text-sm text-muted-foreground mt-2">Business Health Score</div>
                  <div className="flex items-center mt-4 text-green-500">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Up 5 points from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end mt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Detailed revenue breakdown and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center">
                  <LineChart className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">Detailed revenue analytics will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Acquisition</CardTitle>
              <CardDescription>Track your client acquisition channels and conversion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center">
                  <Users className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">Client acquisition analytics will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Retention</CardTitle>
              <CardDescription>Analyze client retention rates and churn factors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center">
                  <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">Client retention analytics will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
