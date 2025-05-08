"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, ChevronLeft, Clock, Heart, MessageSquare, Share2, Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WorkoutDetailProps {
  workoutId: string
  onBack: () => void
}

export function WorkoutDetail({ workoutId, onBack }: WorkoutDetailProps) {
  const [activeDay, setActiveDay] = useState(0)
  const [workout, setWorkout] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  // Dialog states
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)

  // Form states
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  })
  const [assignData, setAssignData] = useState({
    client: "",
    startDate: "",
    notes: "",
  })
  const [shareData, setShareData] = useState({
    method: "email",
    recipient: "",
    message: "",
  })

  // Mock API call to fetch workout data
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // This would normally be a fetch call to your API
      const mockWorkoutData = {
        "1": {
          id: "1",
          name: "5x5 Strength Program",
          description: "Classic strength building program focusing on compound movements with 5 sets of 5 reps.",
          longDescription:
            "The 5x5 program is one of the most popular strength training programs for good reason. It focuses on compound exercises that work multiple muscle groups simultaneously, allowing you to lift heavier weights and stimulate maximum muscle growth. The program is built around 5 sets of 5 reps for each exercise, which hits the sweet spot for building both strength and muscle. This program is ideal for beginners to intermediate lifters looking to build a solid strength foundation.",
          category: "strength",
          level: "Intermediate",
          duration: "45-60 min",
          frequency: "3x per week",
          rating: 4.8,
          users: 1245,
          image: "/focused-barbell-workout.png",
          featured: true,
          creator: {
            name: "Mark Davis",
            title: "Strength & Conditioning Coach",
            avatar: "/focused-lifter.png",
          },
          schedule: [
            { day: "Monday", focus: "Workout A (Squat, Bench, Row)" },
            { day: "Tuesday", focus: "Rest" },
            { day: "Wednesday", focus: "Workout B (Squat, Press, Deadlift)" },
            { day: "Thursday", focus: "Rest" },
            { day: "Friday", focus: "Workout A (Squat, Bench, Row)" },
            { day: "Saturday", focus: "Rest" },
            { day: "Sunday", focus: "Rest" },
          ],
          days: [
            {
              name: "Workout A",
              exercises: [
                {
                  name: "Barbell Squat",
                  sets: 5,
                  reps: 5,
                  rest: "3-5 min",
                  notes: "Focus on depth and keeping chest up",
                },
                {
                  name: "Bench Press",
                  sets: 5,
                  reps: 5,
                  rest: "3-5 min",
                  notes: "Retract shoulder blades, feet planted firmly",
                },
                {
                  name: "Barbell Row",
                  sets: 5,
                  reps: 5,
                  rest: "3-5 min",
                  notes: "Keep back parallel to floor, pull to lower chest",
                },
              ],
            },
            {
              name: "Workout B",
              exercises: [
                {
                  name: "Barbell Squat",
                  sets: 5,
                  reps: 5,
                  rest: "3-5 min",
                  notes: "Focus on depth and keeping chest up",
                },
                {
                  name: "Overhead Press",
                  sets: 5,
                  reps: 5,
                  rest: "3-5 min",
                  notes: "Tight core, don't lean back excessively",
                },
                { name: "Deadlift", sets: 1, reps: 5, rest: "3-5 min", notes: "Only one heavy set to avoid fatigue" },
              ],
            },
          ],
          reviews: [
            {
              id: "1",
              user: "James T.",
              avatar: "/contemplative-man.png",
              rating: 5,
              date: "1 month ago",
              comment:
                "Simple but incredibly effective. I've added 50 pounds to my squat in just 8 weeks following this program. The focus on progressive overload really works.",
            },
            {
              id: "2",
              user: "Michael R.",
              avatar: "/contemplative-man.png",
              rating: 4,
              date: "2 months ago",
              comment:
                "Great program for building strength. I appreciate the simplicity and focus on the main lifts. My only critique is that it lacks some accessory work for aesthetics.",
            },
            {
              id: "3",
              user: "Robert L.",
              avatar: "/thoughtful-man-profile.png",
              rating: 5,
              date: "3 months ago",
              comment:
                "Perfect for beginners serious about strength. The program is easy to follow and the progression scheme makes sense. I've never been stronger in my life.",
            },
          ],
        },
        "2": {
          id: "2",
          name: "Push Pull Legs Split",
          description:
            "6-day split targeting push muscles, pull muscles, and legs on separate days for maximum hypertrophy.",
          longDescription:
            "The Push Pull Legs split is one of the most effective workout routines for building muscle and strength. This routine splits your training into three distinct days: Push day focuses on chest, shoulders, and triceps. Pull day targets back and biceps. Leg day works your quadriceps, hamstrings, calves, and often includes some core work. This split allows for optimal recovery while still training with high frequency and volume, making it ideal for intermediate to advanced lifters looking to maximize hypertrophy.",
          category: "hypertrophy",
          level: "Intermediate",
          duration: "60-75 min",
          frequency: "6x per week",
          rating: 4.9,
          users: 2340,
          image: "/diverse-gym-push-pull-legs.png",
          featured: true,
          creator: {
            name: "Mike Johnson",
            title: "Certified Strength Coach",
            avatar: "/empowered-fitness.png",
          },
          schedule: [
            { day: "Monday", focus: "Push (Chest, Shoulders, Triceps)" },
            { day: "Tuesday", focus: "Pull (Back, Biceps)" },
            { day: "Wednesday", focus: "Legs (Quads, Hamstrings, Calves)" },
            { day: "Thursday", focus: "Push (Chest, Shoulders, Triceps)" },
            { day: "Friday", focus: "Pull (Back, Biceps)" },
            { day: "Saturday", focus: "Legs (Quads, Hamstrings, Calves)" },
            { day: "Sunday", focus: "Rest" },
          ],
          days: [
            {
              name: "Day 1: Push",
              exercises: [
                { name: "Bench Press", sets: 4, reps: "8-12", rest: "90 sec", notes: "Focus on full range of motion" },
                { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "90 sec", notes: "45 degree incline" },
                {
                  name: "Seated Shoulder Press",
                  sets: 3,
                  reps: "8-10",
                  rest: "90 sec",
                  notes: "Avoid excessive arching",
                },
                { name: "Lateral Raises", sets: 3, reps: "12-15", rest: "60 sec", notes: "Keep elbows slightly bent" },
                { name: "Tricep Pushdowns", sets: 3, reps: "12-15", rest: "60 sec", notes: "Keep elbows at sides" },
                {
                  name: "Overhead Tricep Extension",
                  sets: 3,
                  reps: "12-15",
                  rest: "60 sec",
                  notes: "Focus on full extension",
                },
              ],
            },
            {
              name: "Day 2: Pull",
              exercises: [
                { name: "Deadlift", sets: 3, reps: "6-8", rest: "120 sec", notes: "Focus on form over weight" },
                { name: "Pull-ups/Lat Pulldown", sets: 4, reps: "8-12", rest: "90 sec", notes: "Full range of motion" },
                { name: "Barbell Row", sets: 3, reps: "8-10", rest: "90 sec", notes: "Keep back straight" },
                { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "90 sec", notes: "Squeeze shoulder blades" },
                { name: "Face Pulls", sets: 3, reps: "15-20", rest: "60 sec", notes: "Focus on rear delts" },
                { name: "Barbell Curl", sets: 3, reps: "10-12", rest: "60 sec", notes: "Avoid swinging" },
                { name: "Hammer Curls", sets: 3, reps: "10-12", rest: "60 sec", notes: "Keep elbows stationary" },
              ],
            },
            {
              name: "Day 3: Legs",
              exercises: [
                {
                  name: "Barbell Squat",
                  sets: 4,
                  reps: "8-10",
                  rest: "120 sec",
                  notes: "Go below parallel if possible",
                },
                {
                  name: "Romanian Deadlift",
                  sets: 3,
                  reps: "8-10",
                  rest: "90 sec",
                  notes: "Feel stretch in hamstrings",
                },
                { name: "Leg Press", sets: 3, reps: "10-12", rest: "90 sec", notes: "Don't lock out knees" },
                { name: "Walking Lunges", sets: 3, reps: "10-12 per leg", rest: "90 sec", notes: "Keep torso upright" },
                { name: "Leg Extensions", sets: 3, reps: "12-15", rest: "60 sec", notes: "Focus on quad contraction" },
                { name: "Leg Curls", sets: 3, reps: "12-15", rest: "60 sec", notes: "Full range of motion" },
                {
                  name: "Standing Calf Raises",
                  sets: 4,
                  reps: "15-20",
                  rest: "60 sec",
                  notes: "Full stretch at bottom",
                },
              ],
            },
          ],
          reviews: [
            {
              id: "1",
              user: "Sarah M.",
              avatar: "/contemplative-artist.png",
              rating: 5,
              date: "2 weeks ago",
              comment:
                "This program has completely transformed my physique. I've gained noticeable muscle in all the right places and my strength has gone through the roof. Highly recommend!",
            },
            {
              id: "2",
              user: "David K.",
              avatar: "/contemplative-man.png",
              rating: 4,
              date: "1 month ago",
              comment:
                "Great program overall. I've seen significant gains, especially in my chest and back. The only downside is the time commitment - 6 days a week is a lot, but the results are worth it.",
            },
            {
              id: "3",
              user: "Jennifer L.",
              avatar: "/serene-woman-gaze.png",
              rating: 5,
              date: "3 months ago",
              comment:
                "As someone who was stuck in a plateau for months, this program was exactly what I needed. The volume and frequency are perfect for hypertrophy. I'm seeing new growth and definition!",
            },
          ],
        },
        "3": {
          id: "3",
          name: "Full Body 3-Day Split",
          description:
            "Efficient full body workout three times per week, perfect for beginners or those with limited time.",
          longDescription:
            "This full body workout program is designed to be efficient and effective, targeting all major muscle groups three times per week. It's perfect for beginners who are just starting their fitness journey, or for busy individuals who can only commit to three workouts per week. Each session includes compound movements that work multiple muscle groups simultaneously, ensuring you get the most bang for your buck in terms of time spent in the gym. The program focuses on progressive overload to continually challenge your muscles and promote growth and strength gains.",
          category: "fullbody",
          level: "Beginner",
          duration: "45-60 min",
          frequency: "3x per week",
          rating: 4.7,
          users: 3150,
          image: "/diverse-full-body-workout.png",
          featured: true,
          creator: {
            name: "Lisa Chen",
            title: "Certified Personal Trainer",
            avatar: "/fitness-instructor-demonstration.png",
          },
          schedule: [
            { day: "Monday", focus: "Full Body Workout A" },
            { day: "Tuesday", focus: "Rest/Active Recovery" },
            { day: "Wednesday", focus: "Full Body Workout B" },
            { day: "Thursday", focus: "Rest/Active Recovery" },
            { day: "Friday", focus: "Full Body Workout C" },
            { day: "Saturday", focus: "Rest/Active Recovery" },
            { day: "Sunday", focus: "Rest/Active Recovery" },
          ],
          days: [
            {
              name: "Workout A",
              exercises: [
                {
                  name: "Goblet Squat",
                  sets: 3,
                  reps: "10-12",
                  rest: "60 sec",
                  notes: "Keep chest up, go as deep as comfortable",
                },
                {
                  name: "Dumbbell Bench Press",
                  sets: 3,
                  reps: "10-12",
                  rest: "60 sec",
                  notes: "Keep elbows at 45° angle",
                },
                {
                  name: "Lat Pulldown",
                  sets: 3,
                  reps: "10-12",
                  rest: "60 sec",
                  notes: "Pull to upper chest, squeeze shoulder blades",
                },
                {
                  name: "Dumbbell Shoulder Press",
                  sets: 3,
                  reps: "10-12",
                  rest: "60 sec",
                  notes: "Don't lock elbows at top",
                },
                {
                  name: "Romanian Deadlift",
                  sets: 3,
                  reps: "10-12",
                  rest: "60 sec",
                  notes: "Hinge at hips, slight knee bend",
                },
                { name: "Plank", sets: 3, reps: "30-45 sec", rest: "45 sec", notes: "Keep body in straight line" },
              ],
            },
            {
              name: "Workout B",
              exercises: [
                {
                  name: "Dumbbell Lunges",
                  sets: 3,
                  reps: "10-12 per leg",
                  rest: "60 sec",
                  notes: "Step forward, knee to 90°",
                },
                { name: "Push-ups", sets: 3, reps: "8-12", rest: "60 sec", notes: "Modify on knees if needed" },
                {
                  name: "Dumbbell Rows",
                  sets: 3,
                  reps: "10-12 per arm",
                  rest: "60 sec",
                  notes: "Keep back flat, pull elbow back",
                },
                { name: "Lateral Raises", sets: 3, reps: "12-15", rest: "60 sec", notes: "Slight bend in elbows" },
                { name: "Glute Bridges", sets: 3, reps: "12-15", rest: "60 sec", notes: "Squeeze glutes at top" },
                { name: "Russian Twists", sets: 3, reps: "10-15 per side", rest: "45 sec", notes: "Keep chest up" },
              ],
            },
            {
              name: "Workout C",
              exercises: [
                { name: "Dumbbell Squat", sets: 3, reps: "10-12", rest: "60 sec", notes: "Hold dumbbells at sides" },
                { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60 sec", notes: "30-45° incline" },
                { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "60 sec", notes: "Sit tall, pull to navel" },
                {
                  name: "Arnold Press",
                  sets: 3,
                  reps: "10-12",
                  rest: "60 sec",
                  notes: "Rotate dumbbells as you press",
                },
                { name: "Leg Curls", sets: 3, reps: "12-15", rest: "60 sec", notes: "Focus on hamstrings" },
                { name: "Mountain Climbers", sets: 3, reps: "20-30 sec", rest: "45 sec", notes: "Keep hips down" },
              ],
            },
          ],
          reviews: [
            {
              id: "1",
              user: "Thomas B.",
              avatar: "/contemplative-man.png",
              rating: 5,
              date: "3 weeks ago",
              comment:
                "Perfect for my busy schedule. I'm seeing great results with just 3 workouts per week. The full body approach keeps me energized and I don't feel burned out.",
            },
            {
              id: "2",
              user: "Rachel K.",
              avatar: "/contemplative-artist.png",
              rating: 4,
              date: "1 month ago",
              comment:
                "Great starter program. I was intimidated by the gym before, but this routine is approachable and effective. I'm already feeling stronger after a few weeks.",
            },
            {
              id: "3",
              user: "Daniel M.",
              avatar: "/thoughtful-man-profile.png",
              rating: 5,
              date: "2 months ago",
              comment:
                "Excellent program for beginners. The exercises are well-balanced and hit all muscle groups. I appreciate the rest days built into the schedule.",
            },
          ],
        },
      }

      // Set the workout data based on the workoutId
      setWorkout(mockWorkoutData[workoutId as keyof typeof mockWorkoutData] || null)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [workoutId])

  // Handle save workout
  const handleSaveWorkout = () => {
    setIsSaved(!isSaved)
    if (!isSaved) {
      alert(`${workout.name} has been saved to your favorites!`)
    } else {
      alert(`${workout.name} has been removed from your favorites.`)
    }
  }

  // Handle share workout
  const handleShareWorkout = () => {
    setShareDialogOpen(true)
  }

  const submitShareForm = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Workout shared with ${shareData.recipient} via ${shareData.method}!`)
    setShareDialogOpen(false)
  }

  // Handle assign to client
  const handleAssignToClient = () => {
    setAssignDialogOpen(true)
  }

  const submitAssignForm = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Workout assigned to ${assignData.client} starting on ${assignData.startDate}!`)
    setAssignDialogOpen(false)
  }

  // Handle write review
  const handleWriteReview = () => {
    setReviewDialogOpen(true)
  }

  const submitReviewForm = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you for your review! Your ${reviewData.rating}-star review has been submitted.`)
    setReviewDialogOpen(false)

    // In a real app, we would add the review to the workout's reviews array
    const newReview = {
      id: Date.now().toString(),
      user: "You",
      avatar: "/placeholder-user.jpg",
      rating: reviewData.rating,
      date: "Just now",
      comment: reviewData.comment,
    }

    setWorkout({
      ...workout,
      reviews: [newReview, ...workout.reviews],
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading workout details...</p>
        </div>
      </div>
    )
  }

  if (!workout) {
    return (
      <div className="mt-6">
        <Button variant="ghost" className="mb-4 pl-0" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Workouts
        </Button>
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground">Workout not found</p>
            <Button className="mt-4" onClick={onBack}>
              Return to Workouts
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="mt-6">
        <Button variant="ghost" className="mb-4 pl-0" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Workouts
        </Button>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={workout.image || "/placeholder.svg"}
                  alt={workout.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline">
                    {workout.category === "hypertrophy" ? "Hypertrophy" : workout.category}
                  </Badge>
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
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {workout.duration}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {workout.frequency}
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{workout.name}</CardTitle>
                <CardDescription className="text-base">{workout.longDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar>
                    <AvatarImage src={workout.creator.avatar || "/placeholder.svg"} alt={workout.creator.name} />
                    <AvatarFallback>{workout.creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{workout.creator.name}</div>
                    <div className="text-sm text-muted-foreground">{workout.creator.title}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Weekly Schedule</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {workout.schedule.map((day: any, index: number) => (
                      <div key={index} className="text-center">
                        <div className="font-medium text-sm">{day.day.substring(0, 3)}</div>
                        <div className="text-xs text-muted-foreground mt-1">{day.focus}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Workout Details</h3>
                  <Tabs
                    value={`day-${activeDay}`}
                    onValueChange={(value) => setActiveDay(Number.parseInt(value.split("-")[1]))}
                  >
                    <TabsList className="w-full justify-start mb-4 overflow-x-auto">
                      {workout.days.map((day: any, index: number) => (
                        <TabsTrigger key={index} value={`day-${index}`} className="min-w-max">
                          {day.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {workout.days.map((day: any, dayIndex: number) => (
                      <TabsContent key={dayIndex} value={`day-${dayIndex}`} className="mt-0">
                        <div className="border rounded-md">
                          <div className="bg-muted px-4 py-2 rounded-t-md">
                            <h4 className="font-medium">{day.name}</h4>
                          </div>
                          <div className="p-4">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left pb-2">Exercise</th>
                                  <th className="text-center pb-2">Sets</th>
                                  <th className="text-center pb-2">Reps</th>
                                  <th className="text-center pb-2">Rest</th>
                                </tr>
                              </thead>
                              <tbody>
                                {day.exercises.map((exercise: any, exIndex: number) => (
                                  <tr key={exIndex} className="border-b last:border-0">
                                    <td className="py-3">
                                      <div className="font-medium">{exercise.name}</div>
                                      {exercise.notes && (
                                        <div className="text-xs text-muted-foreground mt-1">{exercise.notes}</div>
                                      )}
                                    </td>
                                    <td className="text-center py-3">{exercise.sets}</td>
                                    <td className="text-center py-3">{exercise.reps}</td>
                                    <td className="text-center py-3">{exercise.rest}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className={`flex gap-2 ${isSaved ? "bg-primary/10" : ""}`}
                    onClick={handleSaveWorkout}
                  >
                    <Heart className={`h-4 w-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
                    <span>{isSaved ? "Saved" : "Save"}</span>
                  </Button>
                  <Button variant="outline" className="flex gap-2" onClick={handleShareWorkout}>
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
                <Button onClick={handleAssignToClient}>Assign to Client</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Workout Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>User Rating</span>
                    <span className="font-medium">{workout.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(workout.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Popularity</span>
                    <span className="font-medium">{workout.users} users</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Difficulty</span>
                    <span className="font-medium">{workout.level}</span>
                  </div>
                  <Progress
                    value={workout.level === "Beginner" ? 33 : workout.level === "Intermediate" ? 66 : 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {workout.reviews.map((review: any) => (
                  <div key={review.id} className="pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                          <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{review.user}</div>
                          <div className="text-xs text-muted-foreground">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full flex gap-2" onClick={handleWriteReview}>
                  <MessageSquare className="h-4 w-4" />
                  <span>Write a Review</span>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Similar Workouts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md"
                  onClick={() => onBack()}
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden">
                    <img
                      src="/upper-lower-split-workout.png"
                      alt="Upper/Lower Split"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Upper/Lower 4-Day Split</div>
                    <div className="text-sm text-muted-foreground">Intermediate • 4x per week</div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md"
                  onClick={() => onBack()}
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden">
                    <img src="/focused-lifter.png" alt="Bodybuilding Split" className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <div className="font-medium">5-Day Bodybuilding Split</div>
                    <div className="text-sm text-muted-foreground">Advanced • 5x per week</div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md"
                  onClick={() => onBack()}
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden">
                    <img
                      src="/diverse-full-body-workout.png"
                      alt="Full Body Workout"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Full Body 3-Day Split</div>
                    <div className="text-sm text-muted-foreground">Beginner • 3x per week</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Workout Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={submitShareForm}>
            <DialogHeader>
              <DialogTitle>Share Workout</DialogTitle>
              <DialogDescription>Share this workout with clients or friends.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="share-method" className="text-right">
                  Method
                </Label>
                <Select
                  value={shareData.method}
                  onValueChange={(value) => setShareData({ ...shareData, method: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select sharing method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="link">Copy Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {shareData.method !== "link" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="share-recipient" className="text-right">
                    Recipient
                  </Label>
                  <Input
                    id="share-recipient"
                    value={shareData.recipient}
                    onChange={(e) => setShareData({ ...shareData, recipient: e.target.value })}
                    placeholder={shareData.method === "email" ? "Email address" : "Phone number"}
                    className="col-span-3"
                    required
                  />
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="share-message" className="text-right">
                  Message
                </Label>
                <Textarea
                  id="share-message"
                  value={shareData.message}
                  onChange={(e) => setShareData({ ...shareData, message: e.target.value })}
                  placeholder="Add a personal message (optional)"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShareDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Share</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Assign to Client Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={submitAssignForm}>
            <DialogHeader>
              <DialogTitle>Assign to Client</DialogTitle>
              <DialogDescription>Assign this workout to a client's program.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assign-client" className="text-right">
                  Client
                </Label>
                <Select
                  value={assignData.client}
                  onValueChange={(value) => setAssignData({ ...assignData, client: value })}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                    <SelectItem value="emily-davis">Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assign-date" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="assign-date"
                  type="date"
                  value={assignData.startDate}
                  onChange={(e) => setAssignData({ ...assignData, startDate: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assign-notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="assign-notes"
                  value={assignData.notes}
                  onChange={(e) => setAssignData({ ...assignData, notes: e.target.value })}
                  placeholder="Additional instructions for the client"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAssignDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Assign</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Write Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={submitReviewForm}>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
              <DialogDescription>Share your experience with this workout.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="review-rating" className="text-right">
                  Rating
                </Label>
                <Select
                  value={reviewData.rating.toString()}
                  onValueChange={(value) => setReviewData({ ...reviewData, rating: Number.parseInt(value) })}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Stars - Excellent</SelectItem>
                    <SelectItem value="4">4 Stars - Very Good</SelectItem>
                    <SelectItem value="3">3 Stars - Good</SelectItem>
                    <SelectItem value="2">2 Stars - Fair</SelectItem>
                    <SelectItem value="1">1 Star - Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="review-comment" className="text-right">
                  Comment
                </Label>
                <Textarea
                  id="review-comment"
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  placeholder="Share your experience with this workout"
                  className="col-span-3 min-h-[100px]"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Review</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
