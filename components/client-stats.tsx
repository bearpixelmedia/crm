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
import { MoreHorizontal, Plus, Search } from "lucide-react"
import { useData } from "@/context/data-context"
import { Skeleton } from "@/components/ui/skeleton"

export function ClientStats({ onViewClient }) {
  const { clients, projects, isLoading } = useData()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState(null)

  // Show loading skeletons while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-10 w-[300px]" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewClient = (client) => {
    setSelectedClient(client)
    if (onViewClient) {
      onViewClient(client.id)
    }
  }

  // Calculate stats from real data
  const totalClients = clients.length
  const activeClients = clients.filter((client) => client.status === "Active").length
  const totalValue = clients.reduce((sum, client) => {
    const value = Number.parseFloat(client.value.replace(/[^0-9.-]+/g, "")) || 0
    return sum + value
  }, 0)
  const averageValue = totalClients > 0 ? totalValue / totalClients : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            className="w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Client
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">All clients in the system</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-muted-foreground">
              {totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : 0}% of total clients
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Client Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Based on current client values</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects Per Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalClients > 0 ? (projects.length / totalClients).toFixed(1) : 0}
            </div>
            <p className="text-xs text-muted-foreground">Average number of projects</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
          <CardDescription>
            Manage your client relationships and view client details. {clients.length} total clients.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredClients.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {clients.length === 0 ? (
                <>
                  <h3 className="text-lg font-medium mb-2">No clients yet</h3>
                  <p>Start by adding your first client to track relationships and projects.</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium mb-2">No clients match your search</h3>
                  <p>Try adjusting your search terms to find clients.</p>
                </>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.contact}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>
                      <Badge variant={client.status === "Active" ? "default" : "secondary"}>{client.status}</Badge>
                    </TableCell>
                    <TableCell>{client.projects?.length || 0}</TableCell>
                    <TableCell>{client.value}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleViewClient(client)}>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit client</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View projects</DropdownMenuItem>
                          <DropdownMenuItem>Add new project</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete client</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {selectedClient && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Client Projects</CardTitle>
            <CardDescription>Projects assigned to this client</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedClient && selectedClient.projects && selectedClient.projects.length > 0 ? (
                  selectedClient.projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.id}</TableCell>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.type}</TableCell>
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
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No projects assigned to this client
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Assign New Project
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
