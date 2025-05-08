import type { Client, Project, Agent } from "@/context/data-context"

// Mock client data
export const mockClients: Client[] = [
  {
    id: "CL001",
    name: "Acme Corporation",
    contact: "John Smith",
    email: "john@acmecorp.com",
    phone: "(555) 123-4567",
    status: "Active",
    value: "$15,000",
  },
  {
    id: "CL002",
    name: "TechNova Solutions",
    contact: "Sarah Johnson",
    email: "sarah@technova.com",
    phone: "(555) 234-5678",
    status: "Active",
    value: "$12,500",
  },
  {
    id: "CL003",
    name: "Global Enterprises",
    contact: "Michael Brown",
    email: "michael@globalent.com",
    phone: "(555) 345-6789",
    status: "Inactive",
    value: "$15,000",
  },
  {
    id: "CL004",
    name: "Bright Ideas Inc",
    contact: "Emily Davis",
    email: "emily@brightideas.com",
    phone: "(555) 456-7890",
    status: "Active",
    value: "$8,000",
  },
  {
    id: "CL005",
    name: "Summit Strategies",
    contact: "David Wilson",
    email: "david@summit.com",
    phone: "(555) 567-8901",
    status: "Active",
    value: "$20,000",
  },
]

// Mock project data
export const mockProjects: Project[] = [
  {
    id: "PRJ001",
    name: "Website Redesign",
    clientId: "CL001",
    type: "Web Design",
    status: "In Progress",
    startDate: "2023-06-15",
    deadline: "2023-09-30",
  },
  {
    id: "PRJ002",
    name: "SEO Campaign",
    clientId: "CL002",
    type: "SEO",
    status: "In Progress",
    startDate: "2023-07-01",
    deadline: "2023-10-15",
  },
  {
    id: "PRJ003",
    name: "Brand Identity Redesign",
    clientId: "CL003",
    type: "Branding",
    status: "Completed",
    startDate: "2023-05-10",
    deadline: "2023-08-20",
  },
  {
    id: "PRJ004",
    name: "Social Media Marketing",
    clientId: "CL004",
    type: "Marketing",
    status: "Not Started",
    startDate: "2023-08-01",
    deadline: "2023-11-30",
  },
  {
    id: "PRJ005",
    name: "Content Strategy",
    clientId: "CL005",
    type: "Content",
    status: "In Progress",
    startDate: "2023-06-01",
    deadline: "2023-09-15",
  },
  {
    id: "PRJ006",
    name: "PPC Campaign",
    clientId: "CL001",
    type: "Marketing",
    status: "Not Started",
    startDate: "2023-09-01",
    deadline: "2023-12-15",
  },
  {
    id: "PRJ007",
    name: "Website Maintenance",
    clientId: "CL002",
    type: "Web Design",
    status: "Ongoing",
    startDate: "2023-01-01",
    deadline: "2023-12-31",
  },
]

// Mock agent data
export const mockAgents: Agent[] = [
  {
    id: "AGT001",
    name: "Alice Johnson",
    email: "alice@whitefox.com",
    phone: "(555) 987-6543",
    specialties: ["SEO", "Content Marketing"],
    capacity: 40,
  },
  {
    id: "AGT002",
    name: "Bob Williams",
    email: "bob@whitefox.com",
    phone: "(555) 876-5432",
    specialties: ["Web Design", "UI/UX"],
    capacity: 35,
  },
  {
    id: "AGT003",
    name: "Carol Martinez",
    email: "carol@whitefox.com",
    phone: "(555) 765-4321",
    specialties: ["Social Media", "PPC"],
    capacity: 30,
  },
  {
    id: "AGT004",
    name: "David Thompson",
    email: "david@whitefox.com",
    phone: "(555) 654-3210",
    specialties: ["Content Writing", "SEO"],
    capacity: 40,
  },
  {
    id: "AGT005",
    name: "Eva Rodriguez",
    email: "eva@whitefox.com",
    phone: "(555) 543-2109",
    specialties: ["Branding", "Graphic Design"],
    capacity: 35,
  },
]

// Function to get mock data with relationships
export function getMockData() {
  // Add project references to clients
  const clientsWithProjects = mockClients.map((client) => ({
    ...client,
    projects: mockProjects.filter((project) => project.clientId === client.id),
  }))

  return {
    clients: clientsWithProjects,
    projects: mockProjects,
    agents: mockAgents,
  }
}
