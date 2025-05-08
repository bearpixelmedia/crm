"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExerciseVideoProps {
  exerciseName: string
  fallbackImage?: string
  className?: string
}

// Exercise video mapping with YouTube IDs all from the "Howcast" channel
// Howcast is a reputable channel with consistent, clear exercise demonstrations
const exerciseVideos = {
  // Basic exercises
  "Warm-up": "HDfvWrGUkC8", // How to Warm Up Before a Workout
  Squats: "aclHkVaku9U", // How to Do a Proper Squat
  "Push-ups": "wxhNoKZlfY8", // How to Do a Push-Up with Perfect Form
  "Dumbbell Rows": "roCP9wGwPss", // How to Do a Dumbbell Row
  Plank: "ASdvN_XEl_c", // How to Do a Plank
  "Cool down": "tiTt71-wSZ0", // How to Cool Down after a Workout

  // Upper body exercises
  "Bench Press": "SrqOu55lrYU", // How to Do a Bench Press
  "Shoulder Press": "qEwKCR5JCog", // How to Do a Shoulder Press
  "Bicep Curls": "av7-8igSXTs", // How to Do Bicep Curls
  "Tricep Extensions": "YbX7Wd8jQ-Q", // How to Do Tricep Extensions
  "Pull-ups": "eGo4IYlbE5g", // How to Do Pull-Ups
  Dips: "wjUmnZH528Y", // How to Do Tricep Dips

  // Lower body exercises
  Deadlift: "1uDiW5--rAE", // How to Do a Deadlift
  Lunges: "wrwwXE_x-pQ", // How to Do Lunges
  "Leg Press": "CHPyvyZAM-g", // How to Use a Leg Press Machine
  "Calf Raises": "d2GgSoHvIXM", // How to Do Calf Raises
  "Leg Extensions": "YyvSfVjQeL0", // How to Do Leg Extensions
  "Leg Curls": "1Tq3QdYUuHs", // How to Do Leg Curls

  // Core exercises
  Crunches: "Xyd_fa5zoEU", // How to Do Crunches
  "Russian Twists": "wkD8rjkodUI", // How to Do Russian Twists
  "Mountain Climbers": "zT-9L3CEcmk", // How to Do Mountain Climbers
  "Leg Raises": "l4kQd9eWclE", // How to Do Leg Raises

  // Cardio exercises
  "Jumping Jacks": "UpH7rm0cYbM", // How to Do Jumping Jacks
  Burpees: "TU8QYVW0gDw", // How to Do Burpees
  "High Knees": "ZZZvU_gkVFw", // How to Do High Knees
  "Jumping Rope": "FJmRQ5iTXKE", // How to Jump Rope

  // Default video for any exercise not in the list
  default: "UBMk30rjy0o", // 20 Minute Full Body Workout
}

export function ExerciseVideo({ exerciseName, fallbackImage, className = "" }: ExerciseVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Get video ID from mapping or use default
  const videoId = exerciseVideos[exerciseName as keyof typeof exerciseVideos] || exerciseVideos.default

  // Generate a placeholder image if none provided
  const placeholderImage =
    fallbackImage || `/placeholder.svg?height=300&width=500&query=${encodeURIComponent(exerciseName + " exercise")}`

  return (
    <div className={`relative rounded-md overflow-hidden ${className}`}>
      {!isPlaying ? (
        <div className="relative">
          <img
            src={placeholderImage || "/placeholder.svg"}
            alt={`${exerciseName} demonstration`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={() => setIsPlaying(true)}
              variant="secondary"
              size="icon"
              className="rounded-full h-12 w-12 bg-primary/90 hover:bg-primary text-primary-foreground"
            >
              <Play className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {exerciseName} Demo
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={`${exerciseName} demonstration`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-48"
        ></iframe>
      )}
    </div>
  )
}
