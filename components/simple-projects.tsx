"use client"

import { useData } from "@/context/data-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Building2, Users } from "lucide-react"

export function SimpleProjects() {
  const { projects, clients, loading, error, stats, refreshData, getClientById } = useData()

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading CRM data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-red-500">Error: {error}</p>
              <Button onClick={refreshData} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "invoice":
        return "bg-blue-100 text-blue-800"
      case "sales receipt":
        return "bg-purple-100 text-purple-800"
      case "no charge":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">CRM Dashboard</h1>
          <p className="text-muted-foreground">Projects and Client Management</p>
        </div>
        <Button onClick={refreshData} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Total Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Multi-Client Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.multiClientProjects}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Multi-Project Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.multiProjectClients}</div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Projects ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Project</th>
                  <th className="text-left py-3 px-2 font-medium">Client</th>
                  <th className="text-left py-3 px-2 font-medium">Type</th>
                  <th className="text-left py-3 px-2 font-medium">Status</th>
                  <th className="text-left py-3 px-2 font-medium">Budget</th>
                  <th className="text-left py-3 px-2 font-medium">Deadline</th>
                  <th className="text-left py-3 px-2 font-medium">Contact</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => {
                  const client = getClientById(project.clientIds[0])
                  return (
                    <tr key={project.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2">
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {project.id}</div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        {client ? (
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-muted-foreground">ID: {client.id}</div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No client</span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant="outline">{project.type}</Badge>
                      </td>
                      <td className="py-3 px-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 font-medium">{project.budget}</td>
                      <td className="py-3 px-2">{project.deadline}</td>
                      <td className="py-3 px-2">
                        {client && (
                          <div className="space-y-1">
                            {client.email && (
                              <a 
                                href={`mailto:${client.email}`}
                                className="text-blue-600 hover:underline text-sm block"
                              >
                                {client.email}
                              </a>
                            )}
                            {client.phone && client.phone !== "n/a" && (
                              <a 
                                href={`tel:${client.phone}`}
                                className="text-blue-600 hover:underline text-sm block"
                              >
                                {client.phone}
                              </a>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Clients ({clients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Client</th>
                  <th className="text-left py-3 px-2 font-medium">Projects</th>
                  <th className="text-left py-3 px-2 font-medium">Contact</th>
                  <th className="text-left py-3 px-2 font-medium">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => {
                  const clientProjects = client.projectIds.map(id => projects.find(p => p.id === id)).filter(Boolean)
                  const totalValue = clientProjects.reduce((sum, project) => {
                    const budget = parseFloat(project!.budget.replace(/[$,]/g, '')) || 0
                    return sum + budget
                  }, 0)

                  return (
                    <tr key={client.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2">
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {client.id}</div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="space-y-1">
                          {clientProjects.map((project) => (
                            <div key={project!.id} className="text-sm">
                              {project!.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="space-y-1">
                          {client.email && (
                            <a 
                              href={`mailto:${client.email}`}
                              className="text-blue-600 hover:underline text-sm block"
                            >
                              {client.email}
                            </a>
                          )}
                          {client.phone && client.phone !== "n/a" && (
                            <a 
                              href={`tel:${client.phone}`}
                              className="text-blue-600 hover:underline text-sm block"
                            >
                              {client.phone}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="font-medium">
                          ${totalValue.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {clientProjects.length} project{clientProjects.length !== 1 ? 's' : ''}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 