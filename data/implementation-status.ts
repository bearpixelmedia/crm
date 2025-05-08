export type FeatureStatus = "not-started" | "in-progress" | "completed"

export interface Feature {
  name: string
  status: FeatureStatus
  completion: number
  notes?: string
}

export interface Section {
  name: string
  features: Feature[]
}

export interface ImplementationData {
  sections: Section[]
}

export const implementationData: ImplementationData = {
  sections: [
    {
      name: "Dashboard / Overview",
      features: [
        { name: "Real-time KPI Cards", status: "completed", completion: 100 },
        { name: "Overview Charts", status: "completed", completion: 100 },
        { name: "Recent Activity Feed", status: "in-progress", completion: 50 },
        { name: "Quick Actions", status: "not-started", completion: 0 },
      ],
    },
    {
      name: "Clients Section",
      features: [
        { name: "Client List View", status: "completed", completion: 100 },
        { name: "Client Detail View", status: "in-progress", completion: 75 },
        { name: "Client Creation/Editing", status: "in-progress", completion: 50 },
        { name: "Client Analytics", status: "not-started", completion: 0 },
      ],
    },
    {
      name: "Projects Section",
      features: [
        { name: "Project List View", status: "completed", completion: 100 },
        { name: "Project Detail View", status: "in-progress", completion: 80 },
        { name: "Project Creation/Editing", status: "in-progress", completion: 30 },
        { name: "Task Management", status: "not-started", completion: 0 },
      ],
    },
    {
      name: "SEO Section",
      features: [
        { name: "SEO Dashboard", status: "completed", completion: 100 },
        { name: "SEO Workflow Management", status: "completed", completion: 100 },
        { name: "SEO Task Management", status: "in-progress", completion: 60 },
        { name: "Competitor Analysis", status: "in-progress", completion: 70 },
        { name: "SEO Reporting", status: "not-started", completion: 0 },
      ],
    },
    {
      name: "Google Sheets Integration",
      features: [
        { name: "Read Operations", status: "completed", completion: 100 },
        { name: "Write Operations", status: "not-started", completion: 0 },
        { name: "Data Synchronization", status: "in-progress", completion: 50 },
        { name: "Error Handling", status: "not-started", completion: 0 },
      ],
    },
  ],
}
