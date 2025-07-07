export type ReportType = "seo" | "marketing" | "client" | "project" | "financial" | "custom"

export type ReportFrequency = "once" | "daily" | "weekly" | "monthly" | "quarterly"

export type ReportStatus = "draft" | "scheduled" | "generated" | "delivered" | "failed"

export type ReportData = {
  [key: string]: any
}

export type Report = {
  id: string
  name: string
  type: ReportType
  description?: string
  createdAt: string
  createdBy: string
  frequency: ReportFrequency
  lastGenerated?: string
  nextGeneration?: string
  status: ReportStatus
  recipients: string[]
  clientId?: string
  projectId?: string
  templateId: string
  data?: ReportData
}

export type ReportTemplate = {
  id: string
  name: string
  type: ReportType
  description?: string
  sections: ReportSection[]
}

export type ReportSection = {
  id: string
  title: string
  type: "text" | "chart" | "table" | "metric" | "custom"
  content?: string
  dataSource?: string
  options?: any
}

// Legacy project type for backward compatibility
export interface LegacyProject {
  id: string
  project: string
  client: string
  type: string
  status: string
  deadline: string
  budget: string
  email: string
  phone: string
  description?: string
  progress: string
}

// New proper Project object
export interface Project {
  id: string
  name: string
  type: string
  status: string
  deadline: string
  budget: string
  description: string
  progress: string
  clientIds: string[] // Array of client IDs associated with this project
  createdAt: string
  updatedAt: string
  
  // Legacy fields for backward compatibility
  project: string
  client: string
  email: string
  phone: string
}

// New Client object
export interface Client {
  id: string
  name: string
  email: string
  phone: string
  projectIds: string[] // Array of project IDs associated with this client
  createdAt: string
  updatedAt: string
}

// API Response structure
export interface ProjectsApiResponse {
  projects: Project[]
  clients: Client[]
  relationships: {
    totalProjects: number
    totalClients: number
    projectsWithMultipleClients: number
    clientsWithMultipleProjects: number
  }
  message: string
}

// Helper types for relationships
export interface ProjectWithClients extends Project {
  clients: Client[]
}

export interface ClientWithProjects extends Client {
  projects: Project[]
}
