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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react"

type LinkOpportunity = {
  id: string
  website: string
  contactName: string
  contactEmail: string
  status: string
  targetPage: string
  notes: string
  priority: string
}

type Backlink = {
  id: string
  website: string
  url: string
  targetPage: string
  anchorText: string
  doFollow: boolean
  dateAcquired: string
  notes: string
}

export function LinkBuildingTracker({ projectId }) {
  const [activeTab, setActiveTab] = useState("opportunities")
  const [opportunities, setOpportunities] = useState<LinkOpportunity[]>([
    {
      id: "1",
      website: "example-blog.com",
      contactName: "John Editor",
      contactEmail: "john@example-blog.com",
      status: "outreach",
      targetPage: "https://whitefoxstudios.com/services/web-design",
      notes: "Industry blog with high domain authority. Pitched guest post about web design trends.",
      priority: "high",
    },
    {
      id: "2",
      website: "businessdirectory.com",
      contactName: "Sarah Manager",
      contactEmail: "listings@businessdirectory.com",
      status: "negotiating",
      targetPage: "https://whitefoxstudios.com",
      notes: "Business directory with good local relevance. Discussing listing options.",
      priority: "medium",
    },
    {
      id: "3",
      website: "industrymagazine.com",
      contactName: "Michael Editor",
      contactEmail: "editor@industrymagazine.com",
      status: "accepted",
      targetPage: "https://whitefoxstudios.com/case-studies",
      notes: "Agreed to feature our case study. Need to send materials by next week.",
      priority: "high",
    },
    {
      id: "4",
      website: "localbusiness.org",
      contactName: "Lisa Director",
      contactEmail: "lisa@localbusiness.org",
      status: "rejected",
      targetPage: "https://whitefoxstudios.com",
      notes: "Not accepting new listings at this time. Try again in 3 months.",
      priority: "low",
    },
    {
      id: "5",
      website: "techblog.net",
      contactName: "David Author",
      contactEmail: "david@techblog.net",
      status: "not-started",
      targetPage: "https://whitefoxstudios.com/services/seo",
      notes: "Popular tech blog. Prepare outreach email with SEO tips article pitch.",
      priority: "medium",
    },
  ])
  const [backlinks, setBacklinks] = useState<Backlink[]>([
    {
      id: "1",
      website: "industrymagazine.com",
      url: "https://industrymagazine.com/top-web-designers",
      targetPage: "https://whitefoxstudios.com",
      anchorText: "White Fox Studios",
      doFollow: true,
      dateAcquired: "2023-08-15",
      notes: "Featured in top web designers article.",
    },
    {
      id: "2",
      website: "designblog.com",
      url: "https://designblog.com/web-design-trends-2023",
      targetPage: "https://whitefoxstudios.com/services/web-design",
      anchorText: "professional web design services",
      doFollow: true,
      dateAcquired: "2023-07-22",
      notes: "Guest post about web design trends.",
    },
    {
      id: "3",
      website: "localbusiness.org",
      url: "https://localbusiness.org/marketing-agencies",
      targetPage: "https://whitefoxstudios.com/services/marketing",
      anchorText: "White Fox Studios Marketing",
      doFollow: false,
      dateAcquired: "2023-06-10",
      notes: "Directory listing in marketing agencies category.",
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentOpportunity, setCurrentOpportunity] = useState<LinkOpportunity>({
    id: "",
    website: "",
    contactName: "",
    contactEmail: "",
    status: "not-started",
    targetPage: "",
    notes: "",
    priority: "medium",
  })
  const [currentBacklink, setCurrentBacklink] = useState<Backlink>({
    id: "",
    website: "",
    url: "",
    targetPage: "",
    anchorText: "",
    doFollow: true,
    dateAcquired: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const handleAddOrUpdateOpportunity = () => {
    if (isEditMode) {
      setOpportunities(opportunities.map((item) => (item.id === currentOpportunity.id ? currentOpportunity : item)))
    } else {
      const newId = (opportunities.length + 1).toString()
      setOpportunities([...opportunities, { ...currentOpportunity, id: newId }])
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleAddOrUpdateBacklink = () => {
    if (isEditMode) {
      setBacklinks(backlinks.map((item) => (item.id === currentBacklink.id ? currentBacklink : item)))
    } else {
      const newId = (backlinks.length + 1).toString()
      setBacklinks([...backlinks, { ...currentBacklink, id: newId }])
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDeleteOpportunity = (id: string) => {
    setOpportunities(opportunities.filter((item) => item.id !== id))
  }

  const handleDeleteBacklink = (id: string) => {
    setBacklinks(backlinks.filter((item) => item.id !== id))
  }

  const handleEditOpportunity = (item: LinkOpportunity) => {
    setCurrentOpportunity(item)
    setIsEditMode(true)
    setIsDialogOpen(true)
  }

  const handleEditBacklink = (item: Backlink) => {
    setCurrentBacklink(item)
    setIsEditMode(true)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setCurrentOpportunity({
      id: "",
      website: "",
      contactName: "",
      contactEmail: "",
      status: "not-started",
      targetPage: "",
      notes: "",
      priority: "medium",
    })
    setCurrentBacklink({
      id: "",
      website: "",
      url: "",
      targetPage: "",
      anchorText: "",
      doFollow: true,
      dateAcquired: new Date().toISOString().split("T")[0],
      notes: "",
    })
    setIsEditMode(false)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  const convertOpportunityToBacklink = (opportunity: LinkOpportunity) => {
    const newBacklink: Backlink = {
      id: (backlinks.length + 1).toString(),
      website: opportunity.website,
      url: "",
      targetPage: opportunity.targetPage,
      anchorText: "",
      doFollow: true,
      dateAcquired: new Date().toISOString().split("T")[0],
      notes: opportunity.notes,
    }
    setCurrentBacklink(newBacklink)
    setActiveTab("backlinks")
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="opportunities">Link Opportunities</TabsTrigger>
          <TabsTrigger value="backlinks">Acquired Backlinks</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Link Building Opportunities</CardTitle>
                  <CardDescription>Track potential backlink opportunities and outreach status</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => resetForm()}>
                      <Plus className="mr-2 h-4 w-4" /> Add Opportunity
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>{isEditMode ? "Edit Opportunity" : "Add New Opportunity"}</DialogTitle>
                      <DialogDescription>
                        {isEditMode
                          ? "Update the link opportunity details below"
                          : "Fill out the form below to add a new link building opportunity"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="website" className="text-right">
                          Website
                        </Label>
                        <Input
                          id="website"
                          value={currentOpportunity.website}
                          onChange={(e) => setCurrentOpportunity({ ...currentOpportunity, website: e.target.value })}
                          className="col-span-3"
                          placeholder="example.com"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="contact-name" className="text-right">
                          Contact Name
                        </Label>
                        <Input
                          id="contact-name"
                          value={currentOpportunity.contactName}
                          onChange={(e) =>
                            setCurrentOpportunity({ ...currentOpportunity, contactName: e.target.value })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="contact-email" className="text-right">
                          Contact Email
                        </Label>
                        <Input
                          id="contact-email"
                          type="email"
                          value={currentOpportunity.contactEmail}
                          onChange={(e) =>
                            setCurrentOpportunity({ ...currentOpportunity, contactEmail: e.target.value })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                          Status
                        </Label>
                        <select
                          id="status"
                          value={currentOpportunity.status}
                          onChange={(e) => setCurrentOpportunity({ ...currentOpportunity, status: e.target.value })}
                          className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="not-started">Not Started</option>
                          <option value="outreach">Outreach Sent</option>
                          <option value="negotiating">Negotiating</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="target-page" className="text-right">
                          Target Page
                        </Label>
                        <Input
                          id="target-page"
                          value={currentOpportunity.targetPage}
                          onChange={(e) => setCurrentOpportunity({ ...currentOpportunity, targetPage: e.target.value })}
                          className="col-span-3"
                          placeholder="https://yoursite.com/page-to-link-to"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                          Priority
                        </Label>
                        <select
                          id="priority"
                          value={currentOpportunity.priority}
                          onChange={(e) => setCurrentOpportunity({ ...currentOpportunity, priority: e.target.value })}
                          className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <Label htmlFor="notes" className="text-right">
                          Notes
                        </Label>
                        <Textarea
                          id="notes"
                          value={currentOpportunity.notes}
                          onChange={(e) => setCurrentOpportunity({ ...currentOpportunity, notes: e.target.value })}
                          className="col-span-3"
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={handleDialogClose}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddOrUpdateOpportunity}>{isEditMode ? "Update" : "Add"}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Website</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Target Page</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.website}</TableCell>
                      <TableCell>
                        <div>
                          <div>{item.contactName}</div>
                          <div className="text-sm text-muted-foreground">{item.contactEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : item.status === "outreach" || item.status === "negotiating"
                                ? "bg-blue-100 text-blue-800"
                                : item.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                          }
                        >
                          {item.status === "not-started"
                            ? "Not Started"
                            : item.status === "outreach"
                              ? "Outreach Sent"
                              : item.status === "negotiating"
                                ? "Negotiating"
                                : item.status === "accepted"
                                  ? "Accepted"
                                  : "Rejected"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{item.targetPage}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            item.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : item.priority === "medium"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {item.priority === "high" ? "High" : item.priority === "medium" ? "Medium" : "Low"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditOpportunity(item)}>
                            <Edit2 className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteOpportunity(item.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                          {item.status === "accepted" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => convertOpportunityToBacklink(item)}
                              title="Convert to backlink"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Convert to backlink</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backlinks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Acquired Backlinks</CardTitle>
                  <CardDescription>Track and monitor acquired backlinks</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => resetForm()}>
                      <Plus className="mr-2 h-4 w-4" /> Add Backlink
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>{isEditMode ? "Edit Backlink" : "Add New Backlink"}</DialogTitle>
                      <DialogDescription>
                        {isEditMode
                          ? "Update the backlink details below"
                          : "Fill out the form below to add a new acquired backlink"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bl-website" className="text-right">
                          Website
                        </Label>
                        <Input
                          id="bl-website"
                          value={currentBacklink.website}
                          onChange={(e) => setCurrentBacklink({ ...currentBacklink, website: e.target.value })}
                          className="col-span-3"
                          placeholder="example.com"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bl-url" className="text-right">
                          Link URL
                        </Label>
                        <Input
                          id="bl-url"
                          value={currentBacklink.url}
                          onChange={(e) => setCurrentBacklink({ ...currentBacklink, url: e.target.value })}
                          className="col-span-3"
                          placeholder="https://example.com/page-with-link"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bl-target" className="text-right">
                          Target Page
                        </Label>
                        <Input
                          id="bl-target"
                          value={currentBacklink.targetPage}
                          onChange={(e) => setCurrentBacklink({ ...currentBacklink, targetPage: e.target.value })}
                          className="col-span-3"
                          placeholder="https://yoursite.com/linked-page"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bl-anchor" className="text-right">
                          Anchor Text
                        </Label>
                        <Input
                          id="bl-anchor"
                          value={currentBacklink.anchorText}
                          onChange={(e) => setCurrentBacklink({ ...currentBacklink, anchorText: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bl-dofollow" className="text-right">
                          Link Type
                        </Label>
                        <select
                          id="bl-dofollow"
                          value={currentBacklink.doFollow ? "dofollow" : "nofollow"}
                          onChange={(e) =>
                            setCurrentBacklink({ ...currentBacklink, doFollow: e.target.value === "dofollow" })
                          }
                          className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="dofollow">DoFollow</option>
                          <option value="nofollow">NoFollow</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bl-date" className="text-right">
                          Date Acquired
                        </Label>
                        <Input
                          id="bl-date"
                          type="date"
                          value={currentBacklink.dateAcquired}
                          onChange={(e) => setCurrentBacklink({ ...currentBacklink, dateAcquired: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <Label htmlFor="bl-notes" className="text-right">
                          Notes
                        </Label>
                        <Textarea
                          id="bl-notes"
                          value={currentBacklink.notes}
                          onChange={(e) => setCurrentBacklink({ ...currentBacklink, notes: e.target.value })}
                          className="col-span-3"
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={handleDialogClose}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddOrUpdateBacklink}>{isEditMode ? "Update" : "Add"}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Website</TableHead>
                    <TableHead>Link URL</TableHead>
                    <TableHead>Target Page</TableHead>
                    <TableHead>Anchor Text</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date Acquired</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backlinks.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.website}</TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:underline"
                        >
                          {item.url}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">{item.targetPage}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{item.anchorText}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={item.doFollow ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {item.doFollow ? "DoFollow" : "NoFollow"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(item.dateAcquired).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditBacklink(item)}>
                            <Edit2 className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteBacklink(item.id)}>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
