import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ExerciseLibrary } from "@/components/exercise-library"

export const metadata = {
  title: "Exercise Library",
  description: "Browse and learn proper form for all exercises",
}

export default function ExercisesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Exercise Library"
        text="Browse and learn proper form for all exercises in our video library."
      />
      <div className="grid gap-8">
        <ExerciseLibrary />
      </div>
    </DashboardShell>
  )
}
