"use client"

import { useState, useRef } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface YouTubePlayerProps {
  videoId: string
  title?: string
  className?: string
  autoPlay?: boolean
  onError?: () => void
  onReady?: () => void
}

export function YouTubePlayer({
  videoId,
  title,
  className = "",
  autoPlay = false,
  onError,
  onReady,
}: YouTubePlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false)
    onReady?.()
  }

  // Handle iframe error
  const handleIframeError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  // Retry loading the video
  const handleRetry = () => {
    setHasError(false)
    setIsLoading(true)
    setRetryCount(retryCount + 1)
  }

  return (
    <div className={`relative overflow-hidden rounded-md bg-black ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 p-4 text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
          <p className="text-white font-medium">Video unavailable</p>
          <p className="text-gray-300 text-sm mt-1">This YouTube video could not be loaded</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 text-white border-white hover:bg-white/20"
            onClick={handleRetry}
          >
            Retry
          </Button>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline mt-2"
          >
            Open on YouTube
          </a>
        </div>
      )}

      <iframe
        key={`youtube-${videoId}-${retryCount}`}
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&rel=0&modestbranding=1`}
        title={title || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full aspect-video"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    </div>
  )
}
