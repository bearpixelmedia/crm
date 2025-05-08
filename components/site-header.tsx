"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dumbbell } from "lucide-react"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  // Get pathname with a safe default value
  const currentPath = usePathname() || ""

  // Safe function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === path
    }
    return currentPath.startsWith(path)
  }

  // Navigation links configuration
  const mainNavLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/clients", label: "Clients" },
    { href: "/programs", label: "Programs" },
    { href: "/workouts", label: "Workouts" },
    { href: "/recipes", label: "Recipes" },
    { href: "/metrics", label: "Metrics" },
  ]

  const secondaryNavLinks = [
    { href: "/calendar", label: "Calendar" },
    { href: "/messages", label: "Messages" },
    { href: "/community", label: "Community" },
    { href: "/academy", label: "Academy" },
    { href: "/business", label: "Business" },
    { href: "/case-studies", label: "Case Studies" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Dumbbell className="h-6 w-6" />
            <span className="inline-block font-bold">FitTrack</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  isActive(link.href) ? "text-primary" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-2">
            {secondaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  isActive(link.href) ? "text-primary" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
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
