"use client"

import { useState, useEffect } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import enUS from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useData } from "@/context/data-context"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

type Event = {
  id: string
  title: string
  start: Date
  end: Date
  allDay?: boolean
  resource?: any
  type: "meeting" | "task" | "reminder"
  client?: string
  project?: string
  description?: string
}

// Adjust dates to be relative to current date
const adjustDates = (events: Event[]) => {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  return events.map((event) => {
    const newStart = new Date(event.start)
    newStart.setMonth(currentMonth)
    newStart.setFullYear(currentYear)

    const newEnd = new Date(event.end)
    newEnd.setMonth(currentMonth)
    newEnd.setFullYear(currentYear)

    // Ensure dates are in the future
    if (newStart < today) {
      newStart.setDate(newStart.getDate() + 7)
      newEnd.setDate(newEnd.getDate() + 7)
    }

    return {
      ...event,
      start: newStart,
      end: newEnd,
    }
  })
}

export function ScheduleCalendar() {
  const { projects, clients } = useData()
  const [events, setEvents] = useState<Event[]>([])
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isViewEventOpen, setIsViewEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    start: new Date(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour later
    type: "meeting",
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events")
        if (response.ok) {
          const data = await response.json()
          // Convert string dates back to Date objects
          const eventsWithDates = data.map((event: any) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }))
          setEvents(eventsWithDates)
        }
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }
    fetchEvents()
  }, [])

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({
      title: "",
      start,
      end,
      type: "meeting",
    })
    setIsAddEventOpen(true)
  }

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event)
    setIsViewEventOpen(true)
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return

    const event: Event = {
      id: `event${events.length + 1}`,
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      type: newEvent.type as "meeting" | "task" | "reminder",
      client: newEvent.client,
      project: newEvent.project,
      description: newEvent.description,
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
      type: "meeting",
    })
    setIsAddEventOpen(false)
  }

  const eventStyleGetter = (event: Event) => {
    let backgroundColor = "#3b82f6" // Default blue

    switch (event.type) {
      case "meeting":
        backgroundColor = "#3b82f6" // Blue
        break
      case "task":
        backgroundColor = "#10b981" // Green
        break
      case "reminder":
        backgroundColor = "#f59e0b" // Yellow
        break
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h2 className="text-2xl font-bold">Schedule</h2>
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button>Add Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value) => setNewEvent({ ...newEvent, type: value as Event["type"] })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start" className="text-right">
                  Start
                </Label>
                <Input
                  id="start"
                  type="datetime-local"
                  value={format(newEvent.start || new Date(), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end" className="text-right">
                  End
                </Label>
                <Input
                  id="end"
                  type="datetime-local"
                  value={format(newEvent.end || new Date(), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <Input
                  id="client"
                  value={newEvent.client || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, client: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">
                  Project
                </Label>
                <Input
                  id="project"
                  value={newEvent.project || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, project: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newEvent.description || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: 700 }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              eventPropGetter={eventStyleGetter}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={isViewEventOpen} onOpenChange={setIsViewEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-sm font-medium text-right">Type:</div>
              <div className="col-span-3 capitalize">{selectedEvent?.type}</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-sm font-medium text-right">Start:</div>
              <div className="col-span-3">{selectedEvent?.start && format(selectedEvent.start, "PPpp")}</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-sm font-medium text-right">End:</div>
              <div className="col-span-3">{selectedEvent?.end && format(selectedEvent.end, "PPpp")}</div>
            </div>
            {selectedEvent?.client && (
              <div className="grid grid-cols-4 gap-4">
                <div className="text-sm font-medium text-right">Client:</div>
                <div className="col-span-3">{selectedEvent?.client}</div>
              </div>
            )}
            {selectedEvent?.project && (
              <div className="grid grid-cols-4 gap-4">
                <div className="text-sm font-medium text-right">Project:</div>
                <div className="col-span-3">{selectedEvent?.project}</div>
              </div>
            )}
            {selectedEvent?.description && (
              <div className="grid grid-cols-4 gap-4">
                <div className="text-sm font-medium text-right">Description:</div>
                <div className="col-span-3">{selectedEvent?.description}</div>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsViewEventOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
