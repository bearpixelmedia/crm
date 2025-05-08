import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { BusinessDashboard } from "@/components/business-dashboard"

export const metadata: Metadata = {
  title: "Business | FitTrack",
  description: "Grow and manage your fitness business",
}

export default function BusinessPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Business Dashboard"
        text="Track your business performance and find opportunities for growth."
      />
      <BusinessDashboard />
    </DashboardShell>
  )
}
