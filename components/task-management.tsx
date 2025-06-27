"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PlusCircle, CheckCircle, Circle, Clock, AlertCircle, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useData } from "@/context/data-context"

type Task = {
  id: string
  title: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  dueDate: string
  assignee: string
  projectId?: string
  projectName?: string
}

export function TaskManagement() {
  const { tasks } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)

  useEffect(() => {
    setFilteredTasks(tasks)
  }, [tasks])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    if (!query) {
      setFilteredTasks(tasks)
      return
    }

    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.projectName?.toLowerCase().includes(query) ||
        task.assignee.toLowerCase().includes(query),
    )
    setFilteredTasks(filtered)
  }

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    setFilteredTasks(updatedTasks)
  }

  const getTasksByStatus = (status: Task["status"]) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return <Circle className="h-4 w-4 text-gray-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "done":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h2 className="text-2xl font-bold">Task Management</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="w-full pl-8 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Tasks</DropdownMenuItem>
              <DropdownMenuItem>My Tasks</DropdownMenuItem>
              <DropdownMenuItem>High Priority</DropdownMenuItem>
              <DropdownMenuItem>Due Soon</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      <Tabs defaultValue="kanban" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* To Do Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center text-lg font-medium">
                  <Circle className="mr-2 h-5 w-5 text-gray-500" />
                  To Do
                </h3>
                <Badge variant="outline">{getTasksByStatus("todo").length}</Badge>
              </div>
              {getTasksByStatus("todo").map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            {getStatusIcon(task.status)}
                            <h4 className="ml-2 font-medium">{task.title}</h4>
                          </div>
                          {task.projectName && <p className="text-xs text-muted-foreground">{task.projectName}</p>}
                        </div>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>{task.assignee}</span>
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleStatusChange(task.id, "in-progress")}>
                          Start
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* In Progress Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center text-lg font-medium">
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                  In Progress
                </h3>
                <Badge variant="outline">{getTasksByStatus("in-progress").length}</Badge>
              </div>
              {getTasksByStatus("in-progress").map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            {getStatusIcon(task.status)}
                            <h4 className="ml-2 font-medium">{task.title}</h4>
                          </div>
                          {task.projectName && <p className="text-xs text-muted-foreground">{task.projectName}</p>}
                        </div>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>{task.assignee}</span>
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleStatusChange(task.id, "todo")}>
                          Back
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleStatusChange(task.id, "done")}>
                          Complete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Done Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center text-lg font-medium">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Done
                </h3>
                <Badge variant="outline">{getTasksByStatus("done").length}</Badge>
              </div>
              {getTasksByStatus("done").map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md bg-gray-50">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            {getStatusIcon(task.status)}
                            <h4 className="ml-2 font-medium line-through text-muted-foreground">{task.title}</h4>
                          </div>
                          {task.projectName && <p className="text-xs text-muted-foreground">{task.projectName}</p>}
                        </div>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>{task.assignee}</span>
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleStatusChange(task.id, "in-progress")}>
                          Reopen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No tasks found</p>
                ) : (
                  filteredTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            const nextStatus =
                              task.status === "todo" ? "in-progress" : task.status === "in-progress" ? "done" : "todo"
                            handleStatusChange(task.id, nextStatus)
                          }}
                        >
                          {getStatusIcon(task.status)}
                        </button>
                        <div>
                          <p
                            className={`font-medium ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}
                          >
                            {task.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {task.projectName} • Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        <span className="text-sm">{task.assignee}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
