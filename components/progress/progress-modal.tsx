"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { implementationData } from "@/data/implementation-status"

interface ProgressModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProgressModal({ open, onOpenChange }: ProgressModalProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Calculate overall progress
  const allFeatures = implementationData.sections.flatMap((s) => s.features)
  const totalFeatures = allFeatures.length
  const completedFeatures = allFeatures.filter((f) => f.status === "completed").length
  const inProgressFeatures = allFeatures.filter((f) => f.status === "in-progress").length
  const overallProgress = Math.round(allFeatures.reduce((acc, feature) => acc + feature.completion, 0) / totalFeatures)

  // Calculate section progress
  const sectionProgress = implementationData.sections.map((section) => {
    const progress = Math.round(
      section.features.reduce((acc, feature) => acc + feature.completion, 0) / section.features.length,
    )
    return { ...section, progress }
  })

  const handleSectionClick = (sectionName: string) => {
    setActiveSection(sectionName)
  }

  const handleBackClick = () => {
    setActiveSection(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Implementation Progress</DialogTitle>
        </DialogHeader>

        {activeSection ? (
          <div>
            <button
              onClick={handleBackClick}
              className="mb-4 text-sm flex items-center text-muted-foreground hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Overview
            </button>

            <h2 className="text-xl font-semibold mb-4">{activeSection}</h2>

            <div className="grid grid-cols-1 gap-4">
              {sectionProgress
                .find((s) => s.name === activeSection)
                ?.features.map((feature, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{feature.name}</h3>
                      <StatusBadge status={feature.status} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Completion</span>
                        <span className="text-sm font-medium">{feature.completion}%</span>
                      </div>
                      <Progress value={feature.completion} className="h-2" />
                    </div>
                    {feature.notes && <p className="mt-2 text-sm text-muted-foreground">{feature.notes}</p>}
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sections">By Section</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Overall Progress</span>
                    <span className="font-medium">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>
                      {completedFeatures} of {totalFeatures} features completed
                    </span>
                    <span>{inProgressFeatures} in progress</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {sectionProgress.map((section, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{section.name}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium">{section.progress}%</span>
                        </div>
                        <Progress value={section.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {section.features.filter((f) => f.status === "completed").length} of {section.features.length}{" "}
                          features completed
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sections" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sectionProgress.map((section, index) => (
                    <button
                      key={index}
                      className="border rounded-lg p-4 text-left hover:border-primary transition-colors"
                      onClick={() => handleSectionClick(section.name)}
                    >
                      <h3 className="font-medium mb-2">{section.name}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium">{section.progress}%</span>
                        </div>
                        <Progress value={section.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {section.features.filter((f) => f.status === "completed").length} of {section.features.length}{" "}
                          features completed
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
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
