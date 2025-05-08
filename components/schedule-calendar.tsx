"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

export function ScheduleCalendar() {
  const [currentMonth] = useState("April 2023")

  // Mock data for calendar events
  const events = [
    {
      id: 1,
      date: "2023-04-24",
      time: "10:00 AM",
      client: "Sarah Johnson",
      type: "Strength Training",
      duration: "60 min",
    },
    { id: 2, date: "2023-04-24", time: "2:30 PM", client: "Michael Chen", type: "HIIT", duration: "45 min" },
    {
      id: 3,
      date: "2023-04-25",
      time: "9:15 AM",
      client: "Emma Wilson",
      type: "Mobility & Recovery",
      duration: "60 min",
    },
    {
      id: 4,
      date: "2023-04-25",
      time: "4:00 PM",
      client: "James Rodriguez",
      type: "Strength Training",
      duration: "45 min",
    },
    { id: 5, date: "2023-04-27", time: "11:30 AM", client: "Olivia Smith", type: "Assessment", duration: "30 min" },
    { id: 6, date: "2023-04-28", time: "3:00 PM", client: "David Kim", type: "HIIT", duration: "45 min" },
  ]

  // Generate calendar days
  const days = Array.from({ length: 35 }, (_, i) => {
    const day = i - 5 // Start from previous month's last days
    return {
      date: day,
      isCurrentMonth: day > 0 && day <= 30,
      hasEvents: events.some((event) => {
        const eventDate = new Date(event.date)
        return eventDate.getDate() === day
      }),
      events: events.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate.getDate() === day
      }),
    }
  })

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold">{currentMonth}</h2>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="michael">Michael Chen</SelectItem>
                <SelectItem value="emma">Emma Wilson</SelectItem>
                <SelectItem value="james">James Rodriguez</SelectItem>
                <SelectItem value="olivia">Olivia Smith</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Session
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-medium py-2">
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-[120px] p-2 border rounded-md ${
                day.isCurrentMonth ? "bg-background" : "bg-muted/30 text-muted-foreground"
              } ${day.date === 24 ? "ring-2 ring-primary" : ""}`}
            >
              <div className="font-medium mb-1">{day.date > 0 ? day.date : ""}</div>
              <div className="space-y-1">
                {day.events.map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 rounded bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/20"
                  >
                    <div className="font-medium">{event.time}</div>
                    <div className="flex items-center gap-1">
                      <Avatar className="h-4 w-4">
                        <AvatarImage
                          src={`/abstract-geometric-shapes.png?height=16&width=16&query=${event.client}`}
                          alt={event.client}
                        />
                        <AvatarFallback className="text-[8px]">
                          {event.client
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate">{event.client}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <Badge variant="outline" className="text-[8px] px-1 py-0">
                        {event.type}
                      </Badge>
                      <span>{event.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
