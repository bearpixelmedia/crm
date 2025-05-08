"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/clients"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/clients" || pathname.startsWith("/clients/") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Clients
      </Link>
      <Link
        href="/projects"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/projects" || pathname.startsWith("/projects/") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Projects
      </Link>
      <Link
        href="/seo"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/seo" || pathname.startsWith("/seo/") ? "text-primary" : "text-muted-foreground",
        )}
      >
        SEO
      </Link>
      <Link
        href="/marketing"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/marketing" || pathname.startsWith("/marketing/") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Marketing
      </Link>
    </nav>
  )
}
