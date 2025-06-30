import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { MainNav } from "@/components/main-nav"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { ClientStats } from "@/components/client-stats"
import { ProjectStats } from "@/components/project-stats"
import { MarketingStats } from "@/components/marketing-stats"
import { ProgressButton } from "@/components/progress/progress-button"
import { DashboardStats } from "@/components/dashboard-stats"

export const metadata: Metadata = {
  title: "White Fox Studios CRM",
  description: "Client Relationship Management for White Fox Studios",
}

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">White Fox Studios CRM</h1>
      <div className="space-y-4">
        <p className="text-lg text-gray-600">Welcome to your CRM dashboard.</p>
        <div className="space-y-2">
          <a 
            href="/projects" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Projects
          </a>
        </div>
      </div>
    </div>
  )
}
