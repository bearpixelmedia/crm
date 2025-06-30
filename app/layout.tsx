import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { DataProvider } from "@/context/data-context"
import { AuthProvider } from "@/context/auth-context"

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <DataProvider>
            {children}
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
