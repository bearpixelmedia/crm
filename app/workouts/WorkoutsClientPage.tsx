"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { WorkoutsList } from "@/components/workouts-list"
import { WorkoutsCreateButton } from "@/components/workouts-create-button"
import { WorkoutLibrary } from "@/components/workout-library"
import { WorkoutDetail } from "@/components/workout-detail"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WorkoutsClientPage() {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("my-workouts")

  const handleSelectWorkout = (id: string) => {
    setSelectedWorkout(id)
  }

  const handleBackToWorkouts = () => {
    setSelectedWorkout(null)
  }

  return (
    <DashboardShell>
      {selectedWorkout ? (
        <WorkoutDetail workoutId={selectedWorkout} onBack={handleBackToWorkouts} />
      ) : (
        <>
          <DashboardHeader heading="Workouts" text="Create and manage your workout routines.">
            <WorkoutsCreateButton />
          </DashboardHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList>
              <TabsTrigger value="my-workouts">My Workouts</TabsTrigger>
              <TabsTrigger value="workout-library">Workout Library</TabsTrigger>
            </TabsList>
            <TabsContent value="my-workouts">
              <WorkoutsList onSelectWorkout={handleSelectWorkout} />
            </TabsContent>
            <TabsContent value="workout-library">
              <WorkoutLibrary onSelectWorkout={handleSelectWorkout} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </DashboardShell>
  )
}
