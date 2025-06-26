"use client"

import * as React from "react"
import { format, startOfWeek, addDays, addWeeks, subWeeks } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Types
type Agent = {
  id: string
  name: string
  email: string
  avatar: string
  color: string
  role: string
  specialties: string[]
  capacity: number // hours per week
  currentLoad: number // hours assigned this week
}

type AgentSchedule = {
  agentId: string
  weeklySchedule: {
    [key: string]: {
      // date string
      hours: number
      clients: {
        clientId: string
        clientName: string
        hours: number
      }[]
    }
  }
}

// Sample data
const agents: Agent[] = [
  {
    id: "agent1",
    name: "John Smith",
    email: "john.smith@whitefox.com",
    avatar: "",
    color: "#4f46e5", // indigo
    role: "Senior SEO Specialist",
    specialties: ["Technical SEO", "Content Strategy", "Local SEO"],
    capacity: 40,
    currentLoad: 32,
  },
  {
    id: "agent2",
    name: "Sarah Johnson",
    email: "sarah.johnson@whitefox.com",
    avatar: "",
    color: "#0891b2", // cyan
    role: "Content Specialist",
    specialties: ["Content Creation", "Keyword Research", "Blog Optimization"],
    capacity: 40,
    currentLoad: 38,
  },
  {
    id: "agent3",
    name: "Michael Brown",
    email: "michael.brown@whitefox.com",
    avatar: "",
    color: "#16a34a", // green
    role: "Link Building Specialist",
    specialties: ["Outreach", "Link Building", "PR"],
    capacity: 40,
    currentLoad: 25,
  },
  {
    id: "agent4",
    name: "Emma Davis",
    email: "emma.davis@whitefox.com",
    avatar: "",
    color: "#db2777", // pink
    role: "Technical SEO Specialist",
    specialties: ["Site Audits", "Schema Markup", "Site Speed Optimization"],
    capacity: 40,
    currentLoad: 36,
  },
  {
    id: "agent5",
    name: "David Wilson",
    email: "david.wilson@whitefox.com",
    avatar: "",
    color: "#ea580c", // orange
    role: "SEO Analyst",
    specialties: ["Analytics", "Reporting", "Competitive Analysis"],
    capacity: 40,
    currentLoad: 30,
  },
]

// Generate sample schedule data
const generateAgentSchedules = (): AgentSchedule[] => {
  const schedules: AgentSchedule[] = []

  agents.forEach((agent) => {
    const weeklySchedule: AgentSchedule["weeklySchedule"] = {}
    const today = new Date()
    const weekStart = startOfWeek(today)

    // Generate data for each day of the week
    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i)
      const dateStr = format(date, "yyyy-MM-dd")

      // Skip weekends with less or no hours
      const isWeekend = i === 0 || i === 6
      const dailyHours = isWeekend
        ? Math.random() > 0.7
          ? Math.floor(Math.random() * 4)
          : 0
        : 4 + Math.floor(Math.random() * 5)

      if (dailyHours > 0) {
        const clients = []
        let remainingHours = dailyHours

        // Assign hours to random clients
        while (remainingHours > 0) {
          const clientId = `client${Math.floor(Math.random() * 5) + 1}`
          const clientName = [
            "Acme Corporation",
            "TechNova Solutions",
            "Global Enterprises",
            "Bright Future Media",
            "Stellar Innovations",
          ][Number.parseInt(clientId.replace("client", "")) - 1]
          const hours = Math.min(remainingHours, 1 + Math.floor(Math.random() * 3))

          clients.push({
            clientId,
            clientName,
            hours,
          })

          remainingHours -= hours
        }

        weeklySchedule[dateStr] = {
          hours: dailyHours,
          clients,
        }
      } else {
        weeklySchedule[dateStr] = {
          hours: 0,
          clients: [],
        }
      }
    }

    schedules.push({
      agentId: agent.id,
      weeklySchedule,
    })
  })

  return schedules
}

const agentSchedules = React.useMemo(() => generateAgentSchedules(), [])

export function SEOAgentWorkload() {
  const [currentWeekStart, setCurrentWeekStart] = React.useState(startOfWeek(new Date()))
  const [view, setView] = React.useState<"overview" | "detailed">("overview")

  const handlePreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1))
  }

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1))
  }

  const handleCurrentWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date()))
  }

  // Get week dates
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))

  // Get agent's schedule for the current week
  const getAgentWeeklyHours = (agentId: string) => {
    const agentSchedule = agentSchedules.find((schedule) => schedule.agentId === agentId)
    if (!agentSchedule) return { total: 0, daily: [] }

    let totalHours = 0
    const dailyHours = weekDates.map((date) => {
      const dateStr = format(date, "yyyy-MM-dd")
      const daySchedule = agentSchedule.weeklySchedule[dateStr] || { hours: 0, clients: [] }
      totalHours += daySchedule.hours
      return daySchedule.hours
    })

    return { total: totalHours, daily: dailyHours }
  }

  // Get agent's client distribution for the week
  const getAgentClientDistribution = (agentId: string) => {
    const agentSchedule = agentSchedules.find((schedule) => schedule.agentId === agentId)
    if (!agentSchedule) return []

    const clientHours: { [key: string]: { clientId: string; clientName: string; hours: number } } = {}

    weekDates.forEach((date) => {
      const dateStr = format(date, "yyyy-MM-dd")
      const daySchedule = agentSchedule.weeklySchedule[dateStr] || { hours: 0, clients: [] }

      daySchedule.clients.forEach((client) => {
        if (!clientHours[client.clientId]) {
          clientHours[client.clientId] = {
            clientId: client.clientId,
            clientName: client.clientName,
            hours: 0,
          }
        }
        clientHours[client.clientId].hours += client.hours
      })
    })

    return Object.values(clientHours).sort((a, b) => b.hours - a.hours)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold">Week of {format(currentWeekStart, "MMMM d, yyyy")}</h2>
          <Button variant="outline" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleCurrentWeek}>
            Current Week
          </Button>
        </div>

        <Tabs value={view} onValueChange={(value) => setView(value as any)} className="w-[300px]">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => {
          const weeklyHours = getAgentWeeklyHours(agent.id)
          const utilization = Math.round((weeklyHours.total / agent.capacity) * 100)

          return (
            <Card key={agent.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                      <AvatarFallback style={{ backgroundColor: agent.color }}>
                        {agent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{agent.name}</CardTitle>
                      <CardDescription>{agent.role}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Weekly Utilization</span>
                      <span className="font-medium">
                        {weeklyHours.total} / {agent.capacity} hours ({utilization}%)
                      </span>
                    </div>
                    <Progress value={utilization} className="h-2 mt-1" />
                  </div>

                  {view === "overview" ? (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Specialties</div>
                      <div className="flex flex-wrap gap-1">
                        {agent.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="text-sm font-medium mt-3">Top Clients This Week</div>
                      <div className="space-y-2">
                        {getAgentClientDistribution(agent.id)
                          .slice(0, 3)
                          .map((client) => (
                            <div key={client.clientId} className="flex items-center justify-between text-sm">
                              <span>{client.clientName}</span>
                              <span>{client.hours} hours</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-sm font-medium">Daily Schedule</div>
                      <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                          <div key={i}>{day}</div>
                        ))}
                        {weeklyHours.daily.map((hours, i) => (
                          <div
                            key={i}
                            className="rounded py-1"
                            style={{
                              backgroundColor:
                                hours === 0
                                  ? "#f3f4f6"
                                  : `${agent.color}${Math.min(Math.round((hours / 8) * 100), 100)}`,
                            }}
                          >
                            {hours}h
                          </div>
                        ))}
                      </div>

                      <div className="text-sm font-medium mt-2">Client Allocation</div>
                      <div className="space-y-1">
                        {getAgentClientDistribution(agent.id).map((client) => (
                          <div key={client.clientId} className="flex items-center justify-between text-xs">
                            <span>{client.clientName}</span>
                            <span>{client.hours} hours</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
