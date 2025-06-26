"use client"

import * as React from "react"
import {
  addDays,
  addMonths,
  format,
  getDay,
  isToday,
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
} from "date-fns"
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Types
type Agent = {
  id: string
  name: string
  color: string
  availability: {
    [key: string]: boolean // date string -> available
  }
}

type Client = {
  id: string
  name: string
  company: string
}

type ScheduleEvent = {
  id: string
  title: string
  clientId: string
  clientName: string
  agentId: string
  agentName: string
  agentColor: string
  date: string
  startTime: string
  endTime: string
  description: string
  type: "audit" | "keyword-research" | "on-page" | "content" | "link-building" | "reporting" | "meeting" | "other"
}

// Sample data
const agents: Agent[] = [
  {
    id: "agent1",
    name: "John Smith",
    color: "#4f46e5", // indigo
    availability: {},
  },
  {
    id: "agent2",
    name: "Sarah Johnson",
    color: "#0891b2", // cyan
    availability: {},
  },
  {
    id: "agent3",
    name: "Michael Brown",
    color: "#16a34a", // green
    availability: {},
  },
  {
    id: "agent4",
    name: "Emma Davis",
    color: "#db2777", // pink
    availability: {},
  },
  {
    id: "agent5",
    name: "David Wilson",
    color: "#ea580c", // orange
    availability: {},
  },
]

const clients: Client[] = [
  { id: "client1", name: "Acme Corporation", company: "Acme Inc." },
  { id: "client2", name: "TechNova Solutions", company: "TechNova LLC" },
  { id: "client3", name: "Global Enterprises", company: "Global Enterprises Inc." },
  { id: "client4", name: "Bright Future Media", company: "BFM Holdings" },
  { id: "client5", name: "Stellar Innovations", company: "Stellar Group" },
]

// Generate some sample events
const generateSampleEvents = (): ScheduleEvent[] => {
  const events: ScheduleEvent[] = []
  const today = new Date()

  // Add some events for the current month
  for (let i = 0; i < 20; i++) {
    const randomDayOffset = Math.floor(Math.random() * 30) - 10
    const randomAgent = agents[Math.floor(Math.random() * agents.length)]
    const randomClient = clients[Math.floor(Math.random() * clients.length)]
    const randomType = [
      "audit",
      "keyword-research",
      "on-page",
      "content",
      "link-building",
      "reporting",
      "meeting",
      "other",
    ][Math.floor(Math.random() * 8)] as ScheduleEvent["type"]

    const date = addDays(today, randomDayOffset)
    const startHour = 9 + Math.floor(Math.random() * 7) // Between 9 AM and 4 PM

    events.push({
      id: `event${i}`,
      title: `${randomType
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")} for ${randomClient.name}`,
      clientId: randomClient.id,
      clientName: randomClient.name,
      agentId: randomAgent.id,
      agentName: randomAgent.name,
      agentColor: randomAgent.color,
      date: format(date, "yyyy-MM-dd"),
      startTime: `${startHour}:00`,
      endTime: `${startHour + 1}:30`,
      description: `Working on ${randomType.replace("-", " ")} tasks for ${randomClient.name}`,
      type: randomType,
    })
  }

  return events
}

export function SEOCalendarScheduler() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const sampleEvents = React.useMemo(() => generateSampleEvents(), [])
  const [events, setEvents] = React.useState<ScheduleEvent[]>(sampleEvents)
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = React.useState(false)
  const [isViewEventDialogOpen, setIsViewEventDialogOpen] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState<ScheduleEvent | null>(null)
  const [newEvent, setNewEvent] = React.useState<Partial<ScheduleEvent>>({
    title: "",
    clientId: "",
    agentId: "",
    date: "",
    startTime: "09:00",
    endTime: "10:30",
    description: "",
    type: "other",
  })
  const [view, setView] = React.useState<"month" | "week" | "day" | "agenda">("month")
  const [filter, setFilter] = React.useState({
    agent: "all",
    client: "all",
    type: "all",
  })

  // Get days for the current month view
  const getDaysForMonthView = () => {
    const start = startOfMonth(currentDate)
    const end = endOfMonth(currentDate)

    // Get all days in the month
    const daysInMonth = eachDayOfInterval({ start, end })

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const startDay = getDay(start)

    // Add days from the previous month to fill the first row
    const previousMonthDays = Array.from({ length: startDay }, (_, i) => {
      return addDays(start, -(startDay - i))
    })

    // Add days from the next month to complete the grid (6 rows x 7 days = 42 cells)
    const totalCells = 42
    const nextMonthDays = Array.from(
      { length: totalCells - (previousMonthDays.length + daysInMonth.length) },
      (_, i) => {
        return addDays(end, i + 1)
      },
    )

    return [...previousMonthDays, ...daysInMonth, ...nextMonthDays]
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return events.filter((event) => {
      // Apply filters
      const agentMatch = filter.agent === "all" || event.agentId === filter.agent
      const clientMatch = filter.client === "all" || event.clientId === filter.client
      const typeMatch = filter.type === "all" || event.type === filter.type

      return event.date === dateStr && agentMatch && clientMatch && typeMatch
    })
  }

  // Handle month navigation
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  // Handle event creation
  const handleAddEvent = () => {
    if (selectedDate) {
      setNewEvent({
        ...newEvent,
        date: format(selectedDate, "yyyy-MM-dd"),
      })
    }
    setIsAddEventDialogOpen(true)
  }

  const handleCreateEvent = () => {
    if (!newEvent.clientId || !newEvent.agentId || !newEvent.date || !newEvent.startTime || !newEvent.endTime) {
      // Show validation error
      return
    }

    const selectedAgent = agents.find((agent) => agent.id === newEvent.agentId)
    const selectedClient = clients.find((client) => client.id === newEvent.clientId)

    if (!selectedAgent || !selectedClient) return

    const createdEvent: ScheduleEvent = {
      id: `event${events.length + 1}`,
      title: newEvent.title || `Work with ${selectedClient.name}`,
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      agentId: selectedAgent.id,
      agentName: selectedAgent.name,
      agentColor: selectedAgent.color,
      date: newEvent.date,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      description: newEvent.description || "",
      type: (newEvent.type as ScheduleEvent["type"]) || "other",
    }

    setEvents([...events, createdEvent])
    setIsAddEventDialogOpen(false)
    setNewEvent({
      title: "",
      clientId: "",
      agentId: "",
      date: "",
      startTime: "09:00",
      endTime: "10:30",
      description: "",
      type: "other",
    })
  }

  // Handle event selection
  const handleEventClick = (event: ScheduleEvent) => {
    setSelectedEvent(event)
    setIsViewEventDialogOpen(true)
  }

  // Handle event deletion
  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    setIsViewEventDialogOpen(false)
    setSelectedEvent(null)
  }

  // Render day cell for month view
  const renderDayCell = (day: Date) => {
    const isCurrentMonth = isSameMonth(day, currentDate)
    const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
    const dayEvents = getEventsForDate(day)

    return (
      <div
        key={day.toString()}
        className={cn(
          "h-32 border p-1 relative",
          !isCurrentMonth && "bg-muted/50",
          isToday(day) && "bg-blue-50",
          isSelected && "ring-2 ring-primary",
        )}
        onClick={() => setSelectedDate(day)}
      >
        <div className="flex justify-between">
          <span
            className={cn(
              "text-sm font-medium",
              !isCurrentMonth && "text-muted-foreground",
              isToday(day) &&
                "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center",
            )}
          >
            {format(day, "d")}
          </span>
          {isCurrentMonth && dayEvents.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedDate(day)
                handleAddEvent()
              }}
            >
              <Plus className="h-3 w-3" />
            </Button>
          )}
        </div>
        <ScrollArea className="h-24 mt-1">
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="text-xs rounded px-1 py-0.5 truncate cursor-pointer"
                style={{ backgroundColor: `${event.agentColor}20`, borderLeft: `3px solid ${event.agentColor}` }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleEventClick(event)
                }}
              >
                {event.startTime.substring(0, 5)} - {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-muted-foreground text-center">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </ScrollArea>
      </div>
    )
  }

  // Render week view
  const renderWeekView = () => {
    // Get the start of the week (Sunday)
    const startOfWeek = addDays(currentDate, -getDay(currentDate))
    const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i))

    return (
      <div className="space-y-2">
        <div className="grid grid-cols-8 gap-2">
          <div className="border p-2 font-medium text-center">Time</div>
          {daysOfWeek.map((day) => (
            <div
              key={day.toString()}
              className={cn("border p-2 font-medium text-center", isToday(day) && "bg-blue-50")}
            >
              <div>{format(day, "EEE")}</div>
              <div
                className={cn(
                  "text-sm",
                  isToday(day) &&
                    "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mx-auto",
                )}
              >
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
            <React.Fragment key={hour}>
              <div className="border p-2 text-sm text-center">{hour}:00</div>
              {daysOfWeek.map((day) => {
                const dayEvents = getEventsForDate(day).filter((event) => {
                  const eventHour = Number.parseInt(event.startTime.split(":")[0])
                  return eventHour === hour
                })

                return (
                  <div
                    key={`${day.toString()}-${hour}`}
                    className={cn("border p-1 min-h-[60px] relative", isToday(day) && "bg-blue-50")}
                    onClick={() => {
                      setSelectedDate(day)
                      setNewEvent({
                        ...newEvent,
                        date: format(day, "yyyy-MM-dd"),
                        startTime: `${hour}:00`,
                        endTime: `${hour + 1}:30`,
                      })
                      setIsAddEventDialogOpen(true)
                    }}
                  >
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="text-xs rounded px-1 py-0.5 mb-1 cursor-pointer"
                        style={{
                          backgroundColor: `${event.agentColor}20`,
                          borderLeft: `3px solid ${event.agentColor}`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEventClick(event)
                        }}
                      >
                        {event.startTime.substring(0, 5)} - {event.title}
                      </div>
                    ))}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }

  // Render day view
  const renderDayView = () => {
    const dayToShow = selectedDate || currentDate
    const dayEvents = getEventsForDate(dayToShow)

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium">{format(dayToShow, "EEEE, MMMM d, yyyy")}</h3>
        </div>

        <div className="space-y-2">
          {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => {
            const hourEvents = dayEvents.filter((event) => {
              const eventHour = Number.parseInt(event.startTime.split(":")[0])
              return eventHour === hour
            })

            return (
              <div key={hour} className="grid grid-cols-12 gap-2">
                <div className="col-span-1 text-right py-2 text-sm">{hour}:00</div>
                <div
                  className="col-span-11 border-l border-b p-2 min-h-[60px]"
                  onClick={() => {
                    setNewEvent({
                      ...newEvent,
                      date: format(dayToShow, "yyyy-MM-dd"),
                      startTime: `${hour}:00`,
                      endTime: `${hour + 1}:30`,
                    })
                    setIsAddEventDialogOpen(true)
                  }}
                >
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-sm rounded px-2 py-1 mb-1 cursor-pointer"
                      style={{ backgroundColor: `${event.agentColor}20`, borderLeft: `3px solid ${event.agentColor}` }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEventClick(event)
                      }}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs">
                        {event.startTime} - {event.endTime} | {event.agentName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Render agenda view
  const renderAgendaView = () => {
    // Group events by date
    const eventsByDate: { [key: string]: ScheduleEvent[] } = {}

    events.forEach((event) => {
      // Apply filters
      const agentMatch = filter.agent === "all" || event.agentId === filter.agent
      const clientMatch = filter.client === "all" || event.clientId === filter.client
      const typeMatch = filter.type === "all" || event.type === filter.type

      if (agentMatch && clientMatch && typeMatch) {
        if (!eventsByDate[event.date]) {
          eventsByDate[event.date] = []
        }
        eventsByDate[event.date].push(event)
      }
    })

    // Sort dates
    const sortedDates = Object.keys(eventsByDate).sort()

    return (
      <div className="space-y-6">
        {sortedDates.map((dateStr) => {
          const date = new Date(dateStr)
          const dateEvents = eventsByDate[dateStr].sort((a, b) => a.startTime.localeCompare(b.startTime))

          return (
            <div key={dateStr} className="space-y-2">
              <h3 className="text-lg font-medium sticky top-0 bg-background py-2">
                {format(date, "EEEE, MMMM d, yyyy")}
              </h3>
              <div className="space-y-2 pl-4">
                {dateEvents.map((event) => (
                  <Card key={event.id} className="cursor-pointer" onClick={() => handleEventClick(event)}>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{event.title}</CardTitle>
                          <CardDescription>
                            {event.startTime} - {event.endTime}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          style={{ backgroundColor: `${event.agentColor}20`, borderColor: event.agentColor }}
                        >
                          {event.agentName}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-sm">
                        <div>
                          <strong>Client:</strong> {event.clientName}
                        </div>
                        <div>
                          <strong>Type:</strong>{" "}
                          {event.type
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </div>
                        {event.description && <div className="mt-2">{event.description}</div>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}

        {sortedDates.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No events found with the current filters.</div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Tabs value={view} onValueChange={(value) => setView(value as any)} className="w-[400px]">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button onClick={handleAddEvent}>
            <Plus className="mr-2 h-4 w-4" /> Schedule
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-2">
          <Label htmlFor="agent-filter" className="text-sm">
            Agent:
          </Label>
          <Select value={filter.agent} onValueChange={(value) => setFilter({ ...filter, agent: value })}>
            <SelectTrigger id="agent-filter" className="w-[180px]">
              <SelectValue placeholder="All Agents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: agent.color }}></div>
                    {agent.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="client-filter" className="text-sm">
            Client:
          </Label>
          <Select value={filter.client} onValueChange={(value) => setFilter({ ...filter, client: value })}>
            <SelectTrigger id="client-filter" className="w-[180px]">
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="type-filter" className="text-sm">
            Type:
          </Label>
          <Select value={filter.type} onValueChange={(value) => setFilter({ ...filter, type: value })}>
            <SelectTrigger id="type-filter" className="w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="audit">Audit</SelectItem>
              <SelectItem value="keyword-research">Keyword Research</SelectItem>
              <SelectItem value="on-page">On-Page Optimization</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="link-building">Link Building</SelectItem>
              <SelectItem value="reporting">Reporting</SelectItem>
              <SelectItem value="meeting">Meeting</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg">
        {view === "month" && (
          <div className="grid grid-cols-7 gap-px">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center font-medium">
                {day}
              </div>
            ))}
            {getDaysForMonthView().map(renderDayCell)}
          </div>
        )}

        {view === "week" && renderWeekView()}

        {view === "day" && renderDayView()}

        {view === "agenda" && renderAgendaView()}
      </div>

      {/* Add Event Dialog */}
      <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule Client Work</DialogTitle>
            <DialogDescription>Create a new scheduled work session for a client.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Work session title"
                value={newEvent.title || ""}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client" className="text-right">
                Client
              </Label>
              <Select
                value={newEvent.clientId}
                onValueChange={(value) => setNewEvent({ ...newEvent, clientId: value })}
              >
                <SelectTrigger id="client" className="col-span-3">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent" className="text-right">
                Agent
              </Label>
              <Select value={newEvent.agentId} onValueChange={(value) => setNewEvent({ ...newEvent, agentId: value })}>
                <SelectTrigger id="agent" className="col-span-3">
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: agent.color }}></div>
                        {agent.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newEvent.date || ""}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="start-time"
                  type="time"
                  value={newEvent.startTime || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                />
                <span>to</span>
                <Input
                  id="end-time"
                  type="time"
                  value={newEvent.endTime || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={newEvent.type as string}
                onValueChange={(value) => setNewEvent({ ...newEvent, type: value as ScheduleEvent["type"] })}
              >
                <SelectTrigger id="type" className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audit">Audit</SelectItem>
                  <SelectItem value="keyword-research">Keyword Research</SelectItem>
                  <SelectItem value="on-page">On-Page Optimization</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="link-building">Link Building</SelectItem>
                  <SelectItem value="reporting">Reporting</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Details about the work session"
                value={newEvent.description || ""}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateEvent}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={isViewEventDialogOpen} onOpenChange={setIsViewEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>{format(new Date(selectedEvent.date), "EEEE, MMMM d, yyyy")}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedEvent.agentColor }}></div>
                    <span className="font-medium">{selectedEvent.agentName}</span>
                  </div>
                  <Badge variant="outline">
                    {selectedEvent.type
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Time</Label>
                    <div>
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm text-muted-foreground">Client</Label>
                    <div>{selectedEvent.clientName}</div>
                  </div>
                </div>

                {selectedEvent.description && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Description</Label>
                    <div className="mt-1">{selectedEvent.description}</div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewEventDialogOpen(false)}>
                  Close
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                  <X className="mr-2 h-4 w-4" /> Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
