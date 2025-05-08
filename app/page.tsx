"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would come from your actual tracking spreadsheet
const sections = [
  {
    name: "Dashboard / Overview",
    features: [
      { name: "Real-time KPI Cards", status: "in-progress", completion: 60 },
      { name: "Overview Charts", status: "not-started", completion: 0 },
      { name: "Recent Activity Feed", status: "completed", completion: 100 },
      { name: "Quick Actions", status: "in-progress", completion: 40 },
    ],
  },
  {
    name: "Clients Section",
    features: [
      { name: "Client List View", status: "completed", completion: 100 },
      { name: "Client Detail View", status: "in-progress", completion: 75 },
      { name: "Client Creation/Editing", status: "in-progress", completion: 50 },
      { name: "Client Analytics", status: "not-started", completion: 0 },
    ],
  },
  {
    name: "Projects Section",
    features: [
      { name: "Project List View", status: "completed", completion: 100 },
      { name: "Project Detail View", status: "in-progress", completion: 80 },
      { name: "Project Creation/Editing", status: "in-progress", completion: 30 },
      { name: "Task Management", status: "not-started", completion: 0 },
    ],
  },
  {
    name: "SEO Section",
    features: [
      { name: "SEO Dashboard", status: "in-progress", completion: 70 },
      { name: "SEO Workflow Management", status: "in-progress", completion: 60 },
      { name: "SEO Task Management", status: "completed", completion: 100 },
      { name: "Competitor Analysis", status: "completed", completion: 100 },
      { name: "SEO Reporting", status: "not-started", completion: 0 },
    ],
  },
  {
    name: "Google Sheets Integration",
    features: [
      { name: "Read Operations", status: "completed", completion: 100 },
      { name: "Write Operations", status: "not-started", completion: 0 },
      { name: "Data Synchronization", status: "not-started", completion: 0 },
      { name: "Error Handling", status: "in-progress", completion: 50 },
    ],
  },
]

export default function ProgressTracker() {
  const [activeTab, setActiveTab] = useState("overview")
  const [overallProgress, setOverallProgress] = useState(0)
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    // Calculate overall progress
    let totalFeatures = 0
    let totalCompletion = 0

    sections.forEach((section) => {
      section.features.forEach((feature) => {
        totalFeatures++
        totalCompletion += feature.completion
      })
    })

    setOverallProgress(Math.round(totalCompletion / totalFeatures))

    // Calculate section progress
    const sectionStats: Record<string, number> = {}
    sections.forEach((section) => {
      let sectionTotal = 0
      section.features.forEach((feature) => {
        sectionTotal += feature.completion
      })
      sectionStats[section.name] = Math.round(sectionTotal / section.features.length)
    })
    setSectionProgress(sectionStats)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">White Fox CRM Progress Tracker</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>Implementation progress across all features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Progress</span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {sections.map((section) => (
            <TabsTrigger key={section.name} value={section.name}>
              {section.name.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <Card key={section.name}>
                <CardHeader className="pb-2">
                  <CardTitle>{section.name}</CardTitle>
                  <CardDescription>
                    {section.features.filter((f) => f.status === "completed").length} of {section.features.length}{" "}
                    features completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Progress</span>
                      <span className="font-medium">{sectionProgress[section.name]}%</span>
                    </div>
                    <Progress value={sectionProgress[section.name]} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {sections.map((section) => (
          <TabsContent key={section.name} value={section.name}>
            <div className="grid gap-4">
              {section.features.map((feature) => (
                <Card key={feature.name}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                      <StatusBadge status={feature.status} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Completion</span>
                        <span className="font-medium">{feature.completion}%</span>
                      </div>
                      <Progress value={feature.completion} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  let bgColor = "bg-gray-100 text-gray-800"

  if (status === "completed") {
    bgColor = "bg-green-100 text-green-800"
  } else if (status === "in-progress") {
    bgColor = "bg-blue-100 text-blue-800"
  } else if (status === "not-started") {
    bgColor = "bg-gray-100 text-gray-800"
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
      {status === "in-progress" ? "In Progress" : status === "not-started" ? "Not Started" : "Completed"}
    </span>
  )
}
