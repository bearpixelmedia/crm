"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface Project {
  id: string
  name: string
  type: string
  status: string
  deadline: string
  budget: string
  clientIds: string[]
  // Legacy fields
  project: string
  client: string
  email: string
  phone: string
}

interface Client {
  id: string
  name: string
  email: string
  phone: string
  projectIds: string[]
}

interface DataContextType {
  projects: Project[]
  clients: Client[]
  loading: boolean
  error: string | null
  stats: {
    totalProjects: number
    totalClients: number
    multiClientProjects: number
    multiProjectClients: number
  }
  refreshData: () => Promise<void>
  getClientById: (id: string) => Client | undefined
  getProjectById: (id: string) => Project | undefined
  agents: any[]
  tasks: any[]
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalClients: 0,
    multiClientProjects: 0,
    multiProjectClients: 0
  })
  const [agents, setAgents] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])

  const getClientById = (id: string) => clients.find(c => c.id === id)
  const getProjectById = (id: string) => projects.find(p => p.id === id)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch("/api/google-sheets")
      if (!response.ok) throw new Error("Failed to fetch data")
      
      const data = await response.json()
      
      if (data.success) {
        setProjects(data.projects || [])
        setClients(data.clients || [])
        setStats(data.stats || {
          totalProjects: 0,
          totalClients: 0,
          multiClientProjects: 0,
          multiProjectClients: 0
        })
        setAgents(data.agents || [])
        setTasks(data.tasks || [])
      } else {
        throw new Error(data.error || "Unknown error")
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data")
      console.error("Data fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    await fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <DataContext.Provider value={{
      projects,
      clients,
      loading,
      error,
      stats,
      refreshData,
      getClientById,
      getProjectById,
      agents,
      tasks
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
