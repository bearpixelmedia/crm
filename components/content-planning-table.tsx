"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit2, Trash2 } from "lucide-react"

type ContentItem = {
  id: string
  title: string
  type: string
  targetKeywords: string
  status: string
  assignedTo: string
  dueDate: string
  notes: string
}

export function ContentPlanningTable({ projectId }) {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: "1",
      title: "10 Essential SEO Tips for Small Businesses",
      type: "blog",
      targetKeywords: "small business seo, seo tips, local seo",
      status: "planned",
      assignedTo: "John Smith",
      dueDate: "2023-09-15",
      notes: "Focus on actionable tips for small business owners with limited budgets.",
    },
    {
      id: "2",
      title: "How to Conduct a Technical SEO Audit",
      type: "guide",
      targetKeywords: "technical seo audit, seo audit guide, website audit",
      status: "in-progress",
      assignedTo: "Sarah Johnson",
      dueDate: "2023-09-20",
      notes: "Include step-by-step instructions and screenshots of tools.",
    },
    {
      id: "3",
      title: "Web Design Services",
      type: "service-page",
      targetKeywords: "web design services, professional website design, custom website development",
      status: "completed",
      assignedTo: "Maria Garcia",
      dueDate: "2023-09-01",
      notes: "Highlight portfolio examples and include client testimonials.",
    },
    {
      id: "4",
      title: "The Ultimate Guide to Local SEO",
      type: "ebook",
      targetKeywords: "local seo guide, local search optimization, google my business",
      status: "planned",
      assignedTo: "David Wilson",
      dueDate: "2023-10-05",
      notes: "Create a downloadable PDF with actionable strategies for local businesses.",
    },
    {
      id: "5",
      title: "SEO Case Study: How We Increased Organic Traffic by 300%",
      type: "case-study",
      targetKeywords: "seo case study, seo results, organic traffic growth",
      status: "in-progress",
      assignedTo: "John Smith",
      dueDate: "2023-09-25",
      notes: "Include real metrics, strategies used, and timeline of implementation.",
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentItem, setCurrentItem] = useState<ContentItem>({
    id: "",
    title: "",
    type: "blog",
    targetKeywords: "",
    status: "planned",
    assignedTo: "",
    dueDate: "",
    notes: "",
  })

  const handleAddOrUpdateItem = () => {
    if (isEditMode) {
      setContentItems(contentItems.map((item) => (item.id === currentItem.id ? currentItem : item)))
    } else {
      const newId = (contentItems.length + 1).toString()
      setContentItems([...contentItems, { ...currentItem, id: newId }])
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDeleteItem = (id: string) => {
    setContentItems(contentItems.filter((item) => item.id !== id))
  }

  const handleEditItem = (item: ContentItem) => {
    setCurrentItem(item)
    setIsEditMode(true)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setCurrentItem({
      id: "",
      title: "",
      type: "blog",
      targetKeywords: "",
      status: "planned",
      assignedTo: "",
      dueDate: "",
      notes: "",
    })
    setIsEditMode(false)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Content Planning</CardTitle>
              <CardDescription>Plan and track SEO content creation</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="mr-2 h-4 w-4" /> Add Content
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{isEditMode ? "Edit Content" : "Add New Content"}</DialogTitle>
                  <DialogDescription>
                    {isEditMode
                      ? "Update the content details below"
                      : "Fill out the form below to add a new content item to your plan"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={currentItem.title}
                      onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <select
                      id="type"
                      value={currentItem.type}
                      onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}
                      className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="blog">Blog Post</option>
                      <option value="guide">Guide</option>
                      <option value="service-page">Service Page</option>
                      <option value="landing-page">Landing Page</option>
                      <option value="case-study">Case Study</option>
                      <option value="ebook">E-book</option>
                      <option value="infographic">Infographic</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="keywords" className="text-right">
                      Target Keywords
                    </Label>
                    <Input
                      id="keywords"
                      value={currentItem.targetKeywords}
                      onChange={(e) => setCurrentItem({ ...currentItem, targetKeywords: e.target.value })}
                      className="col-span-3"
                      placeholder="Comma-separated keywords"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <select
                      id="status"
                      value={currentItem.status}
                      onChange={(e) => setCurrentItem({ ...currentItem, status: e.target.value })}
                      className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="planned">Planned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="review">In Review</option>
                      <option value="completed">Completed</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assigned" className="text-right">
                      Assigned To
                    </Label>
                    <Input
                      id="assigned"
                      value={currentItem.assignedTo}
                      onChange={(e) => setCurrentItem({ ...currentItem, assignedTo: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="due-date" className="text-right">
                      Due Date
                    </Label>
                    <Input
                      id="due-date"
                      type="date"
                      value={currentItem.dueDate}
                      onChange={(e) => setCurrentItem({ ...currentItem, dueDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Textarea
                      id="notes"
                      value={currentItem.notes}
                      onChange={(e) => setCurrentItem({ ...currentItem, notes: e.target.value })}
                      className="col-span-3"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddOrUpdateItem}>{isEditMode ? "Update" : "Add"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Target Keywords</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {item.type === "blog"
                        ? "Blog Post"
                        : item.type === "guide"
                          ? "Guide"
                          : item.type === "service-page"
                            ? "Service Page"
                            : item.type === "case-study"
                              ? "Case Study"
                              : item.type === "ebook"
                                ? "E-book"
                                : item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{item.targetKeywords}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.status === "completed" || item.status === "published"
                          ? "bg-green-100 text-green-800"
                          : item.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "review"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                      }
                    >
                      {item.status === "planned"
                        ? "Planned"
                        : item.status === "in-progress"
                          ? "In Progress"
                          : item.status === "review"
                            ? "In Review"
                            : item.status === "completed"
                              ? "Completed"
                              : "Published"}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.assignedTo}</TableCell>
                  <TableCell>{new Date(item.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
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
