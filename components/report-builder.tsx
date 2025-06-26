"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  PieChart,
  Table,
  FileText,
  BarChart,
  Save,
  PlayCircle,
  ArrowLeft,
} from "lucide-react"
import { useData } from "@/context/data-context"
import type { Report, ReportSection, ReportTemplate, ReportType, ReportFrequency } from "@/types/report"

interface ReportBuilderProps {
  report?: Report
  isNew?: boolean
}

export function ReportBuilder({ report, isNew = false }: ReportBuilderProps) {
  const router = useRouter()
  const { clients, projects } = useData()

  // YOLO hydration fix: memoize default report values
  const defaultReportId = useMemo(() => `report-${Math.floor(Math.random() * 1e8).toString(36)}`, [])
  const defaultCreatedAt = useMemo(() => new Date().toISOString(), [])

  const [reportData, setReportData] = useState<Partial<Report>>(() => {
    if (report) return { ...report }
    // Default new report
    return {
      id: defaultReportId,
      name: "",
      type: "seo" as ReportType,
      description: "",
      createdAt: defaultCreatedAt,
      createdBy: "Current User", // Would use actual user in real app
      frequency: "monthly" as ReportFrequency,
      status: "draft",
      recipients: [],
      templateId: "",
    }
  })

  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)
  const [sections, setSections] = useState<ReportSection[]>([])
  const [clientProjects, setClientProjects] = useState<any[]>([])
  const [recipientEmail, setRecipientEmail] = useState("")

  // Helper for section IDs
  function generateSectionId() {
    return `section-${Math.floor(Math.random() * 1e8).toString(36)}`
  }

  // Update available projects when client changes
  useEffect(() => {
    if (reportData.clientId) {
      const filteredProjects = projects.filter((p) => p.clientId === reportData.clientId)
      setClientProjects(filteredProjects)
    } else {
      setClientProjects([])
    }
  }, [reportData.clientId, projects])

  // Load template when selected
  useEffect(() => {
    if (reportData.templateId) {
      const template = templates.find((t) => t.id === reportData.templateId)
      if (template) {
        setSelectedTemplate(template)
        // Only set sections if they haven't been customized yet
        if (!report || sections.length === 0) {
          setSections([...template.sections])
        }
      } else {
        setSelectedTemplate(null)
      }
    } else {
      setSelectedTemplate(null)
    }
  }, [reportData.templateId, templates, report])

  // Load sections from report if editing
  useEffect(() => {
    if (report && report.templateId) {
      const template = templates.find((t) => t.id === report.templateId)
      if (template) {
        setSections([...template.sections])
      }
    }
  }, [report, templates])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReportData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setReportData((prev) => ({ ...prev, [name]: value }))
  }

  const addSection = () => {
    const newSection: ReportSection = {
      id: generateSectionId(),
      title: "New Section",
      type: "text",
      content: "",
    }
    setSections([...sections, newSection])
  }

  const updateSection = (id: string, field: string, value: any) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, [field]: value } : section)))
  }

  const deleteSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id))
  }

  const moveSection = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === sections.length - 1)) {
      return
    }

    const newSections = [...sections]
    const newIndex = direction === "up" ? index - 1 : index + 1
    const [movedSection] = newSections.splice(index, 1)
    newSections.splice(newIndex, 0, movedSection)

    setSections(newSections)
  }

  const addRecipient = () => {
    if (!recipientEmail) return

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(recipientEmail)) {
      alert("Please enter a valid email address")
      return
    }

    const currentRecipients = reportData.recipients || []
    if (currentRecipients.includes(recipientEmail)) {
      alert("This email is already in the recipients list")
      return
    }

    setReportData({
      ...reportData,
      recipients: [...currentRecipients, recipientEmail],
    })

    setRecipientEmail("")
  }

  const removeRecipient = (email: string) => {
    setReportData({
      ...reportData,
      recipients: (reportData.recipients || []).filter((r) => r !== email),
    })
  }

  const saveReport = () => {
    if (!reportData.name) {
      alert("Please enter a report name")
      return
    }

    if (!reportData.templateId) {
      alert("Please select a report template")
      return
    }

    // In a real app, this would save to backend with sections data
    console.log("Saving report:", { ...reportData, sections })
    alert(`Report "${reportData.name}" saved!`)
    router.push("/reports")
  }

  const generateReport = () => {
    if (!reportData.name || !reportData.templateId) {
      alert("Please complete all required fields before generating")
      return
    }

    // In a real app, this would trigger report generation
    console.log("Generating report:", { ...reportData, sections })
    alert(`Report "${reportData.name}" generation started!`)
    router.push("/reports")
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.push("/reports")} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <CardTitle>{isNew ? "Create New Report" : `Edit Report: ${reportData.name}`}</CardTitle>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={saveReport}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={generateReport}>
            <PlayCircle className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="schedule">Schedule & Recipients</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Report Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={reportData.name || ""}
                  onChange={handleInputChange}
                  placeholder="Enter report name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Report Type</Label>
                <Select value={reportData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seo">SEO</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client (Optional)</Label>
                <Select
                  value={reportData.clientId || ""}
                  onValueChange={(value) => handleSelectChange("clientId", value)}
                >
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project (Optional)</Label>
                <Select
                  value={reportData.projectId || ""}
                  onValueChange={(value) => handleSelectChange("projectId", value)}
                  disabled={!reportData.clientId}
                >
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {clientProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={reportData.description || ""}
                  onChange={handleInputChange}
                  placeholder="Enter report description"
                  rows={3}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="template">Report Template</Label>
                <Select
                  value={reportData.templateId || ""}
                  onValueChange={(value) => handleSelectChange("templateId", value)}
                >
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {templates
                      .filter((template) => !reportData.type || template.type === reportData.type)
                      .map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {selectedTemplate && (
                  <p className="text-sm text-muted-foreground mt-1">{selectedTemplate.description}</p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4">
            {reportData.templateId ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Report Sections</h3>
                  <Button variant="outline" size="sm" onClick={addSection}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>

                {sections.length === 0 ? (
                  <div className="text-center py-8 border rounded-md">
                    <p className="text-muted-foreground">No sections defined. Add a section or select a template.</p>
                  </div>
                ) : (
                  <Accordion type="multiple" className="w-full">
                    {sections.map((section, index) => (
                      <AccordionItem value={section.id} key={section.id} className="border rounded-md mb-2">
                        <AccordionTrigger className="px-4">
                          <div className="flex items-center justify-between w-full pr-4">
                            <span>{section.title}</span>
                            <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveSection(index, "up")}
                                disabled={index === 0}
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveSection(index, "down")}
                                disabled={index === sections.length - 1}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteSection(section.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor={`title-${section.id}`}>Section Title</Label>
                                <Input
                                  id={`title-${section.id}`}
                                  value={section.title}
                                  onChange={(e) => updateSection(section.id, "title", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`type-${section.id}`}>Section Type</Label>
                                <Select
                                  value={section.type}
                                  onValueChange={(value) => updateSection(section.id, "type", value)}
                                >
                                  <SelectTrigger id={`type-${section.id}`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="chart">Chart</SelectItem>
                                    <SelectItem value="table">Table</SelectItem>
                                    <SelectItem value="metric">Metrics</SelectItem>
                                    <SelectItem value="custom">Custom</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            {section.type === "text" && (
                              <div className="space-y-2">
                                <Label htmlFor={`content-${section.id}`}>Content</Label>
                                <Textarea
                                  id={`content-${section.id}`}
                                  value={section.content || ""}
                                  onChange={(e) => updateSection(section.id, "content", e.target.value)}
                                  rows={6}
                                />
                              </div>
                            )}

                            {section.type === "chart" && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`dataSource-${section.id}`}>Data Source</Label>
                                  <Select
                                    value={section.dataSource || ""}
                                    onValueChange={(value) => updateSection(section.id, "dataSource", value)}
                                  >
                                    <SelectTrigger id={`dataSource-${section.id}`}>
                                      <SelectValue placeholder="Select data source" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="analytics.traffic">Website Traffic</SelectItem>
                                      <SelectItem value="analytics.conversions">Conversion Metrics</SelectItem>
                                      <SelectItem value="seo.keywords">Keyword Rankings</SelectItem>
                                      <SelectItem value="finance.revenue">Revenue</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`chartType-${section.id}`}>Chart Type</Label>
                                  <Select
                                    value={section.options?.chartType || "line"}
                                    onValueChange={(value) =>
                                      updateSection(section.id, "options", {
                                        ...section.options,
                                        chartType: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger id={`chartType-${section.id}`}>
                                      <SelectValue placeholder="Select chart type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="line">Line Chart</SelectItem>
                                      <SelectItem value="bar">Bar Chart</SelectItem>
                                      <SelectItem value="pie">Pie Chart</SelectItem>
                                      <SelectItem value="area">Area Chart</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="p-6 border rounded-md flex items-center justify-center bg-muted/50">
                                  {section.options?.chartType === "pie" && (
                                    <PieChart className="h-24 w-24 text-muted-foreground" />
                                  )}
                                  {section.options?.chartType === "bar" && (
                                    <BarChart className="h-24 w-24 text-muted-foreground" />
                                  )}
                                  {(section.options?.chartType === "line" || !section.options?.chartType) && (
                                    <svg
                                      width="96"
                                      height="96"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      className="text-muted-foreground"
                                    >
                                      <path d="M3 3v18h18" />
                                      <path d="m3 15 5-5 4 4 5-7 3 3" />
                                    </svg>
                                  )}
                                  {section.options?.chartType === "area" && (
                                    <svg
                                      width="96"
                                      height="96"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      className="text-muted-foreground"
                                    >
                                      <path d="M3 3v18h18" />
                                      <path d="M3 15 8 9l4 2 3-3 6 6" />
                                      <path d="M21 14v-4h-4" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            )}

                            {section.type === "table" && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`dataSource-${section.id}`}>Data Source</Label>
                                  <Select
                                    value={section.dataSource || ""}
                                    onValueChange={(value) => updateSection(section.id, "dataSource", value)}
                                  >
                                    <SelectTrigger id={`dataSource-${section.id}`}>
                                      <SelectValue placeholder="Select data source" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="seo.keywords">Keyword Rankings</SelectItem>
                                      <SelectItem value="projects.status">Project Status</SelectItem>
                                      <SelectItem value="clients.performance">Client Performance</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="p-6 border rounded-md flex items-center justify-center bg-muted/50">
                                  <Table className="h-24 w-24 text-muted-foreground" />
                                </div>
                              </div>
                            )}

                            {section.type === "metric" && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`dataSource-${section.id}`}>Data Source</Label>
                                  <Select
                                    value={section.dataSource || ""}
                                    onValueChange={(value) => updateSection(section.id, "dataSource", value)}
                                  >
                                    <SelectTrigger id={`dataSource-${section.id}`}>
                                      <SelectValue placeholder="Select data source" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="analytics.conversions">Conversion Metrics</SelectItem>
                                      <SelectItem value="seo.performance">SEO Performance</SelectItem>
                                      <SelectItem value="projects.metrics">Project Metrics</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                  <div className="p-4 border rounded-md flex flex-col items-center justify-center bg-muted/50">
                                    <div className="text-muted-foreground text-xs">Metric 1</div>
                                    <div className="text-2xl font-bold">256</div>
                                  </div>
                                  <div className="p-4 border rounded-md flex flex-col items-center justify-center bg-muted/50">
                                    <div className="text-muted-foreground text-xs">Metric 2</div>
                                    <div className="text-2xl font-bold">45%</div>
                                  </div>
                                  <div className="p-4 border rounded-md flex flex-col items-center justify-center bg-muted/50">
                                    <div className="text-muted-foreground text-xs">Metric 3</div>
                                    <div className="text-2xl font-bold">$1,280</div>
                                  </div>
                                  <div className="p-4 border rounded-md flex flex-col items-center justify-center bg-muted/50">
                                    <div className="text-muted-foreground text-xs">Metric 4</div>
                                    <div className="text-2xl font-bold">+12%</div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {section.type === "custom" && (
                              <div className="space-y-2">
                                <Label htmlFor={`content-${section.id}`}>Custom HTML/Markdown</Label>
                                <Textarea
                                  id={`content-${section.id}`}
                                  value={section.content || ""}
                                  onChange={(e) => updateSection(section.id, "content", e.target.value)}
                                  rows={8}
                                  placeholder="Enter custom HTML or Markdown content"
                                />
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-md">
                <p className="text-muted-foreground mb-4">Please select a report template first.</p>
                <Button variant="outline" onClick={() => document.getElementById("template")?.focus()}>
                  Select Template
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Schedule & Recipients Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="frequency">Report Frequency</Label>
                <Select
                  value={reportData.frequency}
                  onValueChange={(value) => handleSelectChange("frequency", value as ReportFrequency)}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">One-Time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {reportData.frequency !== "once" && (
                <div className="space-y-2">
                  <Label htmlFor="nextGeneration">Next Generation Date</Label>
                  <Input
                    id="nextGeneration"
                    name="nextGeneration"
                    type="date"
                    value={reportData.nextGeneration ? reportData.nextGeneration.split("T")[0] : ""}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recipients</h3>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter email address"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
                <Button onClick={addRecipient}>Add</Button>
              </div>

              {(reportData.recipients?.length || 0) > 0 ? (
                <div className="space-y-2 mt-4">
                  {reportData.recipients?.map((email) => (
                    <div key={email} className="flex justify-between items-center p-2 border rounded-md">
                      <span>{email}</span>
                      <Button variant="ghost" size="icon" onClick={() => removeRecipient(email)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 border rounded-md">
                  <p className="text-muted-foreground">No recipients added yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            {reportData.templateId ? (
              <div className="space-y-6 border rounded-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold">{reportData.name || "[Report Name]"}</h1>
                    {reportData.description && <p className="text-muted-foreground mt-1">{reportData.description}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Generated: {new Date().toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {reportData.clientId && clients.find((c) => c.clientId === reportData.clientId)?.name}
                    </p>
                  </div>
                </div>

                <hr />

                {sections.map((section) => (
                  <div key={section.id} className="space-y-2">
                    <h2 className="text-xl font-medium">{section.title}</h2>
                    {section.type === "text" && (
                      <div className="prose max-w-none">{section.content || "Text content will appear here."}</div>
                    )}
                    {section.type === "chart" && (
                      <div className="flex justify-center py-8 bg-muted/20 rounded-md">
                        {section.options?.chartType === "pie" && <PieChart className="h-40 w-40 text-primary/60" />}
                        {section.options?.chartType === "bar" && <BarChart className="h-40 w-40 text-primary/60" />}
                        {(section.options?.chartType === "line" || !section.options?.chartType) && (
                          <svg
                            width="160"
                            height="160"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary/60"
                          >
                            <path d="M3 3v18h18" />
                            <path d="m3 15 5-5 4 4 5-7 3 3" />
                          </svg>
                        )}
                        {section.options?.chartType === "area" && (
                          <svg
                            width="160"
                            height="160"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary/60"
                          >
                            <path d="M3 3v18h18" />
                            <path d="M3 15 8 9l4 2 3-3 6 6" />
                            <path d="M21 14v-4h-4" />
                          </svg>
                        )}
                      </div>
                    )}
                    {section.type === "table" && (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border p-2">Column 1</th>
                              <th className="border p-2">Column 2</th>
                              <th className="border p-2">Column 3</th>
                              <th className="border p-2">Column 4</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2">Data 1</td>
                              <td className="border p-2">Data 2</td>
                              <td className="border p-2">Data 3</td>
                              <td className="border p-2">Data 4</td>
                            </tr>
                            <tr>
                              <td className="border p-2">Data 5</td>
                              <td className="border p-2">Data 6</td>
                              <td className="border p-2">Data 7</td>
                              <td className="border p-2">Data 8</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                    {section.type === "metric" && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-4 border rounded-md flex flex-col items-center justify-center">
                          <div className="text-muted-foreground text-xs">Metric 1</div>
                          <div className="text-2xl font-bold">256</div>
                        </div>
                        <div className="p-4 border rounded-md flex flex-col items-center justify-center">
                          <div className="text-muted-foreground text-xs">Metric 2</div>
                          <div className="text-2xl font-bold">45%</div>
                        </div>
                        <div className="p-4 border rounded-md flex flex-col items-center justify-center">
                          <div className="text-muted-foreground text-xs">Metric 3</div>
                          <div className="text-2xl font-bold">$1,280</div>
                        </div>
                        <div className="p-4 border rounded-md flex flex-col items-center justify-center">
                          <div className="text-muted-foreground text-xs">Metric 4</div>
                          <div className="text-2xl font-bold">+12%</div>
                        </div>
                      </div>
                    )}
                    {section.type === "custom" && (
                      <div className="py-4 px-2">
                        <div className="text-center text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto" />
                          <p>Custom content will be rendered here</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-md">
                <p className="text-muted-foreground mb-4">Please select a report template first to see preview.</p>
                <Button variant="outline" onClick={() => document.getElementById("template")?.focus()}>
                  Select Template
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={() => router.push("/reports")}>
          Cancel
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={saveReport}>
            Save Draft
          </Button>
          <Button onClick={generateReport}>Generate Report</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
