"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { ClientStats } from "@/components/client-stats"
import { ClientDetail } from "@/components/client-detail"
import { useData } from "@/context/data-context"
import { Skeleton } from "@/components/ui/skeleton"

export default function ClientsPage() {
  const { clients, isLoading, error, refreshData } = useData()
  const [selectedClient, setSelectedClient] = useState(null)

  const handleViewClient = (clientId) => {
    const client = clients.find((c) => c.id === clientId)
    setSelectedClient(client)
  }

  const handleBackToClients = () => {
    setSelectedClient(null)
  }

  const handleNewProject = (projectData) => {
    // In a real app, you would save the project to your database
    console.log("New project created:", projectData)
    // Then update the client's projects list
    refreshData()
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading client data</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <Button size="sm" onClick={refreshData}>
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between space-y-2">
              <Skeleton className="h-8 w-48" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
            </div>
            <Skeleton className="h-[500px] w-full" />
          </div>
        ) : selectedClient ? (
          <ClientDetail client={selectedClient} onBack={handleBackToClients} onNewProject={handleNewProject} />
        ) : (
          <>
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline">Export</Button>
                <Button>Add New Client</Button>
              </div>
            </div>
            <ClientStats onViewClient={handleViewClient} clients={clients} />
          </>
        )}
      </div>
    </div>
  )
}
