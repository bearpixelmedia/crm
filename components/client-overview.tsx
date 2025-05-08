"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Users } from "lucide-react"

interface ClientOverviewProps {
  className?: string
}

export function ClientOverview({ className }: ClientOverviewProps) {
  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Client Overview</CardTitle>
          <CardDescription>Manage and track your clients' progress</CardDescription>
        </div>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">Total Clients</div>
                <div className="text-muted-foreground">50/50</div>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">Active Clients</div>
                <div className="text-muted-foreground">42/50</div>
              </div>
              <Progress value={84} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Client Engagement</div>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div className="space-y-1">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md font-bold">85%</div>
                <div className="text-muted-foreground">Workout Completion</div>
              </div>
              <div className="space-y-1">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md font-bold">92%</div>
                <div className="text-muted-foreground">App Usage</div>
              </div>
              <div className="space-y-1">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-md font-bold">78%</div>
                <div className="text-muted-foreground">Nutrition Tracking</div>
              </div>
              <div className="space-y-1">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-md font-bold">
                  <span className="flex items-center justify-center">
                    12% <ArrowUpRight className="h-3 w-3 ml-1" />
                  </span>
                </div>
                <div className="text-muted-foreground">New Clients</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Client Distribution</div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="space-y-1">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md font-bold">15</div>
                <div className="text-muted-foreground">Beginner</div>
              </div>
              <div className="space-y-1">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-md font-bold">22</div>
                <div className="text-muted-foreground">Intermediate</div>
              </div>
              <div className="space-y-1">
                <div className="bg-red-100 dark:bg-red-900 p-2 rounded-md font-bold">5</div>
                <div className="text-muted-foreground">Advanced</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
