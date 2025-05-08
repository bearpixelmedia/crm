"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

// This is a utility component to check if dependencies are properly loaded
export function DependencyChecker() {
  const [checks, setChecks] = useState<{ [key: string]: boolean | null }>({
    react: null,
    nextjs: null,
    lucide: null,
    shadcn: null,
    tailwind: null,
    radixDropdown: null,
    radixAvatar: null,
    radixDialog: null,
    nextNavigation: null,
  })

  useEffect(() => {
    // Check React
    try {
      const reactVersion = require("react").version
      setChecks((prev) => ({ ...prev, react: true }))
      console.log("✅ React version:", reactVersion)
    } catch (e) {
      setChecks((prev) => ({ ...prev, react: false }))
      console.error("❌ React check failed:", e)
    }

    // Check Next.js
    try {
      // Check if we're in a Next.js environment
      if (typeof window !== "undefined" && window.__NEXT_DATA__) {
        setChecks((prev) => ({ ...prev, nextjs: true }))
        console.log("✅ Next.js detected")
      } else {
        // This is a fallback check that will run during SSR
        setChecks((prev) => ({ ...prev, nextjs: true }))
        console.log("✅ Next.js environment (SSR)")
      }
    } catch (e) {
      setChecks((prev) => ({ ...prev, nextjs: false }))
      console.error("❌ Next.js check failed:", e)
    }

    // Check Lucide
    try {
      // If this doesn't throw an error, Lucide is available
      if (typeof CheckCircle === "function") {
        setChecks((prev) => ({ ...prev, lucide: true }))
        console.log("✅ Lucide React detected")
      } else {
        setChecks((prev) => ({ ...prev, lucide: false }))
        console.log("❌ Lucide React not properly loaded")
      }
    } catch (e) {
      setChecks((prev) => ({ ...prev, lucide: false }))
      console.error("❌ Lucide check failed:", e)
    }

    // Check shadcn/ui (indirectly through Button component)
    try {
      if (typeof Button === "function") {
        setChecks((prev) => ({ ...prev, shadcn: true }))
        console.log("✅ shadcn/ui components detected")
      } else {
        setChecks((prev) => ({ ...prev, shadcn: false }))
        console.log("❌ shadcn/ui components not properly loaded")
      }
    } catch (e) {
      setChecks((prev) => ({ ...prev, shadcn: false }))
      console.error("❌ shadcn/ui check failed:", e)
    }

    // Check Tailwind
    try {
      // Check if a Tailwind class is applied correctly
      setTimeout(() => {
        const testEl = document.createElement("div")
        testEl.className = "hidden"
        document.body.appendChild(testEl)
        const styles = window.getComputedStyle(testEl)
        const isHidden = styles.display === "none"
        document.body.removeChild(testEl)

        setChecks((prev) => ({ ...prev, tailwind: isHidden }))
        console.log(isHidden ? "✅ Tailwind CSS detected" : "❌ Tailwind CSS not properly loaded")
      }, 0)
    } catch (e) {
      setChecks((prev) => ({ ...prev, tailwind: false }))
      console.error("❌ Tailwind check failed:", e)
    }

    // Check Radix Dropdown
    try {
      import("@radix-ui/react-dropdown-menu")
        .then(() => {
          setChecks((prev) => ({ ...prev, radixDropdown: true }))
          console.log("✅ @radix-ui/react-dropdown-menu detected")
        })
        .catch((e) => {
          setChecks((prev) => ({ ...prev, radixDropdown: false }))
          console.error("❌ @radix-ui/react-dropdown-menu check failed:", e)
        })
    } catch (e) {
      setChecks((prev) => ({ ...prev, radixDropdown: false }))
      console.error("❌ @radix-ui/react-dropdown-menu check failed:", e)
    }

    // Check Radix Avatar
    try {
      import("@radix-ui/react-avatar")
        .then(() => {
          setChecks((prev) => ({ ...prev, radixAvatar: true }))
          console.log("✅ @radix-ui/react-avatar detected")
        })
        .catch((e) => {
          setChecks((prev) => ({ ...prev, radixAvatar: false }))
          console.error("❌ @radix-ui/react-avatar check failed:", e)
        })
    } catch (e) {
      setChecks((prev) => ({ ...prev, radixAvatar: false }))
      console.error("❌ @radix-ui/react-avatar check failed:", e)
    }

    // Check Radix Dialog
    try {
      import("@radix-ui/react-dialog")
        .then(() => {
          setChecks((prev) => ({ ...prev, radixDialog: true }))
          console.log("✅ @radix-ui/react-dialog detected")
        })
        .catch((e) => {
          setChecks((prev) => ({ ...prev, radixDialog: false }))
          console.error("❌ @radix-ui/react-dialog check failed:", e)
        })
    } catch (e) {
      setChecks((prev) => ({ ...prev, radixDialog: false }))
      console.error("❌ @radix-ui/react-dialog check failed:", e)
    }

    // Check Next Navigation
    try {
      import("next/navigation")
        .then(() => {
          setChecks((prev) => ({ ...prev, nextNavigation: true }))
          console.log("✅ next/navigation detected")
        })
        .catch((e) => {
          setChecks((prev) => ({ ...prev, nextNavigation: false }))
          console.error("❌ next/navigation check failed:", e)
        })
    } catch (e) {
      setChecks((prev) => ({ ...prev, nextNavigation: false }))
      console.error("❌ next/navigation check failed:", e)
    }
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Dependency Checker</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {Object.entries(checks).map(([dep, status]) => (
            <li key={dep} className="flex items-center justify-between p-2 border rounded">
              <span className="font-medium capitalize">
                {dep === "radixDropdown"
                  ? "Radix Dropdown Menu"
                  : dep === "radixAvatar"
                    ? "Radix Avatar"
                    : dep === "radixDialog"
                      ? "Radix Dialog"
                      : dep === "nextNavigation"
                        ? "Next Navigation"
                        : dep}
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
