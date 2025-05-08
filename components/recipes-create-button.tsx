"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function RecipesCreateButton() {
  return (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      New Recipe
    </Button>
  )
}
