"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getMockData } from "@/lib/mock-data"
import { shouldUseMockData } from "@/lib/environment"

// Define types for our data
export type Client = {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  status: string
  value: string
  projects?: Project[]
}

export type Project = {
  id: string
  name: string
  clientId: string
  type: string
  status: string
  startDate: string
  deadline: string
}

export type Agent = {
  id: string
  name: string
  email: string
  phone: string
  specialties: string[]
  capacity: number
}

type DataContextType = {
  clients: Client[]
  projects: Project[]
  agents: Agent[]
  isLoading: boolean
  error: string | null
  refreshData: () => Promise<void>
  usingMockData: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)

  // Update the loadData function to use the API route
  const loadData = async () => {
    setIsLoading(true)
    setError(null)

    // Check if we should use mock data
    const useMock = shouldUseMockData()

    if (useMock) {
      // Use mock data
      console.log("Using mock data due to environment settings")
      const mockData = getMockData()
      setClients(mockData.clients)
      setProjects(mockData.projects)
      setAgents(mockData.agents)
      setUsingMockData(true)
      setIsLoading(false)
      return
    }

    try {
      // Fetch data from our API route
      const response = await fetch("/api/google-sheets?type=all")

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch data from API")
      }

      const data = await response.json()

      // Process the data to establish relationships
      const clientsWithProjects = data.clients.map((client: Client) => ({
        ...client,
        projects: data.projects.filter((project: Project) => project.clientId === client.id),
      }))

      setClients(clientsWithProjects)
      setProjects(data.projects)
      setAgents(data.agents)
      setUsingMockData(false)
    } catch (err) {
      console.error("Error loading data from API:", err)
      setError("Failed to load data from API. Using fallback data instead.")

      // Fall back to mock data on error
      const mockData = getMockData()
      setClients(mockData.clients)
      setProjects(mockData.projects)
      setAgents(mockData.agents)
      setUsingMockData(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Load data on initial render
  useEffect(() => {
    loadData()
  }, [])

  const refreshData = async () => {
    await loadData()
  }

  return (
    <DataContext.Provider
      value={{
        clients,
        projects,
        agents,
        isLoading,
        error,
        refreshData,
        usingMockData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
