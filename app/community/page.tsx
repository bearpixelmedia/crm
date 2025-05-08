import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CommunityHub } from "@/components/community-hub"

export const metadata: Metadata = {
  title: "Community | FitTrack",
  description: "Connect with other fitness professionals and share knowledge",
}

export default function CommunityPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Community Hub"
        text="Connect with other fitness professionals, share knowledge, and grow together."
      />
      <CommunityHub />
    </DashboardShell>
  )
}
