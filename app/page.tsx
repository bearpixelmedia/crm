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

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <ProgressButton />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <DashboardStats />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>Recent project revenue.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="clients" className="space-y-4">
            <ClientStats />
          </TabsContent>
          <TabsContent value="projects" className="space-y-4">
            <ProjectStats />
          </TabsContent>
          <TabsContent value="marketing" className="space-y-4">
            <MarketingStats />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
