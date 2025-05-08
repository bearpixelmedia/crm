"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Edit2,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  User,
} from "lucide-react"

type Task = {
  id: string
  title: string
  description: string
  projectId: string
  projectName: string
  clientId: string
  clientName: string
  assignedTo: string
  dueDate: string
  priority: "high" | "medium" | "low"
  status: "not-started" | "in-progress" | "review" | "completed"
  category: "audit" | "keyword-research" | "on-page" | "content" | "link-building" | "reporting" | "other"
  createdAt: string
  completedAt?: string
}

// Sample data
const tasks: Task[] = [
  {
    id: "task1",
    title: "Complete Technical SEO Audit",
    description: "Perform a comprehensive technical SEO audit for Acme Corporation's website.",
    projectId: "SEO001",
    projectName: "Acme Corporation SEO",
    clientId: "CL001",
    clientName: "Acme Corporation",
    assignedTo: "John Smith",
    dueDate: "2023-09-15",
    priority: "high",
    status: "in-progress",
    category: "audit",
    createdAt: "2023-09-01",
  },
  {
    id: "task2",
    title: "Keyword Research for Service Pages",
    description: "Conduct keyword research for TechNova's service pages focusing on their core offerings.",
    projectId: "SEO002",
    projectName: "TechNova SEO Campaign",
    clientId: "CL002",
    clientName: "TechNova Solutions",
    assignedTo: "Sarah Johnson",
    dueDate: "2023-09-18",
    priority: "medium",
    status: "not-started",
    category: "keyword-research",
    createdAt: "2023-09-02",
  },
  {
    id: "task3",
    title: "Optimize Meta Descriptions",
    description: "Update meta descriptions for all service pages to improve CTR.",
    projectId: "SEO001",
    projectName: "Acme Corporation SEO",
    clientId: "CL001",
    clientName: "Acme Corporation",
    assignedTo: "John Smith",
    dueDate: "2023-09-10",
    priority: "medium",
    status: "completed",
    category: "on-page",
    createdAt: "2023-08-28",
    completedAt: "2023-09-08",
  },
  {
    id: "task4",
    title: "Create Content Calendar",
    description: "Develop a 3-month content calendar for blog posts targeting key keywords.",
    projectId: "SEO002",
    projectName: "TechNova SEO Campaign",
    clientId: "CL002",
    clientName: "TechNova Solutions",
    assignedTo: "Sarah Johnson",
    dueDate: "2023-09-20",
    priority: "medium",
    status: "in-progress",
    category: "content",
    createdAt: "2023-09-05",
  },
  {
    id: "task5",
    title: "Backlink Outreach",
    description: "Contact 20 industry websites for potential backlink opportunities.",
    projectId: "SEO001",
    projectName: "Acme Corporation SEO",
    clientId: "CL001",
    clientName: "Acme Corporation",
    assignedTo: "Michael Brown",
    dueDate: "2023-09-25",
    priority: "high",
    status: "not-started",
    category: "link-building",
    createdAt: "2023-09-07",
  },
  {
    id: "task6",
    title: "Monthly Performance Report",
    description: "Prepare the monthly SEO performance report for Global Enterprises.",
    projectId: "SEO003",
    projectName: "Global Enterprises SEO Audit",
    clientId: "CL003",
    clientName: "Global Enterprises",
    assignedTo: "Michael Brown",
    dueDate: "2023-09-30",
    priority: "high",
    status: "not-started",
    category: "reporting",
    createdAt: "2023-09-08",
  },
  {
    id: "task7",
    title: "Fix Broken Links",
    description: "Identify and fix all broken links on the website.",
    projectId: "SEO001",
    projectName: "Acme Corporation SEO",
    clientId: "CL001",
    clientName: "Acme Corporation",
    assignedTo: "John Smith",
    dueDate: "2023-09-12",
    priority: "high",
    status: "review",
    category: "on-page",
    createdAt: "2023-09-03",
  },
]

const agents = [
  { id: "agent1", name: "John Smith" },
  { id: "agent2", name: "Sarah Johnson" },
  { id: "agent3", name: "Michael Brown" },
  { id: "agent4", name: "Emma Davis" },
  { id: "agent5", name: "David Wilson" },
]

const projects = [
  { id: "SEO001", name: "Acme Corporation SEO", clientId: "CL001", clientName: "Acme Corporation" },
  { id: "SEO002", name: "TechNova SEO Campaign", clientId: "CL002", clientName: "TechNova Solutions" },
  { id: "SEO003", name: "Global Enterprises SEO Audit", clientId: "CL003", clientName: "Global Enterprises" },
]

export function SEOTaskManager() {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")
  const [projectFilter, setProjectFilter] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const applyFilters = () => {
    let result = [...tasks]

    if (searchTerm) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.projectName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      result = result.filter((task) => task.status === statusFilter)
    }

    if (priorityFilter !== "all") {
      result = result.filter((task) => task.priority === priorityFilter)
    }

    if (categoryFilter !== "all") {
      result = result.filter((task) => task.category === categoryFilter)
    }

    if (assigneeFilter !== "all") {
      result = result.filter((task) => task.assignedTo === assigneeFilter)
    }

    if (projectFilter !== "all") {
      result = result.filter((task) => task.projectId === projectFilter)
    }

    setFilteredTasks(result)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    applyFilters()
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    applyFilters()
  }

  const handlePriorityFilterChange = (value: string) => {
    setPriorityFilter(value)
    applyFilters()
  }

  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value)
    applyFilters()
  }

  const handleAssigneeFilterChange = (value: string) => {
    setAssigneeFilter(value)
    applyFilters()
  }

  const handleProjectFilterChange = (value: string) => {
    setProjectFilter(value)
    applyFilters()
  }

  const handleAddTask = () => {
    setIsEditMode(false)
    setCurrentTask({
      id: `task${tasks.length + 1}`,
      title: "",
      description: "",
      projectId: "",
      projectName: "",
      clientId: "",
      clientName: "",
      assignedTo: "",
      dueDate: new Date().toISOString().split("T")[0],
      priority: "medium",
      status: "not-started",
      category: "other",
      createdAt: new Date().toISOString().split("T")[0],
    })
    setIsDialogOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setIsEditMode(true)
    setCurrentTask(task)
    setIsDialogOpen(true)
  }

  const handleSaveTask = () => {
    if (!currentTask) return

    if (isEditMode) {
      // Update existing task
      const updatedTasks = tasks.map((task) => (task.id === currentTask.id ? currentTask : task))
      // In a real app, you would save this to your database
      console.log("Updated task:", currentTask)
    } else {
      // Add new task
      // In a real app, you would save this to your database
      console.log("New task:", currentTask)
    }

    setIsDialogOpen(false)
    setCurrentTask(null)
  }

  const handleDeleteTask = (taskId: string) => {
    // In a real app, you would delete this from your database
    console.log("Deleting task:", taskId)
  }

  const handleUpdateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    // In a real app, you would update this in your database
    console.log("Updating task status:", taskId, newStatus)
  }

  const getTasksByStatus = (status: Task["status"]) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  const getTasksByDueDate = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    return {
      overdue: filteredTasks.filter((task) => new Date(task.dueDate) < today && task.status !== "completed"),
      dueToday: filteredTasks.filter(
        (task) => new Date(task.dueDate).toDateString() === today.toDateString() && task.status !== "completed",
      ),
      dueTomorrow: filteredTasks.filter(
        (task) => new Date(task.dueDate).toDateString() === tomorrow.toDateString() && task.status !== "completed",
      ),
      dueThisWeek: filteredTasks.filter(
        (task) =>
          new Date(task.dueDate) > tomorrow && new Date(task.dueDate) <= nextWeek && task.status !== "completed",
      ),
      later: filteredTasks.filter((task) => new Date(task.dueDate) > nextWeek && task.status !== "completed"),
    }
  }

  const renderTaskCard = (task: Task) => (
    <Card key={task.id} className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{task.title}</CardTitle>
            <CardDescription>{task.projectName}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEditTask(task)}>
                <Edit2 className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUpdateTaskStatus(task.id, "not-started")}>
                Mark as Not Started
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdateTaskStatus(task.id, "in-progress")}>
                Mark as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdateTaskStatus(task.id, "review")}>
                Mark as In Review
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdateTaskStatus(task.id, "completed")}>
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTask(task.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className={
                task.priority === "high"
                  ? "bg-red-100 text-red-800"
                  : task.priority === "medium"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-green-100 text-green-800"
              }
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
            <Badge
              variant="outline"
              className={
                task.category === "audit"
                  ? "bg-purple-100 text-purple-800"
                  : task.category === "keyword-research"
                    ? "bg-blue-100 text-blue-800"
                    : task.category === "on-page"
                      ? "bg-green-100 text-green-800"
                      : task.category === "content"
                        ? "bg-amber-100 text-amber-800"
                        : task.category === "link-building"
                          ? "bg-pink-100 text-pink-800"
                          : task.category === "reporting"
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-gray-100 text-gray-800"
              }
            >
              {task.category
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {task.assignedTo}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tasks..." className="w-[300px]" value={searchTerm} onChange={handleSearch} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <select
              className="bg-transparent"
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="review">In Review</option>
              <option value="completed">Completed</option>
            </select>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <select
              className="bg-transparent"
              value={priorityFilter}
              onChange={(e) => handlePriorityFilterChange(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <select
              className="bg-transparent"
              value={categoryFilter}
              onChange={(e) => handleCategoryFilterChange(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="audit">Audit</option>
              <option value="keyword-research">Keyword Research</option>
              <option value="on-page">On-Page</option>
              <option value="content">Content</option>
              <option value="link-building">Link Building</option>
              <option value="reporting">Reporting</option>
              <option value="other">Other</option>
            </select>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <select
              className="bg-transparent"
              value={assigneeFilter}
              onChange={(e) => handleAssigneeFilterChange(e.target.value)}
            >
              <option value="all">All Assignees</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.name}>
                  {agent.name}
                </option>
              ))}
            </select>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <select
              className="bg-transparent"
              value={projectFilter}
              onChange={(e) => handleProjectFilterChange(e.target.value)}
            >
              <option value="all">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </Button>
          <Button onClick={handleAddTask}>
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredTasks.length}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{getTasksByDueDate().overdue.length}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{getTasksByStatus("in-progress").length}</div>
            <p className="text-xs text-muted-foreground">Currently being worked on</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{getTasksByStatus("completed").length}</div>
            <p className="text-xs text-muted-foreground">Successfully finished</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="by-status">By Status</TabsTrigger>
          <TabsTrigger value="by-due-date">By Due Date</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => renderTaskCard(task))}
          </div>
        </TabsContent>

        <TabsContent value="by-status" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 flex items-center text-lg font-medium">
                <AlertCircle className="mr-2 h-5 w-5 text-muted-foreground" /> Not Started
              </h3>
              <div className="space-y-4">{getTasksByStatus("not-started").map((task) => renderTaskCard(task))}</div>
            </div>
            <div>
              <h3 className="mb-4 flex items-center text-lg font-medium">
                <Clock className="mr-2 h-5 w-5 text-blue-600" /> In Progress
              </h3>
              <div className="space-y-4">{getTasksByStatus("in-progress").map((task) => renderTaskCard(task))}</div>
            </div>
            <div>
              <h3 className="mb-4 flex items-center text-lg font-medium">
                <Search className="mr-2 h-5 w-5 text-amber-600" /> In Review
              </h3>
              <div className="space-y-4">{getTasksByStatus("review").map((task) => renderTaskCard(task))}</div>
            </div>
            <div>
              <h3 className="mb-4 flex items-center text-lg font-medium">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" /> Completed
              </h3>
              <div className="space-y-4">{getTasksByStatus("completed").map((task) => renderTaskCard(task))}</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="by-due-date" className="space-y-4">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-medium text-red-600">Overdue</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {getTasksByDueDate().overdue.map((task) => renderTaskCard(task))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Due Today</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {getTasksByDueDate().dueToday.map((task) => renderTaskCard(task))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Due Tomorrow</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {getTasksByDueDate().dueTomorrow.map((task) => renderTaskCard(task))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Due This Week</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {getTasksByDueDate().dueThisWeek.map((task) => renderTaskCard(task))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Later</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {getTasksByDueDate().later.map((task) => renderTaskCard(task))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Task" : "Add New Task"}</DialogTitle>
            <DialogDescription>
              {isEditMode ? "Update the task details below" : "Fill out the form below to create a new task"}
            </DialogDescription>
          </DialogHeader>
          {currentTask && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={currentTask.title}
                  onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={currentTask.description}
                  onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">
                  Project
                </Label>
                <select
                  id="project"
                  value={currentTask.projectId}
                  onChange={(e) => {
                    const project = projects.find((p) => p.id === e.target.value)
                    setCurrentTask({
                      ...currentTask,
                      projectId: e.target.value,
                      projectName: project ? project.name : "",
                      clientId: project ? project.clientId : "",
                      clientName: project ? project.clientName : "",
                    })
                  }}
                  className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignee" className="text-right">
                  Assignee
                </Label>
                <select
                  id="assignee"
                  value={currentTask.assignedTo}
                  onChange={(e) => setCurrentTask({ ...currentTask, assignedTo: e.target.value })}
                  className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select an assignee</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.name}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="due-date" className="text-right">
                  Due Date
                </Label>
                <Input
                  id="due-date"
                  type="date"
                  value={currentTask.dueDate}
                  onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <select
                  id="priority"
                  value={currentTask.priority}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      priority: e.target.value as "high" | "medium" | "low",
                    })
                  }
                  className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <select
                  id="category"
                  value={currentTask.category}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      category: e.target.value as Task["category"],
                    })
                  }
                  className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="audit">Audit</option>
                  <option value="keyword-research">Keyword Research</option>
                  <option value="on-page">On-Page Optimization</option>
                  <option value="content">Content</option>
                  <option value="link-building">Link Building</option>
                  <option value="reporting">Reporting</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <select
                  id="status"
                  value={currentTask.status}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      status: e.target.value as Task["status"],
                    })
                  }
                  className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">In Review</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTask}>{isEditMode ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
