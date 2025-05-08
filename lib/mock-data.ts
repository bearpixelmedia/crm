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

export function getMockData() {
  const clients: Client[] = [
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
  ]

  const projects: Project[] = [
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
  ]

  const agents: Agent[] = [
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
  ]

  // Add project references to clients
  const clientsWithProjects = clients.map((client) => ({
    ...client,
    projects: projects.filter((project) => project.clientId === client.id),
  }))

  return {
    clients: clientsWithProjects,
    projects,
    agents,
  }
}
