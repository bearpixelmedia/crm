"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, RefreshCw } from "lucide-react"
import type { Report } from "@/types/report"
import { useData } from "@/context/data-context"

export default function ReportDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { projects, clients } = useData()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true)
      try {
        // Fetch report from API
        const response = await fetch(`/api/reports/${params.id}`)
        if (!response.ok) throw new Error("Report not found")
        const data = await response.json()
        setReport(data)
        setError(null)
      } catch (err) {
        setError("Failed to load report details")
      } finally {
        setLoading(false)
      }
    }
    if (params.id) fetchReport()
  }, [params.id])

  const handleGenerateNow = () => {
    // In a real app, this would trigger an API call to generate the report
    alert("Report generation started")
  }

  const handleDownload = () => {
    // In a real app, this would download the report
    alert("Downloading report")
  }

  const handleSendEmail = () => {
    // In a real app, this would send the report via email
    alert("Report sent via email")
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-[250px]" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-[200px] w-full" />
              <div className="flex justify-end">
                <Skeleton className="h-10 w-[200px]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-6">
              <h2 className="text-xl font-medium">Error</h2>
              <p className="text-muted-foreground mt-2">{error || "Report not found"}</p>
              <Button variant="outline" className="mt-4" onClick={() => router.push("/reports")}>
                Back to Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Report Details</h1>
        <Button variant="outline" onClick={() => router.push("/reports")}>
          Back to Reports
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{report.name}</CardTitle>
            <Badge className={getStatusColor(report.status)}>
              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="mt-1">{report.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
              <p className="mt-1 capitalize">{report.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Created By</h3>
              <p className="mt-1">{report.createdBy}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
              <p className="mt-1">{formatDate(report.createdAt)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Frequency</h3>
              <p className="mt-1 capitalize">{report.frequency}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Last Generated</h3>
              <p className="mt-1">{formatDate(report.lastGenerated)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Next Generation</h3>
              <p className="mt-1">{formatDate(report.nextGeneration)}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Recipients</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {report.recipients.map((recipient, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {recipient}
                </Badge>
              ))}
            </div>
          </div>

          {/* Report preview would go here in a real app */}
          <div className="border rounded-md p-4 bg-muted/20 min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Report preview would be displayed here</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleGenerateNow}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Now
            </Button>
            <Button variant="outline" onClick={handleSendEmail}>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </CardFooter>
      </Card>

      {/* Additional sections like report history could go here */}
    </div>
  )
}
