"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, FileText, PlayCircle, Download, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useData } from "@/context/data-context"
import type { Report, ReportStatus } from "@/types/report"

// Status badge colors
const statusColors: Record<ReportStatus, string> = {
  draft: "bg-gray-200 text-gray-800",
  scheduled: "bg-blue-100 text-blue-800",
  generated: "bg-green-100 text-green-800",
  delivered: "bg-purple-100 text-purple-800",
  failed: "bg-red-100 text-red-800",
}

// Format date for display
const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function ReportsList() {
  const router = useRouter()
  const { clients, projects } = useData()

  const [reports, setReports] = useState<Report[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("")

  useEffect(() => {
    // Fetch reports from API or context
    const fetchReports = async () => {
      const response = await fetch("/api/reports")
      if (response.ok) {
        const data = await response.json()
        setReports(data)
      }
    }
    fetchReports()
  }, [])

  // Filtered reports based on search and filters
  const filteredReports = reports.filter((report) => {
    // Search filter
    const matchesSearch =
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.description || "").toLowerCase().includes(searchQuery.toLowerCase())

    // Type filter
    const matchesType = !typeFilter || report.type === typeFilter

    // Status filter
    const matchesStatus = !statusFilter || report.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  // Generate a report
  const generateReport = (reportId: string) => {
    // In a real app, this would trigger report generation
    setReports(
      reports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              status: "generated",
              lastGenerated: new Date().toISOString(),
            }
          : report,
      ),
    )

    alert(`Report "${reports.find((r) => r.id === reportId)?.name}" has been generated.`)
  }

  // Send a report
  const sendReport = (reportId: string) => {
    // In a real app, this would send the report to recipients
    setReports(
      reports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              status: "delivered",
            }
          : report,
      ),
    )

    const report = reports.find((r) => r.id === reportId)
    alert(`Report "${report?.name}" has been sent to ${report?.recipients.join(", ")}.`)
  }

  // Download a report
  const downloadReport = (reportId: string) => {
    // In a real app, this would download the report
    alert(`Downloading report "${reports.find((r) => r.id === reportId)?.name}"...`)
  }

  // Delete a report
  const deleteReport = (reportId: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      setReports(reports.filter((report) => report.id !== reportId))
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle>Reports</CardTitle>
        <Button onClick={() => router.push("/reports/new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="seo">SEO</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="generated">Generated</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead>Next Generation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{report.name}</span>
                      {report.description && (
                        <span className="text-xs text-muted-foreground">{report.description}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{report.type.charAt(0).toUpperCase() + report.type.slice(1)}</TableCell>
                  <TableCell>{report.frequency.charAt(0).toUpperCase() + report.frequency.slice(1)}</TableCell>
                  <TableCell>{formatDate(report.lastGenerated)}</TableCell>
                  <TableCell>{formatDate(report.nextGeneration)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[report.status]}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/reports/${report.id}`)}
                        title="View Report"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => generateReport(report.id)}
                        title="Generate Report"
                        disabled={report.status !== "draft" && report.status !== "scheduled"}
                      >
                        <PlayCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadReport(report.id)}
                        title="Download Report"
                        disabled={report.status !== "generated" && report.status !== "delivered"}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/reports/${report.id}/edit`)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => sendReport(report.id)}
                            disabled={report.status !== "generated"}
                          >
                            Send
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => deleteReport(report.id)} className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredReports.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No reports match your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
