import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ScheduleCalendar } from "@/components/schedule-calendar"

export const metadata: Metadata = {
  title: "Calendar | FitTrack",
  description: "Schedule and manage your training sessions",
}

export default function CalendarPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Calendar" text="Schedule and manage your training sessions." />
      <ScheduleCalendar />
    </DashboardShell>
  )
}
