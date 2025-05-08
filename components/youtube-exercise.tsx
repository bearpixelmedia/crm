"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface YouTubeExerciseProps {
  exerciseName: string
  videoId: string
  description?: string
}

export function YouTubeExercise({ exerciseName, videoId, description }: YouTubeExerciseProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{exerciseName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-md">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`${exerciseName} exercise video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-0"
          ></iframe>
        </div>
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}
