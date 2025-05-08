"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LineChart, BarChart, Settings, Download, Calendar } from "lucide-react"

export function ClientsList() {
  const [activeTab, setActiveTab] = useState("stats")

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Personal Dashboard</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="icon" size="sm">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="history">Workout History</TabsTrigger>
            <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
          </TabsList>
          <TabsContent value="stats" className="p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Days</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18/30</div>
                  <p className="text-xs text-muted-foreground">60% consistency</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Time</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32h 10m</div>
                  <p className="text-xs text-muted-foreground">+5h from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14,250</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Body Metrics</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Weight Tracking</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center bg-muted/20">
                    <p className="text-muted-foreground">Weight chart visualization</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Body Measurements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Weight</span>
                        <span className="font-medium">70 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Starting Weight</span>
                        <span className="font-medium">75 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weight Change</span>
                        <span className="font-medium text-green-600">-5 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Body Fat %</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">BMI</span>
                        <span className="font-medium">22.9</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="history" className="p-4">
            <div className="space-y-4">
              <div className="border rounded-md">
                <div className="bg-muted px-4 py-2 rounded-t-md font-medium">April 2023</div>
                <div className="divide-y">
                  <div className="px-4 py-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium">Upper Body Strength</div>
                      <div className="text-sm text-muted-foreground">April 25, 2023 • 45 min</div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                  <div className="px-4 py-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium">HIIT Cardio</div>
                      <div className="text-sm text-muted-foreground">April 23, 2023 • 30 min</div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                  <div className="px-4 py-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium">Lower Body Strength</div>
                      <div className="text-sm text-muted-foreground">April 21, 2023 • 50 min</div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-md">
                <div className="bg-muted px-4 py-2 rounded-t-md font-medium">March 2023</div>
                <div className="divide-y">
                  <div className="px-4 py-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium">Full Body Workout</div>
                      <div className="text-sm text-muted-foreground">March 28, 2023 • 60 min</div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                  <div className="px-4 py-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium">Mobility & Recovery</div>
                      <div className="text-sm text-muted-foreground">March 26, 2023 • 40 min</div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="goals" className="p-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Current Goals</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Weight Goal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current</span>
                          <span className="font-medium">70 kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Target</span>
                          <span className="font-medium">68 kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Remaining</span>
                          <span className="font-medium">2 kg</span>
                        </div>
                        <div className="pt-2">
                          <div className="bg-muted h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: "60%" }}></div>
                          </div>
                          <div className="text-xs text-right mt-1 text-muted-foreground">60% complete</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Strength Goal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Bench Press</span>
                          <span className="font-medium">80 kg / 100 kg</span>
                        </div>
                        <div className="pt-1">
                          <div className="bg-muted h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: "80%" }}></div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Squat</span>
                          <span className="font-medium">120 kg / 150 kg</span>
                        </div>
                        <div className="pt-1">
                          <div className="bg-muted h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: "80%" }}></div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Deadlift</span>
                          <span className="font-medium">140 kg / 180 kg</span>
                        </div>
                        <div className="pt-1">
                          <div className="bg-muted h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: "78%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Habit Tracking</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Workout 3x per week</span>
                          <span className="text-green-600">On track</span>
                        </div>
                        <div className="bg-muted h-2 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full rounded-full" style={{ width: "100%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Protein intake (120g daily)</span>
                          <span className="text-yellow-600">Needs work</span>
                        </div>
                        <div className="bg-muted h-2 rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Sleep 7+ hours</span>
                          <span className="text-green-600">On track</span>
                        </div>
                        <div className="bg-muted h-2 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Daily stretching</span>
                          <span className="text-red-600">Off track</span>
                        </div>
                        <div className="bg-muted h-2 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
