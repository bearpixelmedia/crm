"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { fetchClientData, fetchProjectData, fetchAgentData } from "@/lib/google-sheets"
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

  // Update the loadData function to handle different environments
  const loadData = async () => {
    setIsLoading(true)
    setError(null)

    // Check if we should use mock data
    const useMock = shouldUseMockData()

    if (useMock) {
      // Use mock data
      console.log("Using mock data due to missing environment variables or preview environment")
      const mockData = getMockData()
      setClients(mockData.clients)
      setProjects(mockData.projects)
      setAgents(mockData.agents)
      setUsingMockData(true)
      setIsLoading(false)
      return
    }

    try {
      // Fetch all data in parallel from Google Sheets
      const [clientData, projectData, agentData] = await Promise.all([
        fetchClientData().catch((err) => {
          console.error("Error fetching client data:", err)
          throw err
        }),
        fetchProjectData().catch((err) => {
          console.error("Error fetching project data:", err)
          throw err
        }),
        fetchAgentData().catch((err) => {
          console.error("Error fetching agent data:", err)
          throw err
        }),
      ])

      // Process the data to establish relationships
      const clientsWithProjects = clientData.map((client) => ({
        ...client,
        projects: projectData.filter((project) => project.clientId === client.id),
      }))

      setClients(clientsWithProjects)
      setProjects(projectData)
      setAgents(agentData)
      setUsingMockData(false)
    } catch (err) {
      console.error("Error loading data from Google Sheets:", err)
      setError("Failed to load data from Google Sheets. Using fallback data instead.")

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
