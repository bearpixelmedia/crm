"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Plus, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const projects = [
  {
    id: "PRJ001",
    name: "Website Redesign",
    client: "Acme Corporation",
    clientId: "CL001",
    startDate: "2023-06-15",
    deadline: "2023-09-30",
    status: "In Progress",
    progress: 65,
    type: "Web Design",
    budget: "$12,000",
    team: ["Alex", "Maria", "John"],
  },
  {
    id: "PRJ002",
    name: "SEO Campaign",
    client: "TechNova Solutions",
    clientId: "CL002",
    startDate: "2023-07-01",
    deadline: "2023-12-31",
    status: "In Progress",
    progress: 40,
    type: "SEO",
    budget: "$8,500",
    team: ["Sarah", "David"],
  },
  {
    id: "PRJ003",
    name: "Brand Identity Redesign",
    client: "Global Enterprises",
    clientId: "CL003",
    startDate: "2023-05-10",
    deadline: "2023-08-15",
    status: "Completed",
    progress: 100,
    type: "Branding",
    budget: "$15,000",
    team: ["Michael", "Jessica", "Robert"],
  },
  {
    id: "PRJ004",
    name: "Social Media Campaign",
    client: "Bright Future Inc",
    clientId: "CL004",
    startDate: "2023-08-01",
    deadline: "2024-01-31",
    status: "In Progress",
    progress: 25,
    type: "Marketing",
    budget: "$9,000",
    team: ["Emma", "Thomas"],
  },
  {
    id: "PRJ005",
    name: "E-commerce Website",
    client: "Stellar Innovations",
    clientId: "CL005",
    startDate: "2023-07-15",
    deadline: "2023-11-30",
    status: "On Hold",
    progress: 30,
    type: "Web Development",
    budget: "$18,000",
    team: ["Daniel", "Olivia", "William"],
  },
]

export function ProjectStats() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [clientFilter, setClientFilter] = useState("All")

  const filteredProjects = projects.filter(
    (project) =>
      (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || project.status === statusFilter) &&
      (clientFilter === "All" || project.clientId === clientFilter),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Clients</SelectItem>
              <SelectItem value="CL001">Acme Corporation</SelectItem>
              <SelectItem value="CL002">TechNova Solutions</SelectItem>
              <SelectItem value="CL003">Global Enterprises</SelectItem>
              <SelectItem value="CL004">Bright Future Inc</SelectItem>
              <SelectItem value="CL005">Stellar Innovations</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+3 this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">67% of total projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">28% of total projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Hold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">5% of total projects</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project List</CardTitle>
          <CardDescription>Manage your projects and track their progress.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.id}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.type}</TableCell>
                  <TableCell>{project.deadline}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === "Completed"
                          ? "default"
                          : project.status === "In Progress"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="h-2 w-[60px]" />
                      <span className="text-xs">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{project.budget}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit project</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Assign team</DropdownMenuItem>
                        <DropdownMenuItem>Update progress</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete project</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
