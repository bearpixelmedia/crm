"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Section } from "@/data/implementation-status"

interface SectionCardProps {
  section: Section
  progress: number
  onClick?: () => void
}

export function SectionCard({ section, progress, onClick }: SectionCardProps) {
  const completedFeatures = section.features.filter((f) => f.status === "completed").length

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <CardTitle>{section.name}</CardTitle>
        <CardDescription>
          {completedFeatures} of {section.features.length} features completed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
