"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RecentWorkoutsProps {
  className?: string
}

export function RecentWorkouts({ className }: RecentWorkoutsProps) {
  const [workouts] = useState([
    {
      id: "1",
      name: "Upper Body Strength",
      date: "2023-04-23",
      duration: "45 min",
      type: "Strength",
      completed: true,
    },
    {
      id: "2",
      name: "HIIT Cardio",
      date: "2023-04-21",
      duration: "30 min",
      type: "Cardio",
      completed: true,
    },
    {
      id: "3",
      name: "Leg Day",
      date: "2023-04-19",
      duration: "60 min",
      type: "Strength",
      completed: true,
    },
    {
      id: "4",
      name: "Core Workout",
      date: "2023-04-17",
      duration: "25 min",
      type: "Strength",
      completed: true,
    },
    {
      id: "5",
      name: "Yoga Flow",
      date: "2023-04-15",
      duration: "45 min",
      type: "Flexibility",
      completed: true,
    },
  ])

  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Recent Workouts</CardTitle>
        <CardDescription>You've completed 12 workouts this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workouts.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell className="font-medium">{workout.name}</TableCell>
                <TableCell>{workout.date}</TableCell>
                <TableCell>{workout.duration}</TableCell>
                <TableCell>{workout.type}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    Completed
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
