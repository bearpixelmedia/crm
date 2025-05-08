"use client"

import { Button } from "@/components/ui/button"
import { useProgress } from "@/context/progress-context"

export function ProgressButton() {
  const { openProgressModal } = useProgress()

  return (
    <Button variant="outline" onClick={openProgressModal} className="ml-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2"
      >
        <path d="M12 20v-6" />
        <path d="M12 14l-2-2 2-2 2 2-2 2Z" />
        <path d="M12 4v4" />
        <path d="M4 12h4" />
        <path d="M16 12h4" />
      </svg>
      Progress
    </Button>
  )
}
