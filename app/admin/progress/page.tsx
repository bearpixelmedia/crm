"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { implementationData } from "@/data/implementation-status"
import { SectionCard } from "@/components/progress/section-card"
import { FeatureCard } from "@/components/progress/feature-card"
import { ProgressSummary } from "@/components/progress/progress-summary"

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [overallProgress, setOverallProgress] = useState(0)
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({})
  const [totalFeatures, setTotalFeatures] = useState(0)
  const [completedFeatures, setCompletedFeatures] = useState(0)
  const [inProgressFeatures, setInProgressFeatures] = useState(0)

  useEffect(() => {
    // Calculate overall progress and feature counts
    let total = 0
    let completed = 0
    let inProgress = 0
    let totalCompletion = 0

    implementationData.sections.forEach((section) => {
      section.features.forEach((feature) => {
        total++
        totalCompletion += feature.completion

        if (feature.status === "completed") {
          completed++
        } else if (feature.status === "in-progress") {
          inProgress++
        }
      })
    })

    setTotalFeatures(total)
    setCompletedFeatures(completed)
    setInProgressFeatures(inProgress)
    setOverallProgress(Math.round(totalCompletion / total))

    // Calculate section progress
    const sectionStats: Record<string, number> = {}
    implementationData.sections.forEach((section) => {
      let sectionTotal = 0
      section.features.forEach((feature) => {
        sectionTotal += feature.completion
      })
      sectionStats[section.name] = Math.round(sectionTotal / section.features.length)
    })
    setSectionProgress(sectionStats)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Implementation Progress</h2>
        </div>

        <ProgressSummary
          overallProgress={overallProgress}
          totalFeatures={totalFeatures}
          completedFeatures={completedFeatures}
          inProgressFeatures={inProgressFeatures}
        />

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {implementationData.sections.map((section) => (
              <TabsTrigger key={section.name} value={section.name}>
                {section.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {implementationData.sections.map((section) => (
                <SectionCard
                  key={section.name}
                  section={section}
                  progress={sectionProgress[section.name]}
                  onClick={() => setActiveTab(section.name)}
                />
              ))}
            </div>
          </TabsContent>

          {implementationData.sections.map((section) => (
            <TabsContent key={section.name} value={section.name}>
              <div className="grid gap-4">
                {section.features.map((feature) => (
                  <FeatureCard key={feature.name} feature={feature} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
