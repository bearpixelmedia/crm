import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressSummaryProps {
  overallProgress: number
  totalFeatures: number
  completedFeatures: number
  inProgressFeatures: number
}

export function ProgressSummary({
  overallProgress,
  totalFeatures,
  completedFeatures,
  inProgressFeatures,
}: ProgressSummaryProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Overall Progress</CardTitle>
        <CardDescription>Implementation progress across all features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Progress</span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalFeatures}</div>
              <div className="text-xs text-muted-foreground">Total Features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedFeatures}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{inProgressFeatures}</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
