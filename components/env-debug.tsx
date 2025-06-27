"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Info } from "lucide-react"
import { isProduction, isPreview, isDevelopment } from "@/lib/environment"

export function EnvDebug() {
  const [envStatus, setEnvStatus] = useState<{
    checked: boolean
    googleClientEmail: boolean
    googlePrivateKey: boolean
    spreadsheetId: boolean
  }>({
    checked: false,
    googleClientEmail: false,
    googlePrivateKey: false,
    spreadsheetId: false,
  })

  const checkEnvVariables = async () => {
    try {
      const response = await fetch("/api/check-env")
      const data = await response.json()

      setEnvStatus({
        checked: true,
        googleClientEmail: data.googleClientEmail,
        googlePrivateKey: data.googlePrivateKey,
        spreadsheetId: data.spreadsheetId,
      })
    } catch (error) {
      console.error("Failed to check environment variables:", error)
      setEnvStatus({
        checked: true,
        googleClientEmail: false,
        googlePrivateKey: false,
        spreadsheetId: false,
      })
    }
  }

  // Determine current environment
  let currentEnvironment = "Unknown"
  if (isProduction) currentEnvironment = "Production"
  if (isPreview) currentEnvironment = "Preview"
  if (isDevelopment) currentEnvironment = "Development"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Status</CardTitle>
        <CardDescription>Check your environment configuration</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium">Current Environment:</div>
            <div>{currentEnvironment}</div>

            <div className="font-medium">NEXT_PUBLIC_VERCEL_ENV:</div>
            <div>{process.env.NEXT_PUBLIC_VERCEL_ENV || "Not set"}</div>
          </div>

          {envStatus.checked ? (
            <div className="space-y-4 mt-4">
              <EnvVarStatus name="GOOGLE_CLIENT_EMAIL" isSet={envStatus.googleClientEmail} />
              <EnvVarStatus name="GOOGLE_PRIVATE_KEY" isSet={envStatus.googlePrivateKey} />
              <EnvVarStatus name="SPREADSHEET_ID" isSet={envStatus.spreadsheetId} />

              {!envStatus.googleClientEmail || !envStatus.googlePrivateKey || !envStatus.spreadsheetId ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Missing Environment Variables</AlertTitle>
                  <AlertDescription>
                    Some required environment variables are missing. Please check your Vercel project settings.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>All Environment Variables Set</AlertTitle>
                  <AlertDescription>All required environment variables are properly set.</AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Environment Variables</AlertTitle>
              <AlertDescription>
                Click the button below to check if your environment variables are properly set.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={checkEnvVariables} className="w-full">
          Check Environment Variables
        </Button>
      </CardFooter>
    </Card>
  )
}

function EnvVarStatus({ name, isSet }: { name: string; isSet: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-sm">{name}</span>
      {isSet ? (
        <span className="text-green-600 flex items-center">
          <CheckCircle className="mr-1 h-4 w-4" /> Set
        </span>
      ) : (
        <span className="text-red-600 flex items-center">
          <AlertCircle className="mr-1 h-4 w-4" /> Missing
        </span>
      )}
    </div>
  )
}
