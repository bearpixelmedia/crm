import { YouTubeExercise } from "@/components/youtube-exercise"

export default function YouTubeExercisesPage() {
  // Exercise data with YouTube video IDs from Howcast channel
  const exercises = [
    {
      name: "Squats",
      videoId: "aclHkVaku9U",
      description: "Learn how to do a proper squat with perfect form.",
    },
    {
      name: "Push-ups",
      videoId: "wxhNoKZlfY8",
      description: "Master the perfect push-up technique for chest, shoulders, and triceps.",
    },
    {
      name: "Dumbbell Rows",
      videoId: "roCP9wGwPss",
      description: "Learn how to perform dumbbell rows to strengthen your back muscles.",
    },
    {
      name: "Plank",
      videoId: "ASdvN_XEl_c",
      description: "Master the plank exercise to build core strength and stability.",
    },
    {
      name: "Deadlift",
      videoId: "1uDiW5--rAE",
      description: "Learn proper deadlift technique for building overall strength.",
    },
    {
      name: "Lunges",
      videoId: "wrwwXE_x-pQ",
      description: "Perfect your lunge form to strengthen legs and improve balance.",
    },
  ]

  return (
    <div className="container py-6">
      <h1 className="mb-6 text-2xl font-bold">Exercise Videos</h1>
      <p className="mb-6 text-muted-foreground">
        All videos from Howcast - a trusted source for exercise demonstrations with consistent quality and instruction.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <YouTubeExercise
            key={exercise.videoId}
            exerciseName={exercise.name}
            videoId={exercise.videoId}
            description={exercise.description}
          />
        ))}
      </div>
    </div>
  )
}
