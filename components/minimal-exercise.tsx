"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface MinimalExerciseProps {
  name: string
  description?: string
  className?: string
}

export function MinimalExercise({ name, description = "Exercise description", className = "" }: MinimalExerciseProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className={`border rounded-md p-4 ${className}`}>
      <h3 className="font-medium text-lg">{name}</h3>

      {showDetails ? (
        <>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          <Button className="mt-3" variant="outline" size="sm" onClick={() => setShowDetails(false)}>
            Hide Details
          </Button>
        </>
      ) : (
        <Button className="mt-3" variant="outline" size="sm" onClick={() => setShowDetails(true)}>
          Show Details
        </Button>
      )}
    </div>
  )
}
