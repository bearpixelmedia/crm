"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Heart, Plus, Utensils } from "lucide-react"

export function RecipesList() {
  const [recipes] = useState([
    {
      id: "1",
      name: "Protein-Packed Breakfast Bowl",
      description: "A nutritious breakfast bowl with eggs, avocado, and quinoa.",
      image: "/placeholder.svg?height=200&width=300",
      prepTime: "15 min",
      calories: 450,
      protein: 30,
      tags: ["Breakfast", "High Protein"],
      favorite: true,
    },
    {
      id: "2",
      name: "Grilled Chicken Salad",
      description: "Fresh salad with grilled chicken, mixed greens, and light dressing.",
      image: "/placeholder.svg?height=200&width=300",
      prepTime: "20 min",
      calories: 380,
      protein: 35,
      tags: ["Lunch", "Low Carb"],
      favorite: false,
    },
    {
      id: "3",
      name: "Salmon with Roasted Vegetables",
      description: "Baked salmon fillet with a variety of roasted seasonal vegetables.",
      image: "/placeholder.svg?height=200&width=300",
      prepTime: "30 min",
      calories: 520,
      protein: 40,
      tags: ["Dinner", "Omega-3"],
      favorite: true,
    },
    {
      id: "4",
      name: "Protein Smoothie",
      description: "Quick and easy protein smoothie with berries, banana, and protein powder.",
      image: "/placeholder.svg?height=200&width=300",
      prepTime: "5 min",
      calories: 250,
      protein: 25,
      tags: ["Snack", "Quick"],
      favorite: false,
    },
    {
      id: "5",
      name: "Turkey and Avocado Wrap",
      description: "Whole grain wrap with turkey, avocado, and fresh vegetables.",
      image: "/placeholder.svg?height=200&width=300",
      prepTime: "10 min",
      calories: 420,
      protein: 28,
      tags: ["Lunch", "Meal Prep"],
      favorite: false,
    },
    {
      id: "6",
      name: "Greek Yogurt Parfait",
      description: "Layered Greek yogurt with berries, granola, and a drizzle of honey.",
      image: "/placeholder.svg?height=200&width=300",
      prepTime: "5 min",
      calories: 280,
      protein: 18,
      tags: ["Breakfast", "Snack"],
      favorite: true,
    },
  ])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {recipes.map((recipe) => (
        <Card key={recipe.id} className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img src={recipe.image || "/placeholder.svg"} alt={recipe.name} className="object-cover w-full h-full" />
          </div>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{recipe.name}</CardTitle>
              <Button variant="ghost" size="icon" className={recipe.favorite ? "text-red-500" : ""}>
                <Heart className="h-5 w-5" fill={recipe.favorite ? "currentColor" : "none"} />
                <span className="sr-only">Favorite</span>
              </Button>
            </div>
            <CardDescription>{recipe.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{recipe.prepTime}</span>
              </div>
              <div className="flex items-center">
                <Utensils className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{recipe.calories} cal</span>
              </div>
              <div>
                <span className="font-medium">{recipe.protein}g</span> protein
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button variant="outline">View Recipe</Button>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add to meal plan</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
