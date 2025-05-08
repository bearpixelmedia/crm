"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { CalendarDays, CheckSquare, BarChart3, Users, FileText, SearchIcon } from "lucide-react"

export default function SEOPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">SEO Management</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Export</Button>
            <Button>Create Report</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/seo/schedule">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Schedule</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Client Scheduling</div>
                <p className="text-xs text-muted-foreground">Schedule client work and manage agent assignments</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/seo/tasks">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">SEO Tasks</div>
                <p className="text-xs text-muted-foreground">Manage and track SEO tasks across all projects</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/seo/agents">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Agents</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Agent Workload</div>
                <p className="text-xs text-muted-foreground">Monitor agent capacity and client allocation</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/seo/competitors">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Competitors</CardTitle>
                <SearchIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Competitor Analysis</div>
                <p className="text-xs text-muted-foreground">
                  Analyze competitor performance and identify opportunities
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/client-portal/seo-dashboard">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Client Portal</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Client Dashboard</div>
                <p className="text-xs text-muted-foreground">View the client-facing SEO performance dashboard</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="#">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reports</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">SEO Reports</div>
                <p className="text-xs text-muted-foreground">Generate and manage client SEO reports</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>SEO Workflow</CardTitle>
              <CardDescription>Standardized SEO process for all client projects</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <iframe src="/seo" className="h-[600px] w-full rounded-md border" />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest SEO tasks and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Technical SEO Audit completed for Acme Corporation
                    </p>
                    <p className="text-sm text-muted-foreground">John Smith • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Keyword research started for TechNova Solutions</p>
                    <p className="text-sm text-muted-foreground">Sarah Johnson • 4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Content plan approved for Global Enterprises</p>
                    <p className="text-sm text-muted-foreground">Michael Brown • Yesterday</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      On-page optimization completed for Bright Future Media
                    </p>
                    <p className="text-sm text-muted-foreground">Emma Davis • Yesterday</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Monthly report generated for Stellar Innovations</p>
                    <p className="text-sm text-muted-foreground">David Wilson • 2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
