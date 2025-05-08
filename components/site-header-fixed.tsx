"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dumbbell } from "lucide-react"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

// Import the fixed UserNav component
import { UserNav } from "@/components/user-nav-fixed"

export function SiteHeader() {
  // Get the pathname, but ensure it's not undefined
  const pathname = usePathname() || ""

  // Helper function to check if a path starts with a prefix safely
  const pathStartsWith = (prefix: string) => {
    return pathname ? pathname.startsWith(prefix) : false
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Dumbbell className="h-6 w-6" />
            <span className="inline-block font-bold">FitTrack</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground",
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/clients"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathStartsWith("/clients") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Clients
            </Link>
            <Link
              href="/programs"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathStartsWith("/programs") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Programs
            </Link>
            <Link
              href="/workouts"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathStartsWith("/workouts") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Workouts
            </Link>
            <Link
              href="/recipes"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathStartsWith("/recipes") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Recipes
            </Link>
            <Link
              href="/metrics"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathStartsWith("/metrics") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Metrics
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              href="/calendar"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathStartsWith("/calendar") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Calendar
            </Link>
            <Link
              href="/messages"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathStartsWith("/messages") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Messages
            </Link>
            <Link
              href="/community"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathStartsWith("/community") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Community
            </Link>
            <Link
              href="/academy"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathStartsWith("/academy") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Academy
            </Link>
            <Link
              href="/business"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathStartsWith("/business") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Business
            </Link>
            <Link
              href="/case-studies"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathStartsWith("/case-studies") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Case Studies
            </Link>
            <ModeToggle />
            <UserNav />
          </nav>
          <Button variant="outline" className="hidden md:flex">
            Try Pro Free
          </Button>
        </div>
      </div>
    </header>
  )
}
