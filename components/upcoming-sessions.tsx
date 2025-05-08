"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, CheckCircle, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ExerciseVideo } from "@/components/exercise-video"

interface UpcomingSessionsProps {
  className?: string
}

export function UpcomingSessions({ className }: UpcomingSessionsProps) {
  const [sessions, setSessions] = useState([
    {
      id: "1",
      name: "Upper Body Strength",
      date: "Today",
      time: "10:00 AM",
      duration: "60 min",
      type: "Strength Training",
      location: "Home Gym",
      isVirtual: false,
    },
    {
      id: "2",
      name: "HIIT Cardio",
      date: "Today",
      time: "2:30 PM",
      duration: "45 min",
      type: "HIIT",
      location: "Local Park",
      isVirtual: false,
    },
    {
      id: "3",
      name: "Mobility & Recovery",
      date: "Tomorrow",
      time: "9:15 AM",
      duration: "60 min",
      type: "Mobility & Recovery",
      location: "Home",
      isVirtual: true,
    },
    {
      id: "4",
      name: "Lower Body Strength",
      date: "Tomorrow",
      time: "4:00 PM",
      duration: "45 min",
      type: "Strength Training",
      location: "Gym",
      isVirtual: false,
    },
    {
      id: "5",
      name: "Monthly Progress Check",
      date: "Apr 28",
      time: "11:30 AM",
      duration: "30 min",
      type: "Assessment",
      location: "Home",
      isVirtual: true,
    },
  ])

  // State for session dialog
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false)
  const [activeSession, setActiveSession] = useState<any>(null)
  const [sessionInProgress, setSessionInProgress] = useState(false)
  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [activeTab, setActiveTab] = useState("workout")
  const [notes, setNotes] = useState("")

  // Mock exercises for the session
  const mockExercises = [
    { id: "ex1", name: "Warm-up", duration: "5 min", completed: false },
    { id: "ex2", name: "Squats", sets: 3, reps: "12", weight: "Body weight", completed: false },
    { id: "ex3", name: "Push-ups", sets: 3, reps: "10", weight: "Body weight", completed: false },
    { id: "ex4", name: "Dumbbell Rows", sets: 3, reps: "12 each side", weight: "15 lbs", completed: false },
    { id: "ex5", name: "Plank", duration: "30 sec", sets: 3, completed: false },
    { id: "ex6", name: "Cool down", duration: "5 min", completed: false },
  ]

  // Handle starting a session
  const handleStartSession = (session: any) => {
    setActiveSession(session)
    setSessionDialogOpen(true)
    setSessionInProgress(false)
    setSessionCompleted(false)
    setCurrentExerciseIndex(0)
    setCurrentTime(0)
    setActiveTab("workout")
    setNotes("")
  }

  // Start the actual session
  const startSession = () => {
    setSessionInProgress(true)
    // In a real app, you might start a timer here
  }

  // Complete the current exercise and move to the next
  const completeExercise = () => {
    if (currentExerciseIndex < mockExercises.length - 1) {
      mockExercises[currentExerciseIndex].completed = true
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    } else {
      // All exercises completed
      mockExercises[currentExerciseIndex].completed = true
      setSessionCompleted(true)
    }
  }

  // End the session
  const endSession = () => {
    // In a real app, you would save the session data here
    setSessionDialogOpen(false)

    // Update the sessions list to remove the completed session
    if (activeSession) {
      setSessions(sessions.filter((session) => session.id !== activeSession.id))
    }
  }

  return (
    <>
      <Card className={cn("col-span-4", className)}>
        <CardHeader>
          <CardTitle>Upcoming Workouts</CardTitle>
          <CardDescription>Your scheduled workouts for the next few days.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {session.type === "Strength Training" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 18h3" />
                        <path d="M15 18h3" />
                        <path d="M4 10v4c0 1.1.9 2 2 2" />
                        <path d="M20 10v4c0 1.1-.9 2-2 2" />
                        <path d="M8 9h8" />
                        <path d="M9 6v3" />
                        <path d="M15 6v3" />
                      </svg>
                    ) : session.type === "HIIT" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a4.2 4.2 0 0 0 4 4 4.2 4.2 0 0 1 3 2 4.2 4.2 0 0 1-1 5 4.2 4.2 0 0 0-3 4 4.2 4.2 0 0 1-2 3 4.2 4.2 0 0 1-5-1 4.2 4.2 0 0 0-4-3 4.2 4.2 0 0 1-3-2 4.2 4.2 0 0 1 1-5 4.2 4.2 0 0 0 3-4 4.2 4.2 0 0 1 2-3 4.2 4.2 0 0 1 5 1Z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{session.name}</div>
                    <div className="text-sm text-muted-foreground">{session.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1 font-medium">
                      <Calendar className="h-3 w-3" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {session.time} ({session.duration})
                      </span>
                    </div>
                  </div>
                  <div>
                    {session.isVirtual ? (
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 flex items-center gap-1"
                      >
                        <Video className="h-3 w-3" />
                        Virtual
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 flex items-center gap-1"
                      >
                        <MapPin className="h-3 w-3" />
                        {session.location}
                      </Badge>
                    )}
                  </div>
                  <Button size="sm" onClick={() => handleStartSession(session)}>
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Session Dialog */}
      <Dialog open={sessionDialogOpen} onOpenChange={setSessionDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{sessionCompleted ? "Workout Complete" : `${activeSession?.name}`}</DialogTitle>
            <DialogDescription>
              {sessionCompleted
                ? "Great job! You've completed your workout."
                : sessionInProgress
                  ? "Track your progress through the workout"
                  : `${activeSession?.type} - ${activeSession?.duration}`}
            </DialogDescription>
          </DialogHeader>

          {sessionCompleted ? (
            <div className="py-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Workout Completed Successfully!</h3>
              <p className="text-muted-foreground mb-6">
                You've completed your {activeSession?.name} workout. Your progress has been saved.
              </p>
              <div className="bg-muted p-4 rounded-md mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Workout</p>
                    <p className="font-medium">{activeSession?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{activeSession?.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{activeSession?.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Exercises Completed</p>
                    <p className="font-medium">{mockExercises.length}</p>
                  </div>
                </div>
              </div>
              {notes && (
                <div className="bg-muted p-4 rounded-md mb-6 text-left">
                  <h4 className="font-medium mb-2">Your Notes:</h4>
                  <p className="text-sm whitespace-pre-wrap">{notes}</p>
                </div>
              )}
              <div className="flex gap-4 justify-center">
                <Button variant="outline">Save to History</Button>
                <Button onClick={endSession}>Close</Button>
              </div>
            </div>
          ) : !sessionInProgress ? (
            <div className="py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {activeSession?.type === "Strength Training" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 18h3" />
                        <path d="M15 18h3" />
                        <path d="M4 10v4c0 1.1.9 2 2 2" />
                        <path d="M20 10v4c0 1.1-.9 2-2 2" />
                        <path d="M8 9h8" />
                        <path d="M9 6v3" />
                        <path d="M15 6v3" />
                      </svg>
                    ) : activeSession?.type === "HIIT" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a4.2 4.2 0 0 0 4 4 4.2 4.2 0 0 1 3 2 4.2 4.2 0 0 1-1 5 4.2 4.2 0 0 0-3 4 4.2 4.2 0 0 1-2 3 4.2 4.2 0 0 1-5-1 4.2 4.2 0 0 0-4-3 4.2 4.2 0 0 1-3-2 4.2 4.2 0 0 1 1-5 4.2 4.2 0 0 0 3-4 4.2 4.2 0 0 1 2-3 4.2 4.2 0 0 1 5 1Z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-lg">{activeSession?.name}</div>
                    <div className="text-sm text-muted-foreground">{activeSession?.type}</div>
                  </div>
                </div>
                <div>
                  {activeSession?.isVirtual ? (
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 flex items-center gap-1"
                    >
                      <Video className="h-4 w-4" />
                      Virtual Workout
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 flex items-center gap-1"
                    >
                      <MapPin className="h-4 w-4" />
                      {activeSession?.location}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="border rounded-md p-4 mb-4">
                <h3 className="font-medium mb-2">Workout Details:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">
                      {activeSession?.date}, {activeSession?.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{activeSession?.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Workout Type</p>
                    <p className="font-medium">{activeSession?.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Focus Areas</p>
                    <p className="font-medium">
                      {activeSession?.type === "Strength Training"
                        ? "Upper Body, Core"
                        : activeSession?.type === "HIIT"
                          ? "Full Body, Cardio"
                          : "Flexibility, Recovery"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4 mb-6">
                <h3 className="font-medium mb-2">Planned Exercises:</h3>
                <ul className="space-y-2">
                  {mockExercises.map((exercise, index) => (
                    <li key={exercise.id} className="flex justify-between">
                      <span>
                        {index + 1}. {exercise.name}
                      </span>
                      <span>
                        {exercise.sets && exercise.reps
                          ? `${exercise.sets} sets × ${exercise.reps}`
                          : exercise.duration
                            ? exercise.duration
                            : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-sm text-muted-foreground mb-6">
                <p>
                  Make sure you have all necessary equipment ready. Remember to stay hydrated throughout your workout.
                </p>
              </div>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="workout">Workout</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="workout" className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium text-lg">
                      Exercise {currentExerciseIndex + 1}/{mockExercises.length}
                    </h3>
                    <p className="text-muted-foreground">
                      {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, "0")} elapsed
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {Math.round((currentExerciseIndex / mockExercises.length) * 100)}% Complete
                    </p>
                  </div>
                </div>

                <Progress value={(currentExerciseIndex / mockExercises.length) * 100} className="h-2 mb-6" />

                <div className="border rounded-md p-6 mb-6">
                  <h2 className="text-2xl font-bold text-center mb-2">{mockExercises[currentExerciseIndex].name}</h2>
                  <div className="flex justify-center gap-8 text-center mb-4">
                    {mockExercises[currentExerciseIndex].sets && (
                      <div>
                        <p className="text-muted-foreground text-sm">Sets</p>
                        <p className="text-xl font-medium">{mockExercises[currentExerciseIndex].sets}</p>
                      </div>
                    )}
                    {mockExercises[currentExerciseIndex].reps && (
                      <div>
                        <p className="text-muted-foreground text-sm">Reps</p>
                        <p className="text-xl font-medium">{mockExercises[currentExerciseIndex].reps}</p>
                      </div>
                    )}
                    {mockExercises[currentExerciseIndex].weight && (
                      <div>
                        <p className="text-muted-foreground text-sm">Weight</p>
                        <p className="text-xl font-medium">{mockExercises[currentExerciseIndex].weight}</p>
                      </div>
                    )}
                    {mockExercises[currentExerciseIndex].duration && (
                      <div>
                        <p className="text-muted-foreground text-sm">Duration</p>
                        <p className="text-xl font-medium">{mockExercises[currentExerciseIndex].duration}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <ExerciseVideo
                      exerciseName={mockExercises[currentExerciseIndex].name}
                      className="h-48 w-full max-w-md mx-auto"
                    />
                  </div>
                </div>

                <div className="flex justify-between mb-4">
                  <h3 className="font-medium">Workout Progress:</h3>
                </div>

                <div className="space-y-2 mb-6">
                  {mockExercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className={`flex items-center p-2 rounded-md ${
                        index === currentExerciseIndex
                          ? "bg-primary/10 border border-primary"
                          : exercise.completed
                            ? "line-through text-muted-foreground"
                            : ""
                      }`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center rounded-full mr-2 text-xs border">
                        {index + 1}
                      </div>
                      <span>
                        {exercise.name}
                        {exercise.sets && exercise.reps
                          ? ` - ${exercise.sets} × ${exercise.reps}`
                          : exercise.duration
                            ? ` - ${exercise.duration}`
                            : ""}
                      </span>
                      {exercise.completed && <span className="ml-auto text-green-600">✓</span>}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="notes" className="py-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="workout-notes" className="text-sm font-medium">
                      Workout Notes
                    </label>
                    <textarea
                      id="workout-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Record your thoughts, feelings, or achievements during this workout..."
                      className="mt-2 w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      Tip: Note down how you felt during exercises, any PRs achieved, or areas where you struggled. This
                      will help track your progress over time.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            {!sessionCompleted && (
              <>
                {!sessionInProgress ? (
                  <>
                    <Button variant="outline" onClick={() => setSessionDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={startSession}>Start Workout</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setSessionDialogOpen(false)}>
                      Pause Workout
                    </Button>
                    <Button onClick={completeExercise}>
                      {currentExerciseIndex < mockExercises.length - 1 ? "Next Exercise" : "Complete Workout"}
                    </Button>
                  </>
                )}
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
