"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      active: pathname === "/",
    },
    {
      href: "/clients",
      label: "Clients",
      active: pathname === "/clients" || pathname.startsWith("/clients/"),
    },
    {
      href: "/projects",
      label: "Projects",
      active: pathname === "/projects" || pathname.startsWith("/projects/"),
    },
    {
      href: "/tasks",
      label: "Tasks",
      active: pathname === "/tasks",
    },
    {
      href: "/invoices",
      label: "Invoices",
      active: pathname === "/invoices" || pathname.startsWith("/invoices/"),
    },
    {
      href: "/files",
      label: "Files",
      active: pathname === "/files" || pathname.startsWith("/files/"),
    },
    {
      href: "/reports",
      label: "Reports",
      active: pathname === "/reports" || pathname.startsWith("/reports/"),
    },
    {
      href: "/schedule",
      label: "Schedule",
      active: pathname === "/schedule",
    },
    {
      href: "/marketing",
      label: "Marketing",
      active: pathname === "/marketing",
    },
    {
      href: "/seo",
      label: "SEO",
      active: pathname === "/seo" || pathname.startsWith("/seo/"),
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
