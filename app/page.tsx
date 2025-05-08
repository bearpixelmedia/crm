import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Overview } from "@/components/overview"
import { RecentWorkouts } from "@/components/recent-workouts"
import { RecentMetrics } from "@/components/recent-metrics"
import { MealPlan } from "@/components/meal-plan"
import { ClientOverview } from "@/components/client-overview"
import { UpcomingSessions } from "@/components/upcoming-sessions"

export const metadata: Metadata = {
  title: "Dashboard | FitTrack",
  description: "Track your fitness journey with FitTrack",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome back! Here's an overview of your fitness journey." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Overview />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <ClientOverview className="col-span-3" />
        <UpcomingSessions className="col-span-4" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <RecentWorkouts className="col-span-4" />
        <RecentMetrics className="col-span-3" />
      </div>
      <div className="mt-4">
        <MealPlan />
      </div>
    </DashboardShell>
  )
}
