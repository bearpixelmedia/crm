import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { EducationalResources } from "@/components/educational-resources"

export const metadata: Metadata = {
  title: "Academy | FitTrack",
  description: "Educational resources to grow your fitness business",
}

export default function AcademyPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="FitTrack Academy"
        text="Level up your training business with expert-led educational resources."
      />
      <EducationalResources />
    </DashboardShell>
  )
}
