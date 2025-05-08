import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MessagingInterface } from "@/components/messaging-interface"

export const metadata: Metadata = {
  title: "Messages | FitTrack",
  description: "Chat with your clients and team members",
}

export default function MessagesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Messages" text="Chat with your clients and team members." />
      <MessagingInterface />
    </DashboardShell>
  )
}
