import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CaseStudies } from "@/components/case-studies"

export const metadata: Metadata = {
  title: "Case Studies | FitTrack",
  description: "Learn from successful fitness professionals using FitTrack",
}

export default function CaseStudiesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Case Studies"
        text="Learn how other fitness professionals are growing their businesses with FitTrack."
      />
      <CaseStudies />
    </DashboardShell>
  )
}
