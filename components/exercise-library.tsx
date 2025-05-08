"use client"

import { useState } from "react"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ExerciseVideo } from "./exercise-video"

interface Exercise {
  id: string
  name: string
  category: string
  equipment: string
  difficulty: "beginner" | "intermediate" | "advanced"
  primaryMuscles: string[]
  secondaryMuscles: string[]
  instructions: string[]
  tips: string[]
  image?: string
}

// Sample exercise data
const exercisesData: Exercise[] = [
  {
    id: "ex1",
    name: "Squats",
    category: "Strength",
    equipment: "Bodyweight",
    difficulty: "beginner",
    primaryMuscles: ["Quadriceps", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Calves", "Core"],
    instructions: [
      "Stand with feet shoulder-width apart",
      "Keep your chest up and back straight",
      "Lower your body as if sitting in a chair",
      "Keep knees in line with toes, not extending past them",
      "Push through heels to return to standing position",
    ],
    tips: [
      "Keep your weight in your heels",
      "Maintain a neutral spine throughout the movement",
      "Engage your core for stability",
    ],
  },
  {
    id: "ex2",
    name: "Push-ups",
    category: "Strength",
    equipment: "Bodyweight",
    difficulty: "intermediate",
    primaryMuscles: ["Chest", "Triceps"],
    secondaryMuscles: ["Shoulders", "Core"],
    instructions: [
      "Start in a plank position with hands slightly wider than shoulders",
      "Keep your body in a straight line from head to heels",
      "Lower your chest toward the floor by bending elbows",
      "Push back up to starting position",
      "Keep core engaged throughout the movement",
    ],
    tips: [
      "Keep your elbows at a 45-degree angle to your body",
      "Look slightly ahead of you, not straight down",
      "For easier variation, perform on knees instead of toes",
    ],
  },
  {
    id: "ex3",
    name: "Plank",
    category: "Core",
    equipment: "Bodyweight",
    difficulty: "beginner",
    primaryMuscles: ["Core", "Abdominals"],
    secondaryMuscles: ["Shoulders", "Back", "Glutes"],
    instructions: [
      "Start in a forearm plank position, elbows under shoulders",
      "Keep your body in a straight line from head to heels",
      "Engage your core and glutes",
      "Don't let your hips sag or pike up",
      "Hold the position while breathing normally",
    ],
    tips: [
      "Think about pulling your belly button toward your spine",
      "Don't hold your breath - breathe normally",
      "Start with shorter holds and gradually increase duration",
    ],
  },
  {
    id: "ex4",
    name: "Dumbbell Rows",
    category: "Strength",
    equipment: "Dumbbells",
    difficulty: "intermediate",
    primaryMuscles: ["Back", "Lats"],
    secondaryMuscles: ["Biceps", "Shoulders"],
    instructions: [
      "Place one knee and hand on a bench for support",
      "Hold a dumbbell in the other hand, arm fully extended",
      "Pull the dumbbell up toward your hip, keeping elbow close to body",
      "Lower the weight with control",
      "Complete all reps on one side before switching",
    ],
    tips: [
      "Keep your back flat and core engaged",
      "Focus on squeezing your shoulder blade at the top",
      "Avoid rotating your torso during the movement",
    ],
  },
  {
    id: "ex5",
    name: "Lunges",
    category: "Strength",
    equipment: "Bodyweight",
    difficulty: "beginner",
    primaryMuscles: ["Quadriceps", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Calves", "Core"],
    instructions: [
      "Stand with feet hip-width apart",
      "Step forward with one leg and lower your body",
      "Both knees should form 90-degree angles at the bottom",
      "Push through the front heel to return to starting position",
      "Repeat on the other side",
    ],
    tips: [
      "Keep your upper body straight and shoulders back",
      "Make sure your front knee stays above your ankle",
      "Engage your core for balance and stability",
    ],
  },
  {
    id: "ex6",
    name: "Bench Press",
    category: "Strength",
    equipment: "Barbell, Bench",
    difficulty: "intermediate",
    primaryMuscles: ["Chest", "Triceps"],
    secondaryMuscles: ["Shoulders", "Core"],
    instructions: [
      "Lie on a bench with feet flat on the floor",
      "Grip the barbell slightly wider than shoulder-width",
      "Lower the bar to your mid-chest with control",
      "Press the bar back up to starting position",
      "Keep wrists straight and elbows at about 45 degrees",
    ],
    tips: [
      "Keep your shoulder blades pinched together",
      "Maintain a slight arch in your lower back",
      "Always use a spotter for heavy lifts",
    ],
  },
  {
    id: "ex7",
    name: "Deadlift",
    category: "Strength",
    equipment: "Barbell",
    difficulty: "advanced",
    primaryMuscles: ["Hamstrings", "Glutes", "Lower Back"],
    secondaryMuscles: ["Quadriceps", "Core", "Traps"],
    instructions: [
      "Stand with feet hip-width apart, barbell over mid-foot",
      "Bend at hips and knees to grip the bar shoulder-width apart",
      "Keep back flat, chest up, and shoulders over the bar",
      "Lift the bar by extending hips and knees",
      "Return the weight to the floor with control",
    ],
    tips: [
      "Keep the bar close to your body throughout the movement",
      "Drive through your heels, not your toes",
      "Engage your lats to protect your lower back",
    ],
  },
  {
    id: "ex8",
    name: "Shoulder Press",
    category: "Strength",
    equipment: "Dumbbells",
    difficulty: "intermediate",
    primaryMuscles: ["Shoulders"],
    secondaryMuscles: ["Triceps", "Upper Chest", "Core"],
    instructions: [
      "Sit or stand with dumbbells at shoulder height",
      "Palms facing forward, elbows at 90 degrees",
      "Press weights overhead until arms are extended",
      "Lower weights back to shoulder height with control",
      "Keep core engaged throughout the movement",
    ],
    tips: [
      "Avoid arching your lower back",
      "Don't lock out your elbows at the top",
      "Start with lighter weights to master form",
    ],
  },
  {
    id: "ex9",
    name: "Mountain Climbers",
    category: "Cardio",
    equipment: "Bodyweight",
    difficulty: "intermediate",
    primaryMuscles: ["Core", "Shoulders"],
    secondaryMuscles: ["Chest", "Quads", "Hip Flexors"],
    instructions: [
      "Start in a high plank position, hands under shoulders",
      "Bring one knee toward your chest, then quickly switch legs",
      "Continue alternating legs in a running motion",
      "Keep your hips down and core engaged",
      "Maintain a steady pace throughout",
    ],
    tips: [
      "Focus on form over speed, especially when beginning",
      "Keep your shoulders over your wrists",
      "Breathe rhythmically with the movement",
    ],
  },
  {
    id: "ex10",
    name: "Jumping Jacks",
    category: "Cardio",
    equipment: "Bodyweight",
    difficulty: "beginner",
    primaryMuscles: ["Full Body"],
    secondaryMuscles: ["Shoulders", "Calves"],
    instructions: [
      "Stand with feet together and arms at sides",
      "Jump while spreading legs and raising arms overhead",
      "Jump again to return to starting position",
      "Repeat at a steady pace",
      "Keep movements controlled but dynamic",
    ],
    tips: [
      "Land softly by bending your knees slightly",
      "Maintain good posture throughout",
      "Adjust intensity by changing speed",
    ],
  },
]

export function ExerciseLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Filter exercises based on search term and category
  const filteredExercises = exercisesData.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || exercise.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  // Sort exercises by name
  const sortedExercises = [...filteredExercises].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name)
    } else {
      return b.name.localeCompare(a.name)
    }
  })

  // Get unique categories for filter tabs
  const categories = ["all", ...Array.from(new Set(exercisesData.map((exercise) => exercise.category.toLowerCase())))]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search exercises..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          title={sortOrder === "asc" ? "Sort Z-A" : "Sort A-Z"}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" title="Filter options">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="w-full h-auto flex flex-wrap justify-start">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={selectedCategory} className="mt-4">
          {sortedExercises.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedExercises.map((exercise) => (
                <Card key={exercise.id} className="overflow-hidden">
                  <ExerciseVideo exerciseName={exercise.name} className="w-full" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{exercise.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                        {exercise.category}
                      </span>
                      <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                        {exercise.difficulty}
                      </span>
                      <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                        {exercise.equipment}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Targets: {exercise.primaryMuscles.join(", ")}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No exercises found. Try adjusting your search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Exercise Detail Dialog */}
      <Dialog open={!!selectedExercise} onOpenChange={(open) => !open && setSelectedExercise(null)}>
        {selectedExercise && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedExercise.name}</DialogTitle>
              <DialogDescription>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                    {selectedExercise.category}
                  </span>
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                    {selectedExercise.difficulty}
                  </span>
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                    {selectedExercise.equipment}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <ExerciseVideo exerciseName={selectedExercise.name} className="w-full" />

              <div>
                <h4 className="font-medium mb-1">Target Muscles</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedExercise.primaryMuscles.map((muscle) => (
                    <span key={muscle} className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                      {muscle}
                    </span>
                  ))}
                  {selectedExercise.secondaryMuscles.map((muscle) => (
                    <span key={muscle} className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">Instructions</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  {selectedExercise.instructions.map((instruction, index) => (
                    <li key={index} className="text-sm">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="font-medium mb-1">Tips</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedExercise.tips.map((tip, index) => (
                    <li key={index} className="text-sm">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Button variant="outline" onClick={() => setSelectedExercise(null)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
