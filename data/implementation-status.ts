export type FeatureStatus = "not-started" | "in-progress" | "completed"

export interface Feature {
  name: string
  status: FeatureStatus
  completion: number
  notes?: string
  priority?: "low" | "medium" | "high"
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
        {
          name: "Real-time KPI Cards",
          status: "completed",
          completion: 100,
          notes: "All KPI cards implemented with real-time data",
        },
        {
          name: "Overview Charts",
          status: "in-progress",
          completion: 60,
          notes: "Basic charts implemented, need to add interactivity",
          priority: "medium",
        },
        {
          name: "Recent Activity Feed",
          status: "in-progress",
          completion: 40,
          notes: "Basic feed structure created, need to connect to real data",
          priority: "low",
        },
        {
          name: "Quick Actions",
          status: "not-started",
          completion: 0,
          priority: "high",
        },
      ],
    },
    {
      name: "Clients Section",
      features: [
        {
          name: "Client List View",
          status: "completed",
          completion: 100,
          notes: "Fully implemented with sorting and filtering",
        },
        {
          name: "Client Detail View",
          status: "in-progress",
          completion: 75,
          notes: "Basic details implemented, need to add communication history",
          priority: "high",
        },
        {
          name: "Client Creation/Editing",
          status: "in-progress",
          completion: 50,
          notes: "Form created, need to implement validation and submission",
          priority: "medium",
        },
        {
          name: "Client Analytics",
          status: "not-started",
          completion: 0,
          priority: "low",
        },
      ],
    },
    {
      name: "Projects Section",
      features: [
        {
          name: "Project List View",
          status: "completed",
          completion: 100,
          notes: "Fully implemented with sorting and filtering",
        },
        {
          name: "Project Detail View",
          status: "in-progress",
          completion: 80,
          notes: "Most details implemented, need to add timeline view",
          priority: "medium",
        },
        {
          name: "Project Creation/Editing",
          status: "in-progress",
          completion: 30,
          notes: "Basic form created, need to add team assignment",
          priority: "high",
        },
        {
          name: "Task Management",
          status: "not-started",
          completion: 0,
          priority: "medium",
        },
      ],
    },
    {
      name: "SEO Section",
      features: [
        {
          name: "SEO Dashboard",
          status: "completed",
          completion: 100,
          notes: "All metrics and visualizations implemented",
        },
        {
          name: "SEO Workflow Management",
          status: "completed",
          completion: 100,
          notes: "All workflow steps and tracking implemented",
        },
        {
          name: "SEO Task Management",
          status: "in-progress",
          completion: 60,
          notes: "Basic task tracking implemented, need to add assignments",
          priority: "high",
        },
        {
          name: "Competitor Analysis",
          status: "in-progress",
          completion: 70,
          notes: "Basic analysis implemented, need to add comparison features",
          priority: "medium",
        },
        {
          name: "SEO Reporting",
          status: "not-started",
          completion: 0,
          priority: "low",
        },
      ],
    },
    {
      name: "Marketing Section",
      features: [
        {
          name: "Campaign Management",
          status: "not-started",
          completion: 0,
          priority: "medium",
        },
        {
          name: "Content Calendar",
          status: "not-started",
          completion: 0,
          priority: "low",
        },
        {
          name: "Social Media Management",
          status: "not-started",
          completion: 0,
          priority: "low",
        },
        {
          name: "Email Marketing",
          status: "not-started",
          completion: 0,
          priority: "medium",
        },
      ],
    },
    {
      name: "Agent/Team Management",
      features: [
        {
          name: "Agent Directory",
          status: "in-progress",
          completion: 50,
          notes: "Basic directory implemented, need to add profiles",
          priority: "medium",
        },
        {
          name: "Workload Management",
          status: "in-progress",
          completion: 40,
          notes: "Basic workload tracking implemented, need to add capacity planning",
          priority: "high",
        },
        {
          name: "Schedule Management",
          status: "not-started",
          completion: 0,
          priority: "medium",
        },
        {
          name: "Performance Tracking",
          status: "not-started",
          completion: 0,
          priority: "low",
        },
      ],
    },
    {
      name: "Google Sheets Integration",
      features: [
        {
          name: "Read Operations",
          status: "completed",
          completion: 100,
          notes: "Fully implemented with error handling",
        },
        {
          name: "Write Operations",
          status: "not-started",
          completion: 0,
          priority: "high",
        },
        {
          name: "Data Synchronization",
          status: "in-progress",
          completion: 50,
          notes: "Basic sync implemented, need to add conflict resolution",
          priority: "medium",
        },
        {
          name: "Error Handling",
          status: "in-progress",
          completion: 30,
          notes: "Basic error handling implemented, need to add retry logic",
          priority: "high",
        },
      ],
    },
    {
      name: "Authentication & Security",
      features: [
        {
          name: "User Authentication",
          status: "not-started",
          completion: 0,
          priority: "high",
        },
        {
          name: "Role-based Access Control",
          status: "not-started",
          completion: 0,
          priority: "medium",
        },
        {
          name: "Security Auditing",
          status: "not-started",
          completion: 0,
          priority: "low",
        },
      ],
    },
    {
      name: "Client Portal",
      features: [
        {
          name: "Client Dashboard",
          status: "in-progress",
          completion: 30,
          notes: "Basic dashboard structure created, need to add content",
          priority: "medium",
        },
        {
          name: "SEO Performance Dashboard",
          status: "completed",
          completion: 100,
          notes: "All metrics and visualizations implemented",
        },
        {
          name: "Project Tracking",
          status: "not-started",
          completion: 0,
          priority: "high",
        },
        {
          name: "Document Management",
          status: "not-started",
          completion: 0,
          priority: "low",
        },
        {
          name: "Communication Center",
          status: "not-started",
          completion: 0,
          priority: "medium",
        },
      ],
    },
  ],
}
