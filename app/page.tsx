import { ClientStats } from "@/components/client-stats"
import { DashboardStats } from "@/components/dashboard-stats"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { MainNav } from "@/components/main-nav"
import { MarketingStats } from "@/components/marketing-stats"
import { Overview } from "@/components/overview"
import { ProgressButton } from "@/components/progress/progress-button"
import { ProjectStats } from "@/components/project-stats"
import { RecentSales } from "@/components/recent-sales"
import { Search } from "@/components/search"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "White Fox Studios CRM",
  description: "Client Relationship Management for White Fox Studios",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <div className="flex-1 space-y-6">
            <DashboardStats />
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Overview />
              </TabsContent>
              <TabsContent value="clients">
                <ClientStats />
              </TabsContent>
              <TabsContent value="projects">
                <ProjectStats />
              </TabsContent>
              <TabsContent value="marketing">
                <MarketingStats />
              </TabsContent>
            </Tabs>
          </div>
          <div className="w-full md:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search</CardTitle>
                <CardDescription>Find clients, projects, or tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <Search />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Date Range</CardTitle>
                <CardDescription>Filter by date</CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarDateRangePicker />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>Latest invoices and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
            <ProgressButton />
          </div>
        </div>
      </div>
      <UserNav />
    </div>
  )
}
