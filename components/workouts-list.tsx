"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Play, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import * as buttonActions from "@/lib/button-actions"

interface WorkoutsListProps {
  onSelectWorkout?: (id: string) => void
}

export function WorkoutsList({ onSelectWorkout }: WorkoutsListProps) {
  const [workouts, setWorkouts] = useState([
    {
      id: "1",
      name: "Upper Body Strength",
      type: "Strength",
      duration: "45 min",
      difficulty: "Intermediate",
      lastPerformed: "2023-04-23",
    },
    {
      id: "2",
      name: "HIIT Cardio",
      type: "Cardio",
      duration: "30 min",
      difficulty: "Advanced",
      lastPerformed: "2023-04-21",
    },
    {
      id: "3",
      name: "Leg Day",
      type: "Strength",
      duration: "60 min",
      difficulty: "Intermediate",
      lastPerformed: "2023-04-19",
    },
    {
      id: "4",
      name: "Core Workout",
      type: "Strength",
      duration: "25 min",
      difficulty: "Beginner",
      lastPerformed: "2023-04-17",
    },
    {
      id: "5",
      name: "Yoga Flow",
      type: "Flexibility",
      duration: "45 min",
      difficulty: "Beginner",
      lastPerformed: "2023-04-15",
    },
    {
      id: "6",
      name: "Full Body Circuit",
      type: "Circuit",
      duration: "50 min",
      difficulty: "Advanced",
      lastPerformed: "2023-04-10",
    },
  ])

  // State for delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [workoutToDelete, setWorkoutToDelete] = useState<string | null>(null)

  // State for edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [workoutToEdit, setWorkoutToEdit] = useState<any>(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    type: "",
    duration: "",
    difficulty: "",
  })

  // State for start workout dialog
  const [startWorkoutDialogOpen, setStartWorkoutDialogOpen] = useState(false)
  const [workoutToStart, setWorkoutToStart] = useState<any>(null)
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0)
  const [workoutInProgress, setWorkoutInProgress] = useState(false)
  const [currentSet, setCurrentSet] = useState(1)
  const [completedExercises, setCompletedExercises] = useState<string[]>([])

  // Mock exercises for the workout
  const mockExercises = [
    { id: "ex1", name: "Bench Press", sets: 3, reps: "8-10", rest: "90 sec" },
    { id: "ex2", name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60 sec" },
    { id: "ex3", name: "Cable Flyes", sets: 3, reps: "12-15", rest: "60 sec" },
    { id: "ex4", name: "Tricep Pushdowns", sets: 3, reps: "12-15", rest: "60 sec" },
    { id: "ex5", name: "Overhead Tricep Extension", sets: 3, reps: "10-12", rest: "60 sec" },
  ]

  // Handle view details
  const handleViewDetails = (id: string) => {
    if (onSelectWorkout) {
      buttonActions.handleViewDetails(`Workout ${id}`)
      onSelectWorkout(id)
    } else {
      toast({
        title: "View Details",
        description: "Viewing details for workout " + id,
      })
    }
  }

  // Handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setWorkoutToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (workoutToDelete) {
      const workoutName = workouts.find((w) => w.id === workoutToDelete)?.name || "Workout"
      buttonActions.handleDelete(workoutName)
      setWorkouts(workouts.filter((workout) => workout.id !== workoutToDelete))
      setDeleteDialogOpen(false)
      setWorkoutToDelete(null)
    }
  }

  // Handle edit
  const handleEditClick = (workout: any) => {
    setWorkoutToEdit(workout)
    setEditFormData({
      name: workout.name,
      type: workout.type,
      duration: workout.duration,
      difficulty: workout.difficulty,
    })
    setEditDialogOpen(true)
  }

  const handleEditChange = (field: string, value: string) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (workoutToEdit) {
      buttonActions.handleEdit(workoutToEdit.name)
      setWorkouts(
        workouts.map((workout) => (workout.id === workoutToEdit.id ? { ...workout, ...editFormData } : workout)),
      )
      setEditDialogOpen(false)
      setWorkoutToEdit(null)
    }
  }

  // Handle start workout
  const handleStartWorkout = (workout: any) => {
    buttonActions.handleStart(workout.name)
    setWorkoutToStart(workout)
    setStartWorkoutDialogOpen(true)
    setActiveExerciseIndex(0)
    setCurrentSet(1)
    setCompletedExercises([])
    setWorkoutInProgress(false)
  }

  const startWorkout = () => {
    buttonActions.handleStart(workoutToStart?.name || "Workout")
    setWorkoutInProgress(true)
  }

  const completeSet = () => {
    const currentExercise = mockExercises[activeExerciseIndex]
    buttonActions.handleComplete(`Set ${currentSet} of ${currentExercise.name}`)

    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1)
    } else {
      // Move to next exercise
      if (activeExerciseIndex < mockExercises.length - 1) {
        setCompletedExercises([...completedExercises, currentExercise.id])
        setActiveExerciseIndex(activeExerciseIndex + 1)
        setCurrentSet(1)
      } else {
        // Workout complete
        completeWorkout()
      }
    }
  }

  const completeWorkout = () => {
    buttonActions.handleComplete(workoutToStart?.name || "Workout")

    // Update the last performed date
    if (workoutToStart) {
      const today = new Date().toISOString().split("T")[0]
      setWorkouts(
        workouts.map((workout) => (workout.id === workoutToStart.id ? { ...workout, lastPerformed: today } : workout)),
      )
    }

    setStartWorkoutDialogOpen(false)
    setWorkoutToStart(null)
    setWorkoutInProgress(false)
  }

  return (
    <>
      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Last Performed</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workouts.map((workout) => (
                <TableRow key={workout.id}>
                  <TableCell
                    className="font-medium cursor-pointer hover:text-primary"
                    onClick={() => handleViewDetails(workout.id)}
                  >
                    {workout.name}
                  </TableCell>
                  <TableCell>{workout.type}</TableCell>
                  <TableCell>{workout.duration}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        workout.difficulty === "Beginner"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : workout.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                      }
                    >
                      {workout.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{workout.lastPerformed}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleStartWorkout(workout)}
                        title="Start workout"
                      >
                        <Play className="h-4 w-4" />
                        <span className="sr-only">Start workout</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditClick(workout)}
                        title="Edit workout"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit workout</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteClick(workout.id)}
                        title="Delete workout"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete workout</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the workout from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Workout Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Workout</DialogTitle>
              <DialogDescription>Make changes to your workout details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editFormData.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select value={editFormData.type} onValueChange={(value) => handleEditChange("type", value)} required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Strength">Strength</SelectItem>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Hypertrophy">Hypertrophy</SelectItem>
                    <SelectItem value="Endurance">Endurance</SelectItem>
                    <SelectItem value="Flexibility">Flexibility</SelectItem>
                    <SelectItem value="Circuit">Circuit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-duration" className="text-right">
                  Duration
                </Label>
                <Input
                  id="edit-duration"
                  value={editFormData.duration}
                  onChange={(e) => handleEditChange("duration", e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-difficulty" className="text-right">
                  Difficulty
                </Label>
                <Select
                  value={editFormData.difficulty}
                  onValueChange={(value) => handleEditChange("difficulty", value)}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Start Workout Dialog */}
      <Dialog open={startWorkoutDialogOpen} onOpenChange={setStartWorkoutDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{workoutToStart?.name}</DialogTitle>
            <DialogDescription>
              {workoutInProgress ? "Complete your workout" : "Get ready to start your workout"}
            </DialogDescription>
          </DialogHeader>

          {!workoutInProgress ? (
            <>
              <div className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Type:</span>
                  <span>{workoutToStart?.type}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Duration:</span>
                  <span>{workoutToStart?.duration}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">Difficulty:</span>
                  <Badge
                    variant="outline"
                    className={
                      workoutToStart?.difficulty === "Beginner"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : workoutToStart?.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                    }
                  >
                    {workoutToStart?.difficulty}
                  </Badge>
                </div>

                <div className="border rounded-md p-4 mb-4">
                  <h3 className="font-medium mb-2">Exercises:</h3>
                  <ul className="space-y-2">
                    {mockExercises.map((exercise, index) => (
                      <li key={exercise.id} className="flex justify-between">
                        <span>
                          {index + 1}. {exercise.name}
                        </span>
                        <span>
                          {exercise.sets} sets × {exercise.reps}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-muted-foreground mb-4">
                  <p>
                    Make sure you have all the equipment ready and you're properly warmed up before starting this
                    workout.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setStartWorkoutDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={startWorkout}>Start Workout</Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium text-lg">
                      Exercise {activeExerciseIndex + 1}/{mockExercises.length}
                    </h3>
                    <p className="text-muted-foreground">
                      Set {currentSet}/{mockExercises[activeExerciseIndex].sets}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{Math.round((activeExerciseIndex / mockExercises.length) * 100)}%</p>
                    <p className="text-muted-foreground">Complete</p>
                  </div>
                </div>

                <Progress
                  value={
                    ((activeExerciseIndex + (currentSet - 1) / mockExercises[activeExerciseIndex].sets) /
                      mockExercises.length) *
                    100
                  }
                  className="h-2 mb-6"
                />

                <div className="border rounded-md p-6 mb-6">
                  <h2 className="text-2xl font-bold text-center mb-2">{mockExercises[activeExerciseIndex].name}</h2>
                  <div className="flex justify-center gap-8 text-center mb-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Reps</p>
                      <p className="text-xl font-medium">{mockExercises[activeExerciseIndex].reps}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Rest</p>
                      <p className="text-xl font-medium">{mockExercises[activeExerciseIndex].rest}</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <img
                      src={`/abstract-geometric-shapes.png?height=200&width=300&query=${encodeURIComponent(
                        mockExercises[activeExerciseIndex].name + " exercise demonstration",
                      )}`}
                      alt={mockExercises[activeExerciseIndex].name}
                      className="rounded-md h-48 object-cover"
                    />
                  </div>
                </div>

                <div className="flex justify-between mb-4">
                  <h3 className="font-medium">Workout Progress:</h3>
                </div>

                <div className="space-y-2 mb-4">
                  {mockExercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className={`flex items-center p-2 rounded-md ${
                        index === activeExerciseIndex
                          ? "bg-primary/10 border border-primary"
                          : completedExercises.includes(exercise.id)
                            ? "line-through text-muted-foreground"
                            : ""
                      }`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center rounded-full mr-2 text-xs border">
                        {index + 1}
                      </div>
                      <span>
                        {exercise.name} - {exercise.sets} × {exercise.reps}
                      </span>
                      {completedExercises.includes(exercise.id) && <span className="ml-auto text-green-600">✓</span>}
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setStartWorkoutDialogOpen(false)}>
                  Quit Workout
                </Button>
                <Button onClick={completeSet}>
                  {currentSet < mockExercises[activeExerciseIndex].sets
                    ? `Complete Set ${currentSet}`
                    : activeExerciseIndex < mockExercises.length - 1
                      ? "Next Exercise"
                      : "Complete Workout"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
