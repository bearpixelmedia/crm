import { MinimalExercise } from "@/components/minimal-exercise"

export default function TestMinimalPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Minimal Exercise Component Test</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MinimalExercise
          name="Push-ups"
          description="A classic upper body exercise targeting chest, shoulders, and triceps."
        />

        <MinimalExercise
          name="Squats"
          description="A fundamental lower body exercise for building strength in legs and glutes."
        />

        <MinimalExercise name="Plank" description="An isometric core exercise that improves stability and posture." />
      </div>
    </div>
  )
}
