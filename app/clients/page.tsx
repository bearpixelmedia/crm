import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ClientsList } from "@/components/clients-list"
import { ClientsCreateButton } from "@/components/clients-create-button"

export const metadata: Metadata = {
  title: "Profile | FitTrack",
  description: "Manage your personal fitness profile and settings",
}

export default function ProfilePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="My Profile" text="Manage your personal fitness profile and settings.">
        <ClientsCreateButton />
      </DashboardHeader>
      <ClientsList />
    </DashboardShell>
  )
}
