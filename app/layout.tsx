import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DataProvider } from "@/context/data-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "White Fox Studios CRM",
  description: "Client Relationship Management for White Fox Studios",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <DataProvider>{children}</DataProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
