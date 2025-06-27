"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

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
  type: "Website Build" | "Maintenance" | "SEO" | "Marketing" | "A la carte" | "Other"
  status: "In Progress" | "Completed" | "Ongoing" | "Canceled" | "Not Started"
  startDate: string
  deadline: string
  description?: string
  budget?: string
}

export type Agent = {
  id: string
  name: string
  email: string
  phone: string
  specialties: string[]
  capacity: number
  currentWorkload?: number
}

export type Task = {
  id: string
  title: string
  description: string
  projectId: string
  assignedAgentId: string
  status: "To Do" | "In Progress" | "Review" | "Completed" | "Blocked"
  priority: "Low" | "Medium" | "High" | "Critical"
  dueDate: string
  estimatedHours?: number
  actualHours?: number
  createdDate: string
}

type DataContextType = {
  clients: Client[]
  projects: Project[]
  agents: Agent[]
  tasks: Task[]
  isLoading: boolean
  error: string | null
  refreshData: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Update the loadData function to use the API route
  const loadData = async () => {
    setIsLoading(true)
    setError(null)

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
      setTasks(data.tasks || [])
    } catch (err) {
      console.error("Error loading data from API:", err)
      setError("Failed to load data from API.")
      setClients([])
      setProjects([])
      setAgents([])
      setTasks([])
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
        tasks,
        isLoading,
        error,
        refreshData,
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
