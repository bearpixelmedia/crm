import type { Metadata } from "next"
import WorkoutsClientPage from "./WorkoutsClientPage"

export const metadata: Metadata = {
  title: "Workouts | FitTrack",
  description: "Manage your workout routines",
}

export default function WorkoutsPage() {
  return <WorkoutsClientPage />
}
