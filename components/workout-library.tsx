"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Dumbbell, Filter, Search, Star, Users } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WorkoutLibraryProps {
  onSelectWorkout?: (id: string) => void
}

export function WorkoutLibrary({ onSelectWorkout }: WorkoutLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const workoutCategories = [
    { id: "all", name: "All Workouts" },
    { id: "strength", name: "Strength" },
    { id: "hypertrophy", name: "Hypertrophy" },
    { id: "endurance", name: "Endurance" },
    { id: "fullbody", name: "Full Body" },
    { id: "split", name: "Split Routines" },
    { id: "beginner", name: "Beginner" },
  ]

  const workouts = [
    {
      id: "1",
      name: "5x5 Strength Program",
      description: "Classic strength building program focusing on compound movements with 5 sets of 5 reps.",
      category: "strength",
      level: "Intermediate",
      duration: "45-60 min",
      frequency: "3x per week",
      rating: 4.8,
      users: 1245,
      image: "/focused-barbell-workout.png",
      featured: true,
      exercises: [
        { name: "Barbell Squat", sets: 5, reps: 5 },
        { name: "Bench Press", sets: 5, reps: 5 },
        { name: "Barbell Row", sets: 5, reps: 5 },
        { name: "Overhead Press", sets: 5, reps: 5 },
        { name: "Deadlift", sets: 5, reps: 5 },
      ],
    },
    {
      id: "2",
      name: "Push Pull Legs Split",
      description:
        "6-day split targeting push muscles, pull muscles, and legs on separate days for maximum hypertrophy.",
      category: "hypertrophy",
      level: "Intermediate",
      duration: "60-75 min",
      frequency: "6x per week",
      rating: 4.9,
      users: 2340,
      image: "/diverse-gym-push-pull-legs.png",
      featured: true,
      exercises: [
        { name: "Bench Press", sets: 4, reps: "8-12" },
        { name: "Incline Dumbbell Press", sets: 3, reps: "10-12" },
        { name: "Lateral Raises", sets: 3, reps: "12-15" },
        { name: "Tricep Pushdowns", sets: 3, reps: "12-15" },
        { name: "Overhead Tricep Extension", sets: 3, reps: "12-15" },
      ],
    },
    {
      id: "3",
      name: "Full Body 3-Day Split",
      description:
        "Efficient full body workout three times per week, perfect for beginners or those with limited time.",
      category: "fullbody",
      level: "Beginner",
      duration: "45-60 min",
      frequency: "3x per week",
      rating: 4.7,
      users: 3150,
      image: "/diverse-full-body-workout.png",
      featured: true,
      exercises: [
        { name: "Goblet Squat", sets: 3, reps: "10-12" },
        { name: "Dumbbell Bench Press", sets: 3, reps: "10-12" },
        { name: "Lat Pulldown", sets: 3, reps: "10-12" },
        { name: "Dumbbell Shoulder Press", sets: 3, reps: "10-12" },
        { name: "Romanian Deadlift", sets: 3, reps: "10-12" },
      ],
    },
    {
      id: "4",
      name: "Upper/Lower 4-Day Split",
      description:
        "Balanced approach dividing workouts into upper and lower body days for optimal recovery and growth.",
      category: "split",
      level: "Intermediate",
      duration: "60 min",
      frequency: "4x per week",
      rating: 4.6,
      users: 1876,
      image: "/upper-lower-split.png",
      featured: false,
      exercises: [
        { name: "Barbell Bench Press", sets: 4, reps: "6-10" },
        { name: "Pull-ups", sets: 4, reps: "8-12" },
        { name: "Seated Dumbbell Press", sets: 3, reps: "8-12" },
        { name: "Face Pulls", sets: 3, reps: "12-15" },
        { name: "Bicep Curls", sets: 3, reps: "10-12" },
      ],
    },
    {
      id: "5",
      name: "Beginner Full Body Routine",
      description: "Perfect introduction to resistance training with focus on form and building a foundation.",
      category: "beginner",
      level: "Beginner",
      duration: "30-45 min",
      frequency: "3x per week",
      rating: 4.9,
      users: 4230,
      image: "/beginner-workout-guide.png",
      featured: true,
      exercises: [
        { name: "Bodyweight Squat", sets: 3, reps: "12-15" },
        { name: "Push-ups", sets: 3, reps: "8-12" },
        { name: "Dumbbell Row", sets: 3, reps: "10-12" },
        { name: "Dumbbell Shoulder Press", sets: 3, reps: "10-12" },
        { name: "Plank", sets: 3, reps: "30-60 sec" },
      ],
    },
    {
      id: "6",
      name: "HIIT Strength Circuit",
      description:
        "High-intensity interval training combined with strength exercises for fat loss and muscle endurance.",
      category: "endurance",
      level: "Advanced",
      duration: "30 min",
      frequency: "2-3x per week",
      rating: 4.5,
      users: 1560,
      image: "/diverse-hiit-strength.png",
      featured: false,
      exercises: [
        { name: "Kettlebell Swings", sets: 3, reps: "20 sec work/10 sec rest" },
        { name: "Push-ups", sets: 3, reps: "20 sec work/10 sec rest" },
        { name: "Goblet Squats", sets: 3, reps: "20 sec work/10 sec rest" },
        { name: "Mountain Climbers", sets: 3, reps: "20 sec work/10 sec rest" },
        { name: "Dumbbell Rows", sets: 3, reps: "20 sec work/10 sec rest" },
      ],
    },
    {
      id: "7",
      name: "Bodyweight Strength Routine",
      description: "No equipment needed for this effective strength-building routine you can do anywhere.",
      category: "strength",
      level: "Beginner",
      duration: "30-45 min",
      frequency: "3x per week",
      rating: 4.6,
      users: 2870,
      image: "/diverse-bodyweight-training.png",
      featured: false,
      exercises: [
        { name: "Push-ups", sets: 3, reps: "10-15" },
        { name: "Bodyweight Squats", sets: 3, reps: "15-20" },
        { name: "Pull-ups/Inverted Rows", sets: 3, reps: "8-12" },
        { name: "Pike Push-ups", sets: 3, reps: "10-15" },
        { name: "Lunges", sets: 3, reps: "10-12 per leg" },
      ],
    },
    {
      id: "8",
      name: "Hypertrophy Focus: Chest & Back",
      description: "Targeted volume for maximum chest and back muscle growth with proven hypertrophy techniques.",
      category: "hypertrophy",
      level: "Intermediate",
      duration: "60-75 min",
      frequency: "1-2x per week",
      rating: 4.7,
      users: 1980,
      image: "/focused-chest-back-workout.png",
      featured: false,
      exercises: [
        { name: "Incline Bench Press", sets: 4, reps: "8-10" },
        { name: "Flat Dumbbell Press", sets: 4, reps: "10-12" },
        { name: "Cable Flyes", sets: 3, reps: "12-15" },
        { name: "Pull-ups", sets: 4, reps: "8-10" },
        { name: "Seated Cable Row", sets: 4, reps: "10-12" },
      ],
    },
    {
      id: "9",
      name: "Strength & Power: Lower Body",
      description: "Build serious leg strength and explosive power with this focused lower body routine.",
      category: "strength",
      level: "Advanced",
      duration: "60-75 min",
      frequency: "1-2x per week",
      rating: 4.8,
      users: 1450,
      image: "/diverse-leg-day.png",
      featured: false,
      exercises: [
        { name: "Back Squat", sets: 5, reps: "5-8" },
        { name: "Romanian Deadlift", sets: 4, reps: "6-8" },
        { name: "Walking Lunges", sets: 3, reps: "10-12 per leg" },
        { name: "Leg Press", sets: 3, reps: "10-12" },
        { name: "Calf Raises", sets: 4, reps: "15-20" },
      ],
    },
    {
      id: "10",
      name: "Functional Fitness Circuit",
      description: "Improve everyday movement patterns and build practical strength with functional exercises.",
      category: "endurance",
      level: "Intermediate",
      duration: "45-60 min",
      frequency: "2-3x per week",
      rating: 4.5,
      users: 1240,
      image: "/diverse-functional-training.png",
      featured: false,
      exercises: [
        { name: "Kettlebell Swings", sets: 3, reps: "15-20" },
        { name: "Medicine Ball Slams", sets: 3, reps: "12-15" },
        { name: "TRX Rows", sets: 3, reps: "12-15" },
        { name: "Farmer's Carries", sets: 3, reps: "40-50 steps" },
        { name: "Battle Ropes", sets: 3, reps: "30 sec" },
      ],
    },
    {
      id: "11",
      name: "Dumbbell-Only Full Body",
      description: "Complete full body workout using only dumbbells, perfect for home gym or limited equipment.",
      category: "fullbody",
      level: "Beginner",
      duration: "45-60 min",
      frequency: "3x per week",
      rating: 4.8,
      users: 3560,
      image: "/diverse-dumbbell-routine.png",
      featured: true,
      exercises: [
        { name: "Dumbbell Goblet Squat", sets: 3, reps: "10-12" },
        { name: "Dumbbell Bench Press", sets: 3, reps: "10-12" },
        { name: "Dumbbell Row", sets: 3, reps: "10-12" },
        { name: "Dumbbell Shoulder Press", sets: 3, reps: "10-12" },
        { name: "Dumbbell Romanian Deadlift", sets: 3, reps: "10-12" },
      ],
    },
    {
      id: "12",
      name: "Bodybuilding: Arms Focus",
      description: "Sculpt impressive biceps and triceps with this targeted arm hypertrophy workout.",
      category: "hypertrophy",
      level: "Intermediate",
      duration: "45-60 min",
      frequency: "1-2x per week",
      rating: 4.6,
      users: 2150,
      image: "/diverse-arm-strength.png",
      featured: false,
      exercises: [
        { name: "Barbell Curl", sets: 4, reps: "8-10" },
        { name: "Skull Crushers", sets: 4, reps: "8-10" },
        { name: "Hammer Curls", sets: 3, reps: "10-12" },
        { name: "Tricep Pushdowns", sets: 3, reps: "10-12" },
        { name: "Concentration Curls", sets: 3, reps: "12-15" },
      ],
    },
  ]

  const filteredWorkouts = workouts.filter(
    (workout) =>
      workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workouts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-2" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
        {showFilters && (
          <div className="mt-4 p-4 border rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="difficulty-filter">Difficulty</Label>
                <Select>
                  <SelectTrigger id="difficulty-filter">
                    <SelectValue placeholder="Any difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any difficulty</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration-filter">Duration</Label>
                <Select>
                  <SelectTrigger id="duration-filter">
                    <SelectValue placeholder="Any duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any duration</SelectItem>
                    <SelectItem value="short">Under 30 min</SelectItem>
                    <SelectItem value="medium">30-60 min</SelectItem>
                    <SelectItem value="long">Over 60 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="equipment-filter">Equipment</Label>
                <Select>
                  <SelectTrigger id="equipment-filter">
                    <SelectValue placeholder="Any equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any equipment</SelectItem>
                    <SelectItem value="none">No equipment</SelectItem>
                    <SelectItem value="minimal">Minimal equipment</SelectItem>
                    <SelectItem value="full">Full gym</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" size="sm" className="mr-2" onClick={() => setShowFilters(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  // In a real app, this would apply the filters
                  alert("Filters applied!")
                  setShowFilters(false)
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="all">
        <TabsList className="w-full h-auto flex flex-wrap justify-start mb-6 bg-transparent gap-2">
          {workoutCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {workoutCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredWorkouts
                .filter((workout) => category.id === "all" || workout.category === category.id)
                .map((workout) => (
                  <Card key={workout.id} className="overflow-hidden flex flex-col">
                    <div
                      className="aspect-video w-full overflow-hidden relative cursor-pointer"
                      onClick={() => onSelectWorkout?.(workout.id)}
                    >
                      <img
                        src={workout.image || "/placeholder.svg"}
                        alt={workout.name}
                        className="object-cover w-full h-full"
                      />
                      {workout.featured && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle
                          className="text-xl cursor-pointer hover:text-primary"
                          onClick={() => onSelectWorkout?.(workout.id)}
                        >
                          {workout.name}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className={
                            workout.level === "Beginner"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : workout.level === "Intermediate"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          }
                        >
                          {workout.level}
                        </Badge>
                      </div>
                      <CardDescription>{workout.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {workout.duration}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Dumbbell className="h-3 w-3" />
                          {workout.frequency}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{workout.users} users</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span>{workout.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" onClick={() => onSelectWorkout?.(workout.id)}>
                        View Workout
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
