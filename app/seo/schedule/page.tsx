"use client"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { SEOCalendarScheduler } from "@/components/seo-calendar-scheduler"

export default function SEOSchedulePage() {
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
          <h2 className="text-3xl font-bold tracking-tight">SEO Schedule</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Export Calendar</Button>
            <Button>Print Schedule</Button>
          </div>
        </div>
        <SEOCalendarScheduler />
      </div>
    </div>
  )
}
