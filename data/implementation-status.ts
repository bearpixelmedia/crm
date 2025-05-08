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

export const implementationData = {
  sections: [
    {
      name: "Dashboard / Overview",
      features: [
        {
          name: "Real-time KPI Cards",
          status: "in-progress",
          completion: 60,
          notes: "Basic metrics implemented, need to add period comparison",
        },
        { name: "Overview Charts", status: "not-started", completion: 0 },
        { name: "Recent Activity Feed", status: "completed", completion: 100 },
        { name: "Quick Actions", status: "in-progress", completion: 40 },
      ],
    },
    {
      name: "Clients Section",
      features: [
        { name: "Client List View", status: "completed", completion: 100 },
        {
          name: "Client Detail View",
          status: "in-progress",
          completion: 75,
          notes: "Need to add communication history",
        },
        { name: "Client Creation/Editing", status: "in-progress", completion: 50 },
        { name: "Client Analytics", status: "not-started", completion: 0 },
      ],
    },
    {
      name: "Projects Section",
      features: [
        { name: "Project List View", status: "completed", completion: 100 },
        { name: "Project Detail View", status: "in-progress", completion: 80 },
        {
          name: "Project Creation/Editing",
          status: "in-progress",
          completion: 30,
          notes: "Basic form created, need to add team assignment",
        },
        { name: "Task Management", status: "not-started", completion: 0 },
      ],
    },
    {
      name: "SEO Section",
      features: [
        { name: "SEO Dashboard", status: "in-progress", completion: 70 },
        { name: "SEO Workflow Management", status: "in-progress", completion: 60 },
        { name: "SEO Task Management", status: "completed", completion: 100 },
        { name: "Competitor Analysis", status: "completed", completion: 100 },
        { name: "SEO Reporting", status: "not-started", completion: 0 },
      ],
    },
    {
      name: "Marketing Section",
      features: [
        { name: "Campaign Management", status: "not-started", completion: 0 },
        { name: "Content Calendar", status: "not-started", completion: 0 },
        { name: "Social Media Management", status: "not-started", completion: 0 },
        { name: "Email Marketing", status: "not-started", completion: 0 },
      ],
    },
    {
      name: "Agent/Team Management",
      features: [
        { name: "Agent Directory", status: "in-progress", completion: 50 },
        { name: "Workload Management", status: "in-progress", completion: 40 },
        { name: "Schedule Management", status: "not-started", completion: 0 },
        { name: "Performance Tracking", status: "not-started", completion: 0 },
      ],
    },
    {
      name: "Reports/Analytics",
      features: [
        { name: "Standard Reports", status: "not-started", completion: 0 },
        { name: "Custom Report Builder", status: "not-started", completion: 0 },
        { name: "Scheduled Reports", status: "not-started", completion: 0 },
        { name: "Executive Dashboard", status: "not-started", completion: 0 },
      ],
    },
    {
      name: "Client Portal",
      features: [
        { name: "Client Dashboard", status: "in-progress", completion: 30 },
        { name: "SEO Performance Dashboard", status: "completed", completion: 100 },
        { name: "Project Tracking", status: "not-started", completion: 0 },
        { name: "Document Management", status: "not-started", completion: 0 },
        { name: "Communication Center", status: "not-started", completion: 0 },
      ],
    },
    {
      name: "Authentication & Security",
      features: [
        { name: "Authentication System", status: "not-started", completion: 0 },
        { name: "Role-based Access Control", status: "not-started", completion: 0 },
        { name: "Security Features", status: "not-started", completion: 0 },
      ],
    },
    {
      name: "Data Management",
      features: [
        { name: "Google Sheets Integration (Read)", status: "completed", completion: 100 },
        { name: "Google Sheets Integration (Write)", status: "not-started", completion: 0 },
        { name: "Data Import/Export", status: "not-started", completion: 0 },
        { name: "Data Validation", status: "in-progress", completion: 30 },
      ],
    },
  ],
}
