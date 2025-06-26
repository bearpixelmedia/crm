"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { ArrowLeft, Calendar, Clock, DollarSign, Users, FileText, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample project data - in a real app, this would come from your database
const project = {
  id: "PRJ001",
  name: "Website Redesign",
  client: "Acme Corporation",
  clientId: "CL001",
  description:
    "Complete redesign of the corporate website with modern UI/UX, responsive design, and improved performance.",
  startDate: "2023-06-15",
  deadline: "2023-09-30",
  status: "In Progress",
  progress: 65,
  type: "Web Design",
  budget: "$12,000",
  spent: "$7,800",
  team: [
    { id: "USR001", name: "Alex Johnson", role: "Project Manager", avatar: "/diverse-group.png" },
    { id: "USR002", name: "Maria Garcia", role: "UI/UX Designer", avatar: "/diverse-group.png" },
    { id: "USR003", name: "John Smith", role: "Frontend Developer", avatar: "/diverse-group.png" },
  ],
  tasks: [
    { id: "TSK001", name: "Wireframing", status: "Completed", assignee: "Maria Garcia", dueDate: "2023-07-01" },
    { id: "TSK002", name: "UI Design", status: "Completed", assignee: "Maria Garcia", dueDate: "2023-07-15" },
    {
      id: "TSK003",
      name: "Frontend Development",
      status: "In Progress",
      assignee: "John Smith",
      dueDate: "2023-08-15",
    },
    { id: "TSK004", name: "Backend Integration", status: "Not Started", assignee: "John Smith", dueDate: "2023-09-01" },
    { id: "TSK005", name: "Testing", status: "Not Started", assignee: "Alex Johnson", dueDate: "2023-09-15" },
  ],
}

export default function ProjectDetailPage({ params }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // YOLO hydration fix: memoize all date calculations
  const today = useMemo(() => new Date(), [])
  const deadlineDate = useMemo(() => new Date(project.deadline), [])
  const startDate = useMemo(() => new Date(project.startDate), [])
  const daysRemaining = useMemo(() => Math.round((deadlineDate - today) / (1000 * 60 * 60 * 24)), [deadlineDate, today])
  const timelineStart = useMemo(() => startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }), [startDate])
  const timelineEnd = useMemo(() => deadlineDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }), [deadlineDate])
  const daysTotal = useMemo(() => Math.round((deadlineDate - startDate) / (1000 * 60 * 60 * 24)), [deadlineDate, startDate])
  const taskDueDates = useMemo(() => project.tasks.map(task => new Date(task.dueDate).toLocaleDateString()), [project.tasks])

  const handleBack = () => {
    router.push("/projects")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          <h2 className="text-3xl font-bold">{project.name}</h2>
          <Badge variant="outline" className="ml-4">
            {project.status}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{project.type}</Badge>
            <span className="text-sm text-muted-foreground">Client: {project.client}</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Edit Project</Button>
            <Button>Complete Project</Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Progress</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{project.progress}%</div>
                    <Progress value={project.progress} className="h-2 w-[60px]" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {daysRemaining} days remaining
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.budget}</div>
                  <p className="text-xs text-muted-foreground">
                    {project.spent} spent (
                    {Math.round(
                      (Number.parseInt(project.spent.replace("$", "").replace(",", "")) /
                        Number.parseInt(project.budget.replace("$", "").replace(",", ""))) *
                        100,
                    )}
                    %)
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Timeline</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {timelineStart} - {timelineEnd}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {daysTotal} days total
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.team.length} members</div>
                  <div className="mt-2 flex -space-x-2">
                    {project.team.map((member) => (
                      <Avatar key={member.id} className="border-2 border-background">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Task completed</p>
                      <p className="text-sm text-muted-foreground">Maria Garcia completed "UI Design"</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">New comment</p>
                      <p className="text-sm text-muted-foreground">John Smith commented on "Frontend Development"</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Deadline updated</p>
                      <p className="text-sm text-muted-foreground">Project deadline extended to September 30, 2023</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">Project Tasks</h3>
              <Button>
                <Calendar className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {project.tasks.map((task, i) => (
                    <div key={task.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <h4 className="font-medium">{task.name}</h4>
                          <Badge
                            className="ml-2"
                            variant={
                              task.status === "Completed"
                                ? "default"
                                : task.status === "In Progress"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {task.status}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>Assigned to: {task.assignee}</span>
                          <span className="mx-2">•</span>
                          <span>Due: {taskDueDates[i]}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">Project Team</h3>
              <Button>
                <Users className="mr-2 h-4 w-4" /> Add Team Member
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {project.team.map((member) => (
                    <div key={member.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">Project Files</h3>
              <Button>
                <FileText className="mr-2 h-4 w-4" /> Upload File
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-md bg-primary/10 p-2">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">website-wireframes.pdf</h4>
                        <p className="text-sm text-muted-foreground">Uploaded by Maria Garcia • 2.4 MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-md bg-primary/10 p-2">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">ui-design-mockups.fig</h4>
                        <p className="text-sm text-muted-foreground">Uploaded by Maria Garcia • 5.8 MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-md bg-primary/10 p-2">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">project-requirements.docx</h4>
                        <p className="text-sm text-muted-foreground">Uploaded by Alex Johnson • 1.2 MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Comments</CardTitle>
                <CardDescription>Discuss project details with your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src="/diverse-group.png" alt="Alex Johnson" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <span className="font-medium">Alex Johnson</span>
                        <span className="ml-2 text-xs text-muted-foreground">3 days ago</span>
                      </div>
                      <p>
                        Let's schedule a meeting to discuss the frontend development progress. I think we need to
                        address some performance issues.
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src="/diverse-group.png" alt="John Smith" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <span className="font-medium">John Smith</span>
                        <span className="ml-2 text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <p>
                        I've been working on optimizing the image loading. We should see some improvements in the next
                        build.
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src="/diverse-group.png" alt="Maria Garcia" />
                      <AvatarFallback>MG</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <span className="font-medium">Maria Garcia</span>
                        <span className="ml-2 text-xs text-muted-foreground">1 day ago</span>
                      </div>
                      <p>
                        I've uploaded the final UI designs. Let me know if you need any clarification on the design
                        elements.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
