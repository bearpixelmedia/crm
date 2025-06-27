"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useData } from "@/context/data-context"
import { Skeleton } from "@/components/ui/skeleton"

export function RecentSales() {
  const { projects, clients, isLoading } = useData()
  
  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="ml-4 space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="ml-auto h-4 w-16" />
          </div>
        ))}
      </div>
    )
  }
  
  // Get recent projects (last 5) and treat them as sales
  const recentProjects = projects
    .filter(project => project.name && project.name.includes('$')) // Only projects with monetary values
    .slice(0, 5)

  if (recentProjects.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center text-muted-foreground">
          No recent sales data available. Add projects with monetary values to see sales.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {recentProjects.map((project) => {
        const client = clients.find(c => c.id === project.clientId)
        const clientName = client?.name || project.status || 'Unknown Client'
        const email = client?.email || 'no-email@example.com'
        const amount = project.name.match(/\$[\d,]+\.?\d*/)?.[0] || '$0.00'
        
        // Generate initials from client name
        const initials = clientName
          .split(' ')
          .map(word => word.charAt(0))
          .join('')
          .substring(0, 2)
          .toUpperCase()

        return (
          <div key={project.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/diverse-group.png" alt="Avatar" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{clientName}</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            <div className="ml-auto font-medium">+{amount}</div>
          </div>
        )
      })}
    </div>
  )
}
