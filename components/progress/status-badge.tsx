import type { FeatureStatus } from "@/data/implementation-status"

interface StatusBadgeProps {
  status: FeatureStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  let bgColor = "bg-gray-100 text-gray-800"
  let statusText = "Not Started"

  if (status === "completed") {
    bgColor = "bg-green-100 text-green-800"
    statusText = "Completed"
  } else if (status === "in-progress") {
    bgColor = "bg-blue-100 text-blue-800"
    statusText = "In Progress"
  }

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>{statusText}</span>
}
