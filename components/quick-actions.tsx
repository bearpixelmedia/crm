"use client"

import { PlusCircle, Calendar, FileText, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push("/clients/new")}>New Client</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/projects/new")}>New Project</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/seo/tasks/new")}>New SEO Task</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/marketing/campaigns/new")}>New Campaign</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" className="w-full sm:w-auto" onClick={() => router.push("/schedule")}>
        <Calendar className="mr-2 h-4 w-4" />
        Schedule Meeting
      </Button>

      <Button variant="outline" className="w-full sm:w-auto" onClick={() => router.push("/reports/generate")}>
        <FileText className="mr-2 h-4 w-4" />
        Generate Report
      </Button>

      <Button variant="outline" className="w-full sm:w-auto" onClick={() => router.push("/dashboard/analytics")}>
        <BarChart3 className="mr-2 h-4 w-4" />
        View Analytics
      </Button>
    </div>
  )
}
