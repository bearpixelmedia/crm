"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface Activity {
  id: string
  type: "client" | "project" | "task" | "comment"
  action: "created" | "updated" | "completed" | "deleted"
  subject: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  timestamp: Date
}

// Mock activity data - in a real implementation, this would come from your API
const mockActivities: Activity[] = [
  {
    id: "act1",
    type: "client",
    action: "created",
    subject: "Acme Corporation",
    user: {
      name: "John Doe",
      initials: "JD",
    },
    timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
  },
  {
    id: "act2",
    type: "project",
    action: "updated",
    subject: "Website Redesign",
    user: {
      name: "Jane Smith",
      initials: "JS",
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "act3",
    type: "task",
    action: "completed",
    subject: "Keyword Research",
    user: {
      name: "Mike Johnson",
      initials: "MJ",
    },
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: "act4",
    type: "comment",
    action: "created",
    subject: "SEO Strategy Discussion",
    user: {
      name: "Sarah Williams",
      initials: "SW",
    },
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "act5",
    type: "project",
    action: "created",
    subject: "Social Media Campaign",
    user: {
      name: "Alex Brown",
      initials: "AB",
    },
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
]

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // In a real implementation, this would fetch data from your API
    // For now, we'll just use the mock data
    setActivities(mockActivities)
  }, [])

  function getActivityIcon(type: string) {
    switch (type) {
      case "client":
        return "👤"
      case "project":
        return "📁"
      case "task":
        return "✅"
      case "comment":
        return "💬"
      default:
        return "📝"
    }
  }

  function getActionColor(action: string) {
    switch (action) {
      case "created":
        return "bg-green-100 text-green-800"
      case "updated":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-purple-100 text-purple-800"
      case "deleted":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across your CRM</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No recent activity</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.user.name}{" "}
                    <Badge variant="outline" className={getActionColor(activity.action)}>
                      {activity.action}
                    </Badge>{" "}
                    <span className="font-normal">
                      {getActivityIcon(activity.type)} {activity.subject}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
