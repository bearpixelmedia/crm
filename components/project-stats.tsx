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
import { useData } from "@/context/data-context"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectStats() {
  const { projects, clients, isLoading } = useData()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Show loading skeletons while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-10 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Filter projects based on search and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Ongoing":
        return "bg-purple-100 text-purple-800"
      case "Not Started":
        return "bg-gray-100 text-gray-800"
      case "Canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgress = (status: string) => {
    switch (status) {
      case "Completed":
        return 100
      case "In Progress":
        return 60
      case "Ongoing":
        return 80
      case "Not Started":
        return 0
      case "Canceled":
        return 0
      default:
        return 0
    }
  }

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    return client?.name || "Unknown Client"
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Projects Overview</CardTitle>
              <CardDescription>
                Manage and track all your projects. {projects.length} total projects.
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {projects.length === 0 ? (
                  <>
                    <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                    <p>Start by creating your first project to track progress and manage work.</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium mb-2">No projects match your filters</h3>
                    <p>Try adjusting your search terms or status filter.</p>
                  </>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{project.name}</div>
                          {project.description && (
                            <div className="text-sm text-muted-foreground">
                              {project.description.length > 50 
                                ? `${project.description.substring(0, 50)}...` 
                                : project.description
                              }
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getClientName(project.clientId)}</TableCell>
                      <TableCell>{project.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(project.status)} variant="secondary">
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={getProgress(project.status)} className="w-16" />
                          <span className="text-sm text-muted-foreground">
                            {getProgress(project.status)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline"}
                      </TableCell>
                      <TableCell>{project.budget || "Not set"}</TableCell>
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
                            <DropdownMenuItem className="text-red-600">
                              Delete project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
