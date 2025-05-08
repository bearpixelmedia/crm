import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Feature } from "@/data/implementation-status"
import { StatusBadge } from "./status-badge"

interface FeatureCardProps {
  feature: Feature
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card>
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
          {feature.notes && <p className="text-sm text-muted-foreground mt-2">{feature.notes}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
