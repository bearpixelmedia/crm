import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MetricsChart } from "@/components/metrics-chart"
import { MetricsForm } from "@/components/metrics-form"

export const metadata: Metadata = {
  title: "Body Metrics | FitTrack",
  description: "Track your body measurements and progress",
}

export default function MetricsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Body Metrics" text="Track your body measurements and visualize your progress." />
      <div className="grid gap-8 md:grid-cols-2">
        <MetricsChart />
        <MetricsForm />
      </div>
    </DashboardShell>
  )
}
