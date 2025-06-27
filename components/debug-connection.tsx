"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useData } from "@/context/data-context"

export function DebugConnection() {
  const { refreshData } = useData()
  const [testResult, setTestResult] = useState<{
    testing: boolean
    success?: boolean
    message?: string
    error?: string
    data?: any
  }>({
    testing: false,
  })

  const testConnection = async () => {
    setTestResult({ testing: true })

    try {
      const response = await fetch("/api/test-connection")
      const data = await response.json()

      setTestResult({
        testing: false,
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error,
      })
    } catch (error) {
      setTestResult({
        testing: false,
        success: false,
        message: "Failed to test connection",
        error: error.message,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Sheets Connection</CardTitle>
        <CardDescription>Test the connection to your Google Sheets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {testResult.testing ? (
            <div className="py-8 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : testResult.success === undefined ? (
            <div className="py-8 text-center text-muted-foreground">
              Click the button below to test the connection to Google Sheets
            </div>
          ) : testResult.success ? (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Connection Successful</AlertTitle>
              <AlertDescription>
                {testResult.message}
                {testResult.data && (
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>Clients:</div>
                    <div>{testResult.data.clientCount}</div>
                    <div>Projects:</div>
                    <div>{testResult.data.projectCount}</div>
                    <div>Agents:</div>
                    <div>{testResult.data.agentCount}</div>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Failed</AlertTitle>
              <AlertDescription>
                {testResult.message}
                {testResult.error && (
                  <div className="mt-2 text-sm font-mono bg-red-50 p-2 rounded">{testResult.error}</div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button onClick={testConnection} className="w-full" disabled={testResult.testing}>
          {testResult.testing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            "Test Connection"
          )}
        </Button>
        <Button onClick={() => refreshData()} variant="outline" className="w-full" disabled={testResult.testing}>
          Refresh Data
        </Button>
      </CardFooter>
    </Card>
  )
}
