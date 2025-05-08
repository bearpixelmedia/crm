import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecipesList } from "@/components/recipes-list"
import { RecipesCreateButton } from "@/components/recipes-create-button"

export const metadata: Metadata = {
  title: "Recipes | FitTrack",
  description: "Discover and save healthy recipes",
}

export default function RecipesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Recipes" text="Discover and save healthy recipes for your meal plan.">
        <RecipesCreateButton />
      </DashboardHeader>
      <RecipesList />
    </DashboardShell>
  )
}
