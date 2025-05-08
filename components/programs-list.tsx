"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Copy, Edit, MoreHorizontal, Share, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ProgramsList() {
  const [programs] = useState([
    {
      id: "1",
      name: "12-Week Strength Builder",
      description: "A comprehensive strength program focusing on progressive overload and compound movements.",
      duration: "12 weeks",
      workoutsPerWeek: 4,
      level: "Intermediate",
      clients: 8,
      lastUpdated: "2023-04-10",
    },
    {
      id: "2",
      name: "HIIT Fat Loss",
      description: "High-intensity interval training program designed for maximum calorie burn and fat loss.",
      duration: "8 weeks",
      workoutsPerWeek: 5,
      level: "Advanced",
      clients: 12,
      lastUpdated: "2023-04-15",
    },
    {
      id: "3",
      name: "Beginner Fitness Foundations",
      description: "An introductory program for beginners focusing on proper form and building basic fitness.",
      duration: "6 weeks",
      workoutsPerWeek: 3,
      level: "Beginner",
      clients: 15,
      lastUpdated: "2023-04-05",
    },
    {
      id: "4",
      name: "Mobility & Recovery",
      description: "A program focused on improving mobility, flexibility, and recovery techniques.",
      duration: "4 weeks",
      workoutsPerWeek: 4,
      level: "All Levels",
      clients: 6,
      lastUpdated: "2023-04-20",
    },
    {
      id: "5",
      name: "Sports Performance",
      description: "Specialized training program for athletes looking to improve sport-specific performance.",
      duration: "10 weeks",
      workoutsPerWeek: 5,
      level: "Advanced",
      clients: 4,
      lastUpdated: "2023-04-18",
    },
    {
      id: "6",
      name: "Post-Pregnancy Fitness",
      description: "Safe and effective program for new mothers looking to regain fitness after pregnancy.",
      duration: "12 weeks",
      workoutsPerWeek: 3,
      level: "Beginner",
      clients: 7,
      lastUpdated: "2023-04-12",
    },
  ])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {programs.map((program) => (
        <Card key={program.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{program.name}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Program
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>{program.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {program.duration}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {program.workoutsPerWeek}x/week
              </Badge>
              <Badge
                variant="outline"
                className={
                  program.level === "Beginner"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : program.level === "Intermediate"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      : program.level === "Advanced"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                }
              >
                {program.level}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{program.clients} clients assigned</span>
              </div>
              <div className="text-muted-foreground">Updated {program.lastUpdated}</div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">View Details</Button>
            <Button>Assign to Client</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
