"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { implementationData } from "@/data/implementation-status"
import { ProgressSummary } from "./progress-summary"
import { SectionCard } from "./section-card"
import { FeatureCard } from "./feature-card"

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sectionProgress
                .find((s) => s.name === activeSection)
                ?.features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} />
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

              <TabsContent value="overview" className="space-y-4">
                <ProgressSummary
                  overallProgress={overallProgress}
                  totalFeatures={totalFeatures}
                  completedFeatures={completedFeatures}
                  inProgressFeatures={inProgressFeatures}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sectionProgress.map((section, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100">
                        <span className="text-xl font-bold">{section.progress}%</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{section.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {section.features.filter((f) => f.status === "completed").length} of {section.features.length}{" "}
                          completed
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sections" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sectionProgress.map((section, index) => (
                    <SectionCard
                      key={index}
                      section={section}
                      progress={section.progress}
                      onClick={() => handleSectionClick(section.name)}
                    />
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
