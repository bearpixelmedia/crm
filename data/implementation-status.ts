export type FeatureStatus = "completed" | "in-progress" | "not-started"

export interface Feature {
  id: string
  name: string
  description: string
  status: FeatureStatus
  completion: number
  notes?: string
}

export interface Section {
  id: string
  name: string
  features: Feature[]
}

export const implementationData: { sections: Section[] } = {
  sections: [
    {
      id: "core",
      name: "Core CRM Features",
      features: [
        {
          id: "dashboard",
          name: "Dashboard",
          description: "Main dashboard with overview of clients, projects, and tasks",
          status: "completed",
          completion: 100,
        },
        {
          id: "client-management",
          name: "Client Management",
          description: "Add, edit, and manage client information",
          status: "completed",
          completion: 100,
        },
        {
          id: "project-tracking",
          name: "Project Tracking",
          description: "Track project status, deadlines, and details",
          status: "completed",
          completion: 100,
        },
        {
          id: "task-management",
          name: "Task Management",
          description: "Create and assign tasks with due dates",
          status: "completed",
          completion: 100,
        },
        {
          id: "user-management",
          name: "User Management",
          description: "Manage team members and permissions",
          status: "in-progress",
          completion: 75,
        },
        {
          id: "authentication",
          name: "Authentication",
          description: "Secure login and user authentication",
          status: "completed",
          completion: 100,
        },
      ],
    },
    {
      id: "seo",
      name: "SEO Services",
      features: [
        {
          id: "seo-workflow",
          name: "SEO Workflow",
          description: "Structured workflow for SEO services",
          status: "in-progress",
          completion: 60,
        },
        {
          id: "seo-dashboard",
          name: "SEO Dashboard",
          description: "Client-facing SEO performance dashboard",
          status: "in-progress",
          completion: 80,
        },
        {
          id: "seo-tasks",
          name: "SEO Task Management",
          description: "Specialized task management for SEO activities",
          status: "not-started",
          completion: 0,
        },
        {
          id: "competitor-analysis",
          name: "Competitor Analysis",
          description: "Track and analyze competitor SEO performance",
          status: "not-started",
          completion: 0,
        },
        {
          id: "seo-scheduling",
          name: "SEO Scheduling",
          description: "Schedule and assign SEO tasks to team members",
          status: "not-started",
          completion: 0,
        },
      ],
    },
    {
      id: "marketing",
      name: "Marketing Features",
      features: [
        {
          id: "campaign-tracking",
          name: "Campaign Tracking",
          description: "Track marketing campaign performance",
          status: "not-started",
          completion: 0,
        },
        {
          id: "analytics-integration",
          name: "Analytics Integration",
          description: "Integration with analytics platforms",
          status: "not-started",
          completion: 0,
        },
        {
          id: "client-analytics",
          name: "Client Analytics",
          description: "Detailed analytics for each client",
          status: "not-started",
          completion: 0,
        },
      ],
    },
    {
      id: "scheduling",
      name: "Scheduling System",
      features: [
        {
          id: "calendar",
          name: "Calendar Integration",
          description: "Integrated calendar for scheduling",
          status: "completed",
          completion: 100,
        },
        {
          id: "resource-allocation",
          name: "Resource Allocation",
          description: "Allocate team members to projects and tasks",
          status: "in-progress",
          completion: 50,
        },
      ],
    },
    {
      id: "data-integration",
      name: "Data Integration",
      features: [
        {
          id: "google-sheets",
          name: "Google Sheets Integration",
          description: "Import and export data with Google Sheets",
          status: "completed",
          completion: 100,
        },
        {
          id: "data-import",
          name: "Data Import/Export",
          description: "Import and export data in various formats",
          status: "not-started",
          completion: 0,
        },
      ],
    },
    {
      id: "financial",
      name: "Financial Management",
      features: [
        {
          id: "invoicing",
          name: "Invoicing System",
          description: "Create, send, and track invoices",
          status: "not-started",
          completion: 0,
        },
        {
          id: "payment-tracking",
          name: "Payment Tracking",
          description: "Track client payments and outstanding balances",
          status: "not-started",
          completion: 0,
        },
      ],
    },
    {
      id: "document",
      name: "Document Management",
      features: [
        {
          id: "file-storage",
          name: "File Storage",
          description: "Store and organize client and project files",
          status: "completed",
          completion: 100,
        },
        {
          id: "document-sharing",
          name: "Document Sharing",
          description: "Share documents with clients and team members",
          status: "not-started",
          completion: 0,
        },
      ],
    },
    {
      id: "reporting",
      name: "Reporting",
      features: [
        {
          id: "automated-reports",
          name: "Automated Reporting",
          description: "Generate automated reports for clients and projects",
          status: "in-progress",
          completion: 60,
        },
        {
          id: "custom-reports",
          name: "Custom Reports",
          description: "Create custom reports based on specific metrics",
          status: "not-started",
          completion: 0,
        },
      ],
    },
    {
      id: "communication",
      name: "Communication",
      features: [
        {
          id: "notifications",
          name: "Notification System",
          description: "In-app and email notifications for important events",
          status: "completed",
          completion: 100,
        },
        {
          id: "client-portal",
          name: "Client Portal",
          description: "Secure portal for clients to view their projects and reports",
          status: "completed",
          completion: 100,
        },
      ],
    },
  ],
}
