"use client"

import { Button } from "@/components/ui/button"
import { useProgress } from "@/context/progress-context"

export function ProgressButton() {
  const { openProgressModal } = useProgress()

  return (
    <Button variant="outline" size="sm" onClick={openProgressModal}>
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
        <path d="M12 20v-6M6 20V10M18 20V4" />
      </svg>
      Progress
    </Button>
  )
}
