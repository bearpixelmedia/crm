import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ProgramsList } from "@/components/programs-list"
import { ProgramsCreateButton } from "@/components/programs-create-button"

export const metadata: Metadata = {
  title: "Programs | FitTrack",
  description: "Create and manage your training programs",
}

export default function ProgramsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Programs" text="Create and manage your training programs.">
        <ProgramsCreateButton />
      </DashboardHeader>
      <ProgramsList />
    </DashboardShell>
  )
}
