"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileText,
  LinkIcon,
  LineChart,
  Search,
  Settings,
} from "lucide-react"
import { SEOAuditChecklist } from "@/components/seo-audit-checklist"
import { KeywordResearchForm } from "@/components/keyword-research-form"
import { OnPageOptimizationChecklist } from "@/components/on-page-optimization-checklist"
import { ContentPlanningTable } from "@/components/content-planning-table"
import { LinkBuildingTracker } from "@/components/link-building-tracker"
import { SEOPerformanceReport } from "@/components/seo-performance-report"

const workflowSteps = [
  {
    id: "initial-audit",
    name: "Initial SEO Audit",
    icon: <AlertCircle className="h-5 w-5" />,
    description: "Comprehensive analysis of the current website SEO status",
  },
  {
    id: "keyword-research",
    name: "Keyword Research",
    icon: <Search className="h-5 w-5" />,
    description: "Identify target keywords and search intent",
  },
  {
    id: "on-page-optimization",
    name: "On-Page Optimization",
    icon: <Settings className="h-5 w-5" />,
    description: "Optimize website elements for better search visibility",
  },
  {
    id: "content-creation",
    name: "Content Creation",
    icon: <FileText className="h-5 w-5" />,
    description: "Develop SEO-optimized content strategy and assets",
  },
  {
    id: "link-building",
    name: "Link Building",
    icon: <LinkIcon className="h-5 w-5" />,
    description: "Build high-quality backlinks to improve authority",
  },
  {
    id: "reporting",
    name: "Performance Tracking",
    icon: <LineChart className="h-5 w-5" />,
    description: "Monitor and report on SEO performance metrics",
  },
  {
    id: "client-approval",
    name: "Client Approval",
    icon: <CheckCircle2 className="h-5 w-5" />,
    description: "Get client sign-off on completed work",
  },
]

export function SEOWorkflow({ projectId, clientId }) {
  const [activeStep, setActiveStep] = useState("initial-audit")
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const currentStepIndex = workflowSteps.findIndex((step) => step.id === activeStep)
  const progress = Math.round((completedSteps.length / workflowSteps.length) * 100)

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const handleNextStep = () => {
    if (currentStepIndex < workflowSteps.length - 1) {
      setActiveStep(workflowSteps[currentStepIndex + 1].id)
    }
  }

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setActiveStep(workflowSteps[currentStepIndex - 1].id)
    }
  }

  const handleSaveNotes = () => {
    console.log(`Saving notes for step ${activeStep}:`, notes)
    // In a real app, you would save these notes to your database
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SEO Service Workflow</CardTitle>
          <CardDescription>Track and manage the SEO service process for this project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-7">
            {workflowSteps.map((step, index) => (
              <Card
                key={step.id}
                className={`cursor-pointer border-2 transition-all ${
                  activeStep === step.id ? "border-primary" : completedSteps.includes(step.id) ? "border-green-500" : ""
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div
                      className={`mb-2 rounded-full p-2 ${
                        completedSteps.includes(step.id)
                          ? "bg-green-100 text-green-500"
                          : activeStep === step.id
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div className="text-sm font-medium">{step.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {completedSteps.includes(step.id) ? (
                        <Badge variant="outline" className="bg-green-100 text-green-500">
                          Completed
                        </Badge>
                      ) : index === currentStepIndex ? (
                        <Badge>In Progress</Badge>
                      ) : index < currentStepIndex ? (
                        <Badge variant="outline" className="bg-amber-100 text-amber-500">
                          Review
                        </Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{workflowSteps[currentStepIndex].name}</CardTitle>
              <CardDescription>{workflowSteps[currentStepIndex].description}</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handlePreviousStep} disabled={currentStepIndex === 0}>
                Previous
              </Button>
              <Button onClick={handleNextStep} disabled={currentStepIndex === workflowSteps.length - 1}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tasks" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-4">
              {activeStep === "initial-audit" && <SEOAuditChecklist projectId={projectId} />}
              {activeStep === "keyword-research" && <KeywordResearchForm projectId={projectId} clientId={clientId} />}
              {activeStep === "on-page-optimization" && <OnPageOptimizationChecklist projectId={projectId} />}
              {activeStep === "content-creation" && <ContentPlanningTable projectId={projectId} />}
              {activeStep === "link-building" && <LinkBuildingTracker projectId={projectId} />}
              {activeStep === "reporting" && <SEOPerformanceReport projectId={projectId} clientId={clientId} />}
              {activeStep === "client-approval" && (
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-medium">Client Approval Checklist</h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="final-report" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="final-report">Final SEO report prepared</Label>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox id="performance-review" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="performance-review">Performance review meeting scheduled</Label>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox id="client-feedback" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="client-feedback">Client feedback collected</Label>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox id="sign-off" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="sign-off">Client sign-off received</Label>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox id="follow-up" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="follow-up">Follow-up services discussed</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-medium">Client Sign-Off</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="client-name">Client Name</Label>
                          <Input id="client-name" placeholder="Enter client name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sign-off-date">Sign-Off Date</Label>
                          <Input id="sign-off-date" type="date" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-comments">Client Comments</Label>
                        <Textarea id="client-comments" placeholder="Enter any client comments or feedback" rows={4} />
                      </div>
                      <Button className="w-full">Record Client Approval</Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => console.log(`Marking ${activeStep} as incomplete`)}
                  disabled={!completedSteps.includes(activeStep)}
                >
                  Mark as Incomplete
                </Button>
                <Button onClick={() => handleStepComplete(activeStep)} disabled={completedSteps.includes(activeStep)}>
                  Mark as Complete
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <div className="space-y-4">
                <Textarea
                  placeholder="Add notes about this step..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={8}
                />
                <Button onClick={handleSaveNotes}>Save Notes</Button>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-md bg-primary/10 p-2">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">SEO Audit Template.docx</h4>
                      <p className="text-sm text-muted-foreground">Template for conducting SEO audits</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-md bg-primary/10 p-2">
                      <ClipboardList className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">SEO Checklist.pdf</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive SEO checklist</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-md bg-primary/10 p-2">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Client Report Template.pptx</h4>
                      <p className="text-sm text-muted-foreground">Template for client presentations</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>

                <div className="mt-4">
                  <Button>Upload Document</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 px-6 py-3">
          <div className="flex w-full items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {workflowSteps.length}
            </div>
            <div className="text-sm font-medium">
              {completedSteps.includes(activeStep) ? "Completed" : "In Progress"}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
