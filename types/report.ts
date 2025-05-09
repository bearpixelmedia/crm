export type ReportType = "seo" | "marketing" | "client" | "project" | "financial" | "custom"

export type ReportFrequency = "once" | "daily" | "weekly" | "monthly" | "quarterly"

export type ReportStatus = "draft" | "scheduled" | "generated" | "delivered" | "failed"

export type ReportData = {
  [key: string]: any
}

export type Report = {
  id: string
  name: string
  type: ReportType
  description?: string
  createdAt: string
  createdBy: string
  frequency: ReportFrequency
  lastGenerated?: string
  nextGeneration?: string
  status: ReportStatus
  recipients: string[]
  clientId?: string
  projectId?: string
  templateId: string
  data?: ReportData
}

export type ReportTemplate = {
  id: string
  name: string
  type: ReportType
  description?: string
  sections: ReportSection[]
}

export type ReportSection = {
  id: string
  title: string
  type: "text" | "chart" | "table" | "metric" | "custom"
  content?: string
  dataSource?: string
  options?: any
}
