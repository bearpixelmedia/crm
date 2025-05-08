"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function MealPlan() {
  const [mealPlan] = useState({
    monday: [
      {
        id: "1",
        name: "Protein Oatmeal",
        time: "Breakfast",
        calories: 350,
        protein: 25,
        carbs: 45,
        fat: 10,
      },
      {
        id: "2",
        name: "Chicken Salad",
        time: "Lunch",
        calories: 450,
        protein: 40,
        carbs: 20,
        fat: 15,
      },
      {
        id: "3",
        name: "Protein Shake",
        time: "Snack",
        calories: 200,
        protein: 30,
        carbs: 10,
        fat: 5,
      },
      {
        id: "4",
        name: "Salmon with Vegetables",
        time: "Dinner",
        calories: 550,
        protein: 45,
        carbs: 25,
        fat: 20,
      },
    ],
    tuesday: [
      {
        id: "5",
        name: "Greek Yogurt with Berries",
        time: "Breakfast",
        calories: 300,
        protein: 20,
        carbs: 30,
        fat: 8,
      },
      {
        id: "6",
        name: "Turkey Wrap",
        time: "Lunch",
        calories: 420,
        protein: 35,
        carbs: 40,
        fat: 12,
      },
      {
        id: "7",
        name: "Protein Bar",
        time: "Snack",
        calories: 180,
        protein: 15,
        carbs: 20,
        fat: 6,
      },
      {
        id: "8",
        name: "Stir Fry with Tofu",
        time: "Dinner",
        calories: 480,
        protein: 30,
        carbs: 45,
        fat: 15,
      },
    ],
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal Plan</CardTitle>
        <CardDescription>Your personalized meal plan for the week.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monday">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="monday">Mon</TabsTrigger>
            <TabsTrigger value="tuesday">Tue</TabsTrigger>
            <TabsTrigger value="wednesday">Wed</TabsTrigger>
            <TabsTrigger value="thursday">Thu</TabsTrigger>
            <TabsTrigger value="friday">Fri</TabsTrigger>
            <TabsTrigger value="saturday">Sat</TabsTrigger>
            <TabsTrigger value="sunday">Sun</TabsTrigger>
          </TabsList>
          <TabsContent value="monday" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {mealPlan.monday.map((meal) => (
                <Card key={meal.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-md">{meal.name}</CardTitle>
                      <Badge variant="outline">{meal.time}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="flex flex-col items-center p-2 bg-muted/20 rounded-md">
                        <span className="font-medium">{meal.calories}</span>
                        <span className="text-xs text-muted-foreground">Calories</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-muted/20 rounded-md">
                        <span className="font-medium">{meal.protein}g</span>
                        <span className="text-xs text-muted-foreground">Protein</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-muted/20 rounded-md">
                        <span className="font-medium">{meal.carbs}g</span>
                        <span className="text-xs text-muted-foreground">Carbs</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tuesday" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {mealPlan.tuesday.map((meal) => (
                <Card key={meal.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-md">{meal.name}</CardTitle>
                      <Badge variant="outline">{meal.time}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="flex flex-col items-center p-2 bg-muted/20 rounded-md">
                        <span className="font-medium">{meal.calories}</span>
                        <span className="text-xs text-muted-foreground">Calories</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-muted/20 rounded-md">
                        <span className="font-medium">{meal.protein}g</span>
                        <span className="text-xs text-muted-foreground">Protein</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-muted/20 rounded-md">
                        <span className="font-medium">{meal.carbs}g</span>
                        <span className="text-xs text-muted-foreground">Carbs</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          {/* Placeholder content for other days */}
          <TabsContent value="wednesday" className="pt-4">
            <div className="flex items-center justify-center h-40 bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Meal plan for Wednesday not yet created</p>
            </div>
          </TabsContent>
          <TabsContent value="thursday" className="pt-4">
            <div className="flex items-center justify-center h-40 bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Meal plan for Thursday not yet created</p>
            </div>
          </TabsContent>
          <TabsContent value="friday" className="pt-4">
            <div className="flex items-center justify-center h-40 bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Meal plan for Friday not yet created</p>
            </div>
          </TabsContent>
          <TabsContent value="saturday" className="pt-4">
            <div className="flex items-center justify-center h-40 bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Meal plan for Saturday not yet created</p>
            </div>
          </TabsContent>
          <TabsContent value="sunday" className="pt-4">
            <div className="flex items-center justify-center h-40 bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Meal plan for Sunday not yet created</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
