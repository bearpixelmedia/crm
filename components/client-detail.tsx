"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, ArrowLeft, Mail, Phone, Building, User, Calendar, DollarSign } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProjectForm } from "@/components/project-form"
import { useData } from "@/context/data-context"

export function ClientDetail({ client, onBack, onNewProject }) {
  const { projects } = useData()
  const [activeTab, setActiveTab] = useState("overview")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleNewProject = (data) => {
    // In a real app, you would save the project to your database
    console.log("New project data:", data)
    onNewProject && onNewProject(data)
    setIsDialogOpen(false)
  }

  if (!client) return null

  // Get client projects from the projects array
  const clientProjects = projects.filter((project) => project.clientId === client.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>
        <h2 className="text-3xl font-bold">{client.name}</h2>
        <Badge variant={client.status === "Active" ? "default" : "secondary"} className="ml-4">
          {client.status}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Contact:</span>
                  <span className="ml-2">{client.contact}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Email:</span>
                  <span className="ml-2">{client.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2">{client.phone}</span>
                </div>
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Address:</span>
                  <span className="ml-2">123 Business St, Suite 101, City, State 12345</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Client Since:</span>
                  <span className="ml-2">January 15, 2023</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Total Value:</span>
                  <span className="ml-2">{client.value}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Active Projects:</span>
                  <span className="ml-2">{clientProjects.filter((p) => p.status === "In Progress").length}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Completed Projects:</span>
                  <span className="ml-2">{clientProjects.filter((p) => p.status === "Completed").length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-primary/10 p-2">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Project deadline updated</p>
                    <p className="text-sm text-muted-foreground">
                      Website Redesign deadline extended to September 30, 2023
                    </p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-primary/10 p-2">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email sent</p>
                    <p className="text-sm text-muted-foreground">Project update email sent to {client.contact}</p>
                    <p className="text-xs text-muted-foreground">5 days ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-primary/10 p-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Invoice paid</p>
                    <p className="text-sm text-muted-foreground">Invoice #INV-2023-005 paid</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Client Projects</h3>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Create a new project for {client.name}. Fill out the details below.
                  </DialogDescription>
                </DialogHeader>
                <ProjectForm onSubmit={handleNewProject} initialData={{ clientId: client.id }} />
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientProjects.length > 0 ? (
                    clientProjects.map((project) => (
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
                        <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(project.deadline).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No projects found for this client
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Contact Persons</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Primary</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{client.contact}</TableCell>
                    <TableCell>CEO</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <Badge>Primary</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Wilson</TableCell>
                    <TableCell>Marketing Director</TableCell>
                    <TableCell>jane@{client.email.split("@")[1]}</TableCell>
                    <TableCell>(555) 987-6543</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Invoices</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Invoice
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV-2023-005</TableCell>
                    <TableCell>Aug 15, 2023</TableCell>
                    <TableCell>Website Redesign</TableCell>
                    <TableCell>$4,000</TableCell>
                    <TableCell>
                      <Badge variant="default">Paid</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV-2023-004</TableCell>
                    <TableCell>Jul 01, 2023</TableCell>
                    <TableCell>Website Redesign</TableCell>
                    <TableCell>$5,000</TableCell>
                    <TableCell>
                      <Badge variant="outline">Pending</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV-2023-003</TableCell>
                    <TableCell>Jun 15, 2023</TableCell>
                    <TableCell>Website Redesign</TableCell>
                    <TableCell>$3,000</TableCell>
                    <TableCell>
                      <Badge variant="default">Paid</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
