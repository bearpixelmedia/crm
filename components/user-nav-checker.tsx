"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { usePathname } from "next/navigation"

export function UserNavChecker() {
  const [checks, setChecks] = useState<{ [key: string]: boolean | null }>({
    usePathname: null,
    dropdownMenu: null,
    avatar: null,
    includes: null,
  })

  const pathname = usePathname()

  useEffect(() => {
    // Check usePathname
    try {
      if (typeof usePathname === "function") {
        setChecks((prev) => ({ ...prev, usePathname: true }))
        console.log("✅ usePathname function detected")

        // Try to use it
        try {
          console.log("Current pathname:", pathname)

          // Check if includes method exists
          if (pathname !== null && pathname !== undefined) {
            if (typeof pathname.includes === "function") {
              setChecks((prev) => ({ ...prev, includes: true }))
              console.log("✅ pathname.includes is a function")
            } else {
              setChecks((prev) => ({ ...prev, includes: false }))
              console.error("❌ pathname.includes is not a function")
            }
          } else {
            setChecks((prev) => ({ ...prev, includes: false }))
            console.error("❌ pathname is", pathname)
          }
        } catch (e) {
          console.error("❌ Error using usePathname:", e)
        }
      } else {
        setChecks((prev) => ({ ...prev, usePathname: false }))
        console.error("❌ usePathname is not a function")
      }
    } catch (e) {
      setChecks((prev) => ({ ...prev, usePathname: false }))
      console.error("❌ usePathname check failed:", e)
    }

    // Check DropdownMenu
    try {
      import("@radix-ui/react-dropdown-menu")
        .then((module) => {
          if (module.Root) {
            setChecks((prev) => ({ ...prev, dropdownMenu: true }))
            console.log("✅ DropdownMenu.Root detected")
          } else {
            setChecks((prev) => ({ ...prev, dropdownMenu: false }))
            console.error("❌ DropdownMenu.Root not found")
          }
        })
        .catch((e) => {
          setChecks((prev) => ({ ...prev, dropdownMenu: false }))
          console.error("❌ Failed to import DropdownMenu:", e)
        })
    } catch (e) {
      setChecks((prev) => ({ ...prev, dropdownMenu: false }))
      console.error("❌ DropdownMenu check failed:", e)
    }

    // Check Avatar
    try {
      import("@radix-ui/react-avatar")
        .then((module) => {
          if (module.Root) {
            setChecks((prev) => ({ ...prev, avatar: true }))
            console.log("✅ Avatar.Root detected")
          } else {
            setChecks((prev) => ({ ...prev, avatar: false }))
            console.error("❌ Avatar.Root not found")
          }
        })
        .catch((e) => {
          setChecks((prev) => ({ ...prev, avatar: false }))
          console.error("❌ Failed to import Avatar:", e)
        })
    } catch (e) {
      setChecks((prev) => ({ ...prev, avatar: false }))
      console.error("❌ Avatar check failed:", e)
    }
  }, [pathname])

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>UserNav Component Checker</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {Object.entries(checks).map(([check, status]) => (
            <li key={check} className="flex items-center justify-between p-2 border rounded">
              <span className="font-medium capitalize">
                {check === "usePathname"
                  ? "usePathname function"
                  : check === "dropdownMenu"
                    ? "DropdownMenu component"
                    : check === "avatar"
                      ? "Avatar component"
                      : check === "includes"
                        ? "pathname.includes method"
                        : check}
              </span>
              {status === null ? (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              ) : status ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
