"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { useData } from "@/context/data-context"

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

const { clients, projects } = useData()

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities")
        if (response.ok) {
          const data = await response.json()
          setActivities(data)
        }
      } catch (error) {
        console.error("Error fetching activities:", error)
      }
    }
    fetchActivities()
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
